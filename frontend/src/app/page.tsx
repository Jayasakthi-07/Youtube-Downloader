"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Download, Youtube, Disc, AlertCircle, Loader2 } from "lucide-react"
import { UrlInput } from "@/components/downloader/UrlInput"
import { VideoInfo } from "@/components/downloader/VideoInfo"
import { PlaylistInfo } from "@/components/downloader/PlaylistInfo"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LegalModal } from "@/components/common/LegalModal"

export default function Home() {
  const [videoData, setVideoData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Download State
  const [jobId, setJobId] = useState<string | null>(null)
  const [jobStatus, setJobStatus] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAnalyze = async (url: string) => {
    setIsLoading(true)
    setError(null)
    setVideoData(null)
    try {
      const apiBase = `http://${window.location.hostname}:8000`
      const response = await fetch(`${apiBase}/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Failed to analyze video")
      }

      setVideoData(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnalyzeUrl = (url: string) => {
    handleAnalyze(url)
  }

  const pollJobStatus = async (id: string) => {
    const interval = setInterval(async () => {
      try {
        const apiBase = `http://${window.location.hostname}:8000`
        const res = await fetch(`${apiBase}/api/jobs/${id}`)
        const data = await res.json()
        setJobStatus(data)

        if (data.status === 'completed') {
          clearInterval(interval)
          // Trigger download
          window.location.href = `${apiBase}/api/download/${id}`
          setJobStatus({ ...data, status: 'completed', progress: 100 })
          setTimeout(() => {
            setJobId(null)
            setJobStatus(null)
          }, 5000)
        } else if (data.status === 'failed') {
          clearInterval(interval)
          setError(data.error || "Download failed")
          setJobId(null)
          setJobStatus(null)
        }
      } catch (e) {
        clearInterval(interval)
      }
    }, 1000)
  }

  const handleDownload = async (formatId: string, isAudio: boolean, audioQuality?: string) => {
    if (!videoData) return

    setError(null)
    setJobStatus({ status: 'queued', progress: 0 })
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      const apiBase = `http://${window.location.hostname}:8000`
      const response = await fetch(`${apiBase}/api/queue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: videoData.webpage_url,
          format_id: formatId,
          is_audio_only: isAudio,
          audio_quality: audioQuality
        }),
      })
      const data = await response.json()
      setJobId(data.job_id)
      pollJobStatus(data.job_id)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (!mounted) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-black text-white selection:bg-cyan-500/30 overflow-hidden relative">
      <LegalModal />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <span className="text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
              VORTEX DOWNLOADER
            </span>
          </div>

          {!videoData && !jobStatus && (
            <div className="space-y-2 max-w-lg mt-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                Media <span className="text-neutral-600">Unleashed.</span>
              </h1>
              <p className="text-neutral-400 text-lg">
                Download 4K Videos & High-Fidelity Audio instantly.
              </p>
            </div>
          )}
        </div>

        {/* Main Input Area */}
        <div className="w-full max-w-2xl transform transition-all duration-500 hover:scale-[1.01]">
          <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-2xl animate-in slide-in-from-top-2">
            <Alert variant="destructive" className="bg-red-950/50 border-red-900/50 text-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Progress Card */}
        {jobStatus && (
          <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-300">
            <Card className="bg-neutral-900/80 backdrop-blur-xl border-cyan-500/30 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 space-y-6 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Status</span>
                    <div className="text-2xl font-bold text-white flex items-center gap-3">
                      {jobStatus.status === 'processing' && <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />}
                      {jobStatus.status === 'completed' && <Download className="w-6 h-6 text-green-500" />}
                      {jobStatus.status.charAt(0).toUpperCase() + jobStatus.status.slice(1)}
                    </div>
                  </div>
                  <span className="text-4xl font-black text-white/10">{jobStatus.progress?.toFixed(0)}%</span>
                </div>

                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    style={{ width: `${jobStatus.progress || 0}%` }}
                  />
                </div>

                {jobStatus.data?.filename && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono bg-black/30 p-2 rounded">
                    <Disc className="w-3 h-3" />
                    <span className="truncate">{jobStatus.data.filename}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Area */}
        {videoData && !jobStatus && videoData.type === 'playlist' && (
          <PlaylistInfo data={videoData} onDownload={handleAnalyzeUrl} />
        )}

        {videoData && !jobStatus && videoData.type !== 'playlist' && (
          <VideoInfo data={videoData} onDownload={handleDownload} />
        )}

        {/* Footer Features */}
        {!videoData && !isLoading && !jobStatus && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mt-12 opacity-50 text-xs text-neutral-500 font-mono uppercase tracking-widest">
            <div className="flex items-center justify-center gap-2">
              <Youtube className="w-4 h-4" /> 8K/4K Ready
            </div>
            <div className="flex items-center justify-center gap-2">
              <Disc className="w-4 h-4" /> 320kbps MP3
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Hardware Accel
            </div>
            <div className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> No Limits
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
