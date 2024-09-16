import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { balanceUpdateEvent } from "@/lib/events";

export default function GetBalance() {
    const { connection } = useConnection();
    const { publicKey, connected } = useWallet();
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

        const handleBalanceUpdate = () => {
            getBalance();
        };

        balanceUpdateEvent.addEventListener('balanceUpdate', handleBalanceUpdate);
        return () => {
            balanceUpdateEvent.removeEventListener('balanceUpdate', handleBalanceUpdate);
        };
    }, [getBalance]);

    return (
        <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-[#9945FF]">Balance:</span>
            <div className="flex items-center">
                {showBalance ? (
                    <span className="mr-2 ">{connected ? balance.toFixed(9) : 0} SOL</span>
                ) : (
                    <span className="mr-2 text-[#9945FF]">••••••</span>
                )}
                <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)}
                    className="text-[#9945FF] hover:text-purple-700 hover:bg-purple-200">
                    {showBalance ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
}
