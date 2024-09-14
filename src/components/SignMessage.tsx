import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignatureIcon } from "lucide-react";

export default function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState<string | null>(null);

    async function handleSignMessage() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        const isValid = ed25519.verify(signature, encodedMessage, publicKey.toBytes());
        if (!isValid) throw new Error('Message signature invalid!');
        setSignature(bs58.encode(signature));

        toast.message('Message signature:', {
            description: `${bs58.encode(signature)}`,
        })
    };

    return (
        <div className="flex space-x-2">
            <Input
                type="text"
                id="message"
                placeholder="Enter message"
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/50 border-purple-300"
            />
            <Button
                onClick={handleSignMessage}
                disabled={!message}
                className="bg-purple-700 hover:bg-purple-800 text-white">
                <SignatureIcon className="mr-2 h-4 w-4" /> Sign
            </Button>
        </div>
    );
};