import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function SendTokensCard() {
    return (
        <Card className="bg-gradient-to-br from-blue-200 to-green-200 border-none shadow-lg">
            <CardHeader>
                <CardTitle className="text-purple-700 text-2xl">Send Tokens</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="receiver-address" className="block text-sm font-medium mb-1 text-purple-700">Receiver Address</label>
                        <Input id="receiver-address" placeholder="Solana address" className="bg-white/50 border-purple-300" />
                    </div>
                    <div>
                        <label htmlFor="send-amount" className="block text-sm font-medium mb-1 text-purple-700">Amount</label>
                        <Input id="send-amount" placeholder="SOL amount" className="bg-white/50 border-purple-300" />
                    </div>
                    <Button className="w-full bg-[#14F195] hover:bg-[#14F195]/90 text-purple-700 font-semibold">
                        <SendIcon className="mr-2 h-4 w-4" /> Send Tokens
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}