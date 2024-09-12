"use client";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { Toaster } from 'sonner';
import GetBalance from "@/components/GetBalance";
import GetAirDrop from "@/components/RequestAirdrop";
import SignMessage from "@/components/SignMessage";

export default function Home() {
  const { connected, publicKey } = useWallet();
  const [isClient, setIsClient] = useState(false);

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
            <GetAirDrop />
            <SignMessage />
          </div>
        )}
      </div>
      <Toaster richColors />
    </main>
  );
}
