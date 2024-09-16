import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { CheckIcon, Copy } from "lucide-react";
import { useRecoilValue } from 'recoil';
import { signatureMessageAtom } from '@/store/atoms';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function SignMessageCard() {
    const signedMessage = useRecoilValue(signatureMessageAtom);
    const [copied, setCopied] = useState(false)

    const handleCopyMessage = () => {
        navigator.clipboard.writeText(signedMessage)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card className="md:col-span-2 border shadow-lg">
            <CardHeader>
                <CardTitle className="text-[#9945FF] text-2xl">Signed Message</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Textarea
                        value={signedMessage}
                        readOnly
                        className="border-purple-300 h-24"
                        placeholder="Your signed message will appear here"
                    />
                    <Button
                        onClick={handleCopyMessage}
                        className="w-full bg-[#9945FF] hover:bg-purple-700 text-white"
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