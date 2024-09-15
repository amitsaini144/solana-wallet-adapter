"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import WalletCard from "@/components/WalletCard";
import SendTokensCard from "@/components/SendTokensCard";
import SignMessageCard from "@/components/SignMessageCard";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Spinner color="primary" size="lg" />
    </div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">Solana Wallet Adapter</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletCard />
          <SendTokensCard />
          <SignMessageCard />
        </div>
      </div>
    </main>
  );
}
