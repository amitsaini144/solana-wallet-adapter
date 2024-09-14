import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletIcon, CheckIcon, Copy, CoinsIcon, SignatureIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function WalletCard() {
    const { connected, publicKey } = useWallet();
    const [publicKeyCopied, setPublicKeyCopied] = useState(false)
    const [showBalance, setShowBalance] = useState(false)
    const [signedMessage, setSignedMessage] = useState('')

    const handleCopyPublicKey = () => {
        navigator.clipboard.writeText(publicKey?.toString() ?? '');
        setPublicKeyCopied(true)
        setTimeout(() => setPublicKeyCopied(false), 2000)
    }

    const handleSignMessage = () => {
        setSignedMessage('Signed Message: Hello, Solana! Timestamp: ' + new Date().toISOString())
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
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-purple-700">Balance:</span>
                    <div className="flex items-center">
                        {showBalance ? (
                            <span className="mr-2 text-purple-700">0 SOL</span>
                        ) : (
                            <span className="mr-2 text-purple-700">••••••</span>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)}
                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-200">
                            {showBalance ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="airdrop-amount" className="block text-sm font-medium mb-1 text-purple-700">Airdrop Amount</label>
                        <div className="flex space-x-2">
                            <Input type="number" min={0} id="airdrop-amount" placeholder="SOL amount" className="bg-white/50 border-purple-300 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                                <CoinsIcon className="mr-2 h-4 w-4" /> Airdrop
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="sign-message" className="block text-sm font-medium mb-1 text-purple-700">Sign Message</label>
                        <div className="flex space-x-2">
                            <Input id="sign-message" placeholder="Enter message" className="bg-white/50 border-purple-300" />
                            <Button variant="secondary" className="bg-purple-700 hover:bg-purple-800 text-white" onClick={handleSignMessage}>
                                <SignatureIcon className="mr-2 h-4 w-4" /> Sign
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}