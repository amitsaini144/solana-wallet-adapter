"use client";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Toaster, toast } from 'sonner';
import GetBalance from "@/components/GetBalance";

export default function Home() {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  const getAirdropOnClick = useCallback(async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    };

    if (!amount) {
      toast.error("Amount not specified");
      return;
    }

    const airdropPromise = async () => {
      try {
        await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
        return "Airdrop confirmed!";
      } catch (err) {
        toast.error("Airdrop failed!");
      }
    }
    toast.promise(airdropPromise, {
      loading: 'Loading...',
      success: (data) => data,
    });
  }, [publicKey, connection, amount]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen"><Spinner color="secondary" /></div>;
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2 rounded">
        <WalletMultiButton />
        {connected && <WalletDisconnectButton />}
        {publicKey && (
          <div className="flex flex-col items-center gap-4">
            <h1><span className="font-bold">Your Public key:</span> {publicKey?.toString()}</h1>
            <GetBalance />
            <div>
              <input
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) {
                    setAmount(value);
                  } else {
                    setAmount(null);
                  }
                }}
                type="number"
                min={0}
                placeholder="Amount"
                className="border border-gray-300 focus:outline-none font-medium rounded-lg text-sm pl-5 pr-2 py-2.5 me-2 mb-2"
              />
              <button
                onClick={getAirdropOnClick}
                type="button"
                className="text-white bg-[#512da8] border border-gray-300 focus:outline-none hover:bg-black/90 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Get Airdrop
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster richColors />
    </main>
  );
}
