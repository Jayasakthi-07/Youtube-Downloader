"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Download, ListVideo, PlayCircle } from "lucide-react"

interface PlaylistInfoProps {
    data: any
    onDownload: (url: string) => void
}

export function PlaylistInfo({ data, onDownload }: PlaylistInfoProps) {
    if (!data) return null

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="bg-neutral-900/60 backdrop-blur-xl border-white/5 overflow-hidden shadow-2xl p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-purple-600/90 text-white font-bold tracking-wider">
                                PLAYLIST
                            </Badge>
                            <span className="text-white/60 text-sm font-mono">
                                {data.entries.length} Videos
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            {data.title}
                        </h2>
                        <p className="text-white/60 font-medium">
                            by <span className="text-cyan-400">{data.uploader}</span>
                        </p>
                    </div>
                </div>

                <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                    <div className="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Tracks</span>
                        <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[10px]">
                            Auto-Select Best Quality
                        </Badge>
                    </div>

                    <ScrollArea className="h-[400px]">
                        <div className="flex flex-col p-2 gap-1">
                            {data.entries.map((entry: any, i: number) => (
                                <div key={entry.id || i} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <span className="text-neutral-600 font-mono text-xs w-6 text-center">{i + 1}</span>
                                        <div className="relative w-12 h-8 bg-neutral-800 rounded overflow-hidden shrink-0">
                                            {/* Thumbnails might be missing in flat extraction sometimes */}
                                            {entry.thumbnail ? (
                                                <img src={entry.thumbnail} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                                    <PlayCircle className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                                                {entry.title}
                                            </span>
                                            <span className="text-xs text-neutral-500 truncate">
                                                {Math.floor(entry.duration / 60)}:{(entry.duration % 60).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-neutral-400 hover:text-white hover:bg-cyan-500/20"
                                        onClick={() => onDownload(entry.url || `https://www.youtube.com/watch?v=${entry.id}`)}
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </Card>
        </div>
    )
}
