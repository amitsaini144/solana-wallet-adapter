import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'sonner';

export default function GetBalance() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    const getBalance = useCallback(async () => {
        if (!publicKey) {
            setBalance(null);
            return;
        }

        try {
            const balance = await connection.getBalance(publicKey)
            setBalance(balance)
        } catch (error) {
            toast.error('Failed to fetch balance')
        }
    }, [publicKey, connection]);

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return (
        <div className="flex items-center gap-4">
            <h1><span className="font-bold">Your Balance:</span> {balance}</h1>
            <button onClick={getBalance} type="button" className="text-white bg-[#512da8] border border-gray-300 focus:outline-none hover:bg-black/90 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
            Get Balance </button>
        </div>
    );
}
