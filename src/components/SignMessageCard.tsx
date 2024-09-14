import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, ClipboardIcon, Copy } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function SignMessageCard() {
    const [signedMessage, setSignedMessage] = useState('')
    const [copied, setCopied] = useState(false)

    const handleCopyMessage = () => {
        navigator.clipboard.writeText(signedMessage)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSignMessage = () => {
        setSignedMessage('Signed Message: Hello, Solana! Timestamp: ' + new Date().toISOString())
    }

    return (
        <Card className="md:col-span-2 bg-gradient-to-br from-yellow-200 to-green-200 border-none shadow-lg">
            <CardHeader>
                <CardTitle className="text-purple-700 text-2xl">Signed Message</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Input
                        value={signedMessage}
                        readOnly
                        className="bg-white/50 border-purple-300 h-24 text-purple-700"
                        placeholder="Your signed message will appear here"
                    />
                    <Button
                        onClick={handleCopyMessage}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                        disabled={!signedMessage}
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="mr-2 h-4 w-4" /> Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="mr-2 h-4 w-4" /> Copy Signed Message
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}