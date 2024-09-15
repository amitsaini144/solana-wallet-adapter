import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletIcon, CheckIcon, Copy } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import RequestAirdrop from "@/components/RequestAirdrop";
import GetBalance from "@/components/GetBalance";
import SignMessage from "@/components/SignMessage";

export default function WalletCard() {
    const { connected, publicKey } = useWallet();
    const [publicKeyCopied, setPublicKeyCopied] = useState(false);

    const handleCopyPublicKey = () => {
        navigator.clipboard.writeText(publicKey?.toString() ?? '');
        setPublicKeyCopied(true)
        setTimeout(() => setPublicKeyCopied(false), 2000)
    }

    return (
        <Card className="bg-gradient-to-br from-pink-200 to-orange-200 border-none shadow-lg">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-purple-700">
                    <span className="text-2xl">Wallet</span>
                    {connected ? (
                        <WalletDisconnectButton />
                    ) : (
                        <WalletMultiButton >
                            <WalletIcon className="mr-2 mb-0.5 h-4 w-4" /> Select Wallet
                        </WalletMultiButton>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {connected && (
                    <div className="mb-4 p-2 bg-white/50 rounded-md flex items-center justify-between">
                        <span className="text-sm font-medium text-purple-700 truncate mr-2">
                            {publicKey?.toString()}
                        </span>
                        <Button
                            size="sm"
                            onClick={handleCopyPublicKey}
                            className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                            {publicKeyCopied ? (
                                <CheckIcon className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                )}
                <GetBalance />
                <div className="space-y-4">
                    <div>
                        <label htmlFor="airdrop-amount" className="block text-sm font-medium mb-1 text-purple-700">Airdrop Amount</label>
                        <RequestAirdrop />
                    </div>
                    <div>
                        <label htmlFor="sign-message" className="block text-sm font-medium mb-1 text-purple-700">Sign Message</label>
                        <SignMessage />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}