"use client";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Toaster, toast } from 'sonner'

export default function Home() {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen"><Spinner color="secondary" /></div>;
  }

  const getAirdropOnClick = async () => {
    if (!publicKey) throw new Error("Wallet is not Connected");

    const airdropPromise = async () => {
      try {
        await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
        return "Airdrop confirmed!";
      } catch (err) {
        toast.error("Airdrop failed!");
      }
    }

    toast.promise(airdropPromise, {
      loading: 'Loading...',
      success: (data) => data,
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2 rounded">
        <WalletMultiButton />
        {connected && <WalletDisconnectButton />}
        {publicKey && (
          <div className="flex flex-col items-center gap-4">
            <h1><span className="font-bold">Your Public key:</span> {publicKey?.toString()}</h1>
            <div>
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
