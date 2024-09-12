import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState<string | null>(null);

    async function onClick() {
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
        <div className='flex flex-col items-center gap-4'>
            <div>
                <input
                    type="text"
                    id="message"
                    placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300 focus:outline-none font-medium rounded-lg text-sm pl-5 pr-2 py-2.5 me-2 mb-2"
                />
                <button
                    onClick={onClick}
                    disabled={!message}
                    className={`text-white bg-[#512da8] border border-gray-300 focus:outline-none hover:bg-black/90 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${!message ? 'opacity-60' : ''}`}
                >  Sign Message </button>
            </div>

            {signature && (
                <div className=''>
                    <p><span className='font-bold'>Message Signature: </span> {signature}</p>
                </div>
            )}
        </div>
    );
};