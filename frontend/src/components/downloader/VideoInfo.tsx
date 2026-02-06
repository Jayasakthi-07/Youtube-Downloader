"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Film, Music, Clock, Eye, FileVideo, Play } from "lucide-react"

interface VideoInfoProps {
    data: any
    onDownload: (formatId: string, isAudio: boolean, audioQuality?: string) => void
}

export function VideoInfo({ data, onDownload }: VideoInfoProps) {
    if (!data) return null

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="bg-neutral-900/60 backdrop-blur-xl border-white/5 overflow-hidden shadow-2xl">
                <div className="grid lg:grid-cols-[450px_1fr] gap-0">
                    {/* Thumbnail Side */}
                    <div className="relative group min-h-[300px] lg:h-full bg-black">
                        <img
                            src={data.thumbnail}
                            alt={data.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent lg:bg-gradient-to-r" />

                        <div className="absolute bottom-6 left-6 space-y-2">
                            <Badge className="bg-red-600/90 text-white font-bold tracking-wider hover:bg-red-700">
                                YOUTUBE
                            </Badge>
                            <h2 className="text-xl md:text-2xl font-bold text-white line-clamp-2 leading-tight drop-shadow-lg">
                                {data.title}
                            </h2>
                            <div className="flex items-center gap-4 text-xs font-medium text-white/90">
                                <span className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded">
                                    <Clock className="w-3.5 h-3.5" />
                                    {Math.floor(data.duration / 60)}:{(data.duration % 60).toString().padStart(2, '0')}
                                </span>
                                <span className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded">
                                    <Eye className="w-3.5 h-3.5" />
                                    {parseInt(data.view_count).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info Side */}
                    <div className="p-6 md:p-8 flex flex-col h-full bg-neutral-900/40">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                    {data.uploader ? data.uploader[0].toUpperCase() : 'U'}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white tracking-wide">{data.uploader || 'Unknown Channel'}</span>
                                    <span className="text-xs text-white/70 uppercase tracking-wider">Channel</span>
                                </div>
                            </div>
                        </div>

                        <Tabs defaultValue="video" className="w-full h-full flex flex-col">
                            <TabsList className="bg-black/60 border border-white/10 p-1 w-full justify-start rounded-lg mb-4">
                                <TabsTrigger value="video" className="flex-1 text-neutral-400 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 uppercase text-xs font-bold tracking-widest py-2.5 hover:text-white transition-colors">
                                    <Film className="w-4 h-4 mr-2" /> Video
                                </TabsTrigger>
                                <TabsTrigger value="audio" className="flex-1 text-neutral-400 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 uppercase text-xs font-bold tracking-widest py-2.5 hover:text-white transition-colors">
                                    <Music className="w-4 h-4 mr-2" /> Audio
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="video" className="mt-0 space-y-2 pr-1 custom-scrollbar overflow-y-auto max-h-[350px]">
                                {data.formats.filter((f: any) => f.type === 'video' || f.type === 'muxed').reverse().map((f: any) => (
                                    <div key={f.format_id} className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-cyan-500/20">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-cyan-900/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                                <FileVideo className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white flex items-center gap-2">
                                                    {f.resolution || 'Original'}
                                                    {f.height >= 1080 && <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-cyan-500/20 text-cyan-300 pointer-events-none">HD</Badge>}
                                                </span>
                                                <span className="text-xs text-neutral-400 font-mono">
                                                    {f.ext.toUpperCase()} • {(f.filesize && (f.filesize / 1024 / 1024).toFixed(1) + ' MB') || 'Size unknown'}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20"
                                            onClick={() => onDownload(f.format_id, false)}
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="audio" className="mt-0 space-y-2 pr-1 custom-scrollbar overflow-y-auto max-h-[350px]">
                                <div className="space-y-3">
                                    {[
                                        { id: '320', label: 'Ultra High', bitrate: '320 kbps', desc: 'Studio Quality (Slowest)', color: 'text-purple-300' },
                                        { id: '256', label: 'High', bitrate: '256 kbps', desc: 'Premium Quality', color: 'text-purple-300' },
                                        { id: '192', label: 'Medium', bitrate: '192 kbps', desc: 'Standard Quality', color: 'text-purple-400' },
                                        { id: '128', label: 'Low', bitrate: '128 kbps', desc: 'Data Saver (Fastest)', color: 'text-purple-400' },
                                    ].map((opt) => (
                                        <div key={opt.id} className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-purple-500/20">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded bg-purple-900/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                                    <Music className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-bold ${opt.color}`}>{opt.bitrate} <span className="text-white/70 font-normal ml-1">- {opt.label}</span></span>
                                                    <span className="text-xs text-neutral-400">{opt.desc}</span>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20"
                                                onClick={() => onDownload(opt.id, true, opt.id)}
                                            >
                                                <Download className="w-4 h-4 mr-2" /> Convert
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    )
}
