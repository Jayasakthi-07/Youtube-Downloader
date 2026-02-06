"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function LegalModal() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const hasAccepted = localStorage.getItem("vortex_legal_accepted")
        if (!hasAccepted) {
            setOpen(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("vortex_legal_accepted", "true")
        setOpen(false)
    }

    // Prevent closing by interacting outside or pressing escape
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            // If trying to close (isOpen=false) for any reason other than our button, force it open
            // unless accepted. But since state is local, we just rely on open state.
            // Actually, forcing 'open' prop to 'true' in Dialog keeps it open? 
            // Radix Dialog handles controlled state. If onOpenChange sends false, we just ignore it?
            // Let's just pass open={true} and onOpenChange={undefined} to lock it, 
            // or effectively ignore unexpected closes.
        }
        // We only change setOpen via handleAccept
    }

    if (!open) return null

    return (
        <Dialog open={open} onOpenChange={() => { }}>
            <DialogContent
                className="bg-neutral-900 border-red-900/50 text-white animate-in zoom-in-95 duration-300 sm:max-w-md"
                // Hide close button if possible via props, but our Dialog implementation might show it by default.
                // We can hide it via CSS or modifying DialogContent if needed, but standard behavior is fine.
                showCloseButton={false}
            >
                <DialogHeader>
                    <DialogTitle className="text-red-500 font-bold uppercase tracking-wider flex items-center gap-2">
                        ⚠️ Legal Disclaimer
                    </DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        This tool is intended for **personal archiving purposes only**.
                        <br /><br />
                        Downloading copyrighted material without permission may violate the Terms of Service of the hosting platform and local laws.
                        <br /><br />
                        By continuing, you agree that you are solely responsible for compliance with all applicable laws and regulations.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center">
                    <Button
                        onClick={handleAccept}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold border-0 shadow-lg shadow-red-900/20"
                    >
                        I Understand & Agree
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
