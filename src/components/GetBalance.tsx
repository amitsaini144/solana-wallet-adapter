import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function GetBalance({ publicKey, connected } : { publicKey: PublicKey | null, connected: boolean }) {
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);
    const [showBalance, setShowBalance] = useState(false)

    const getBalance = useCallback(async () => {
        if (!publicKey) {
            setBalance(0);
            return;
        }

        try {
            const balance = await connection.getBalance(publicKey)
            setBalance(balance / LAMPORTS_PER_SOL)
        } catch (error) {
            toast.error('Failed to fetch balance')
        }
    }, [publicKey, connection]);

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return (
        <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-purple-700">Balance:</span>
            <div className="flex items-center">
                {showBalance ? (
                    <span className="mr-2 text-purple-700">{connected ? balance.toFixed(9) : 0} SOL</span>
                ) : (
                    <span className="mr-2 text-purple-700">••••••</span>
                )}
                <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)}
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-200">
                    {showBalance ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
}
