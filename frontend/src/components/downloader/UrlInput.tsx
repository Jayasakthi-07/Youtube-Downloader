"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2, ArrowRight } from "lucide-react"

interface UrlInputProps {
    onAnalyze: (url: string) => void
    isLoading: boolean
}

export function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
    const [url, setUrl] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (url.trim()) {
            onAnalyze(url)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${url ? 'text-cyan-400' : 'text-neutral-500'}`} />
            </div>
            <Input
                type="url"
                placeholder="Paste YouTube Link Here..."
                className="w-full h-14 pl-12 pr-32 bg-white/5 border-white/10 text-white placeholder:text-neutral-600 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lg shadow-xl shadow-black/20"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoFocus
            />
            <div className="absolute inset-y-1 right-1">
                <Button
                    type="submit"
                    disabled={isLoading || !url}
                    className={`h-full rounded-xl px-6 font-bold tracking-wide transition-all ${url
                            ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <div className="flex items-center gap-2">
                            ANALYZE <ArrowRight className="h-4 w-4" />
                        </div>
                    )}
                </Button>
            </div>
        </form>
    )
}
