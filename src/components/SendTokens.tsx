import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState<number | null>(null);
    const [to, setTo] = useState('');

    async function sendTokens() {
        if (!wallet.publicKey) throw new Error('Wallet not connected!');
        if (!amount) throw new Error('Amount not specified!');

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        toast.success("Sent " + amount + " SOL to " + to);
    }

    return <div>
        <input
            id="to"
            type="text"
            placeholder="Send to"
            onChange={(e) => setTo(e.target.value)}
            className="border border-gray-300 focus:outline-none font-medium rounded-lg text-sm pl-5 pr-2 py-2.5 me-2 mb-2"
        />
        <input
            id="amount"
            type="number"
            placeholder="Amount"
            onChange={(e) => {
                const value = Number(e.target.value);
                if (value > 0) setAmount(value);
                else setAmount(null);
            }}
            className="border border-gray-300 focus:outline-none font-medium rounded-lg text-sm pl-5 pr-2 py-2.5 me-2 mb-2"
        />
        <button
            onClick={sendTokens}
            disabled={!amount || !to}
            className={`text-white bg-[#512da8] border border-gray-300 focus:outline-none hover:bg-black/90 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${!amount || !to ? 'opacity-60' : ''}`}
        >Send</button>
    </div>
}