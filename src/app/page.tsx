"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import WalletCard from "@/components/WalletCard";
import SendTokensCard from "@/components/SendTokensCard";
import SignMessageCard from "@/components/SignMessageCard";
import { ThemeToggler } from "@/components/ThemeToggler";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen">
      <Spinner color="primary" size="lg" />
    </div>;
  }

  return (
    <main className="min-h-screen">
      <motion.div className="pt-5 px-3 flex justify-between lg:mx-16"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center mb-5"><span className="sm:hidden">SOL</span><span className="hidden sm:inline">Solana</span> Wallet Adapter</h1>
        <div className="flex justify-center gap-1">
          <Link href={'https://github.com/amitsaini144/wallet-adapter'}
            target="_blank"
            rel="noreferrer">
            <div
              className={` ${buttonVariants({ variant: "ghost" })}`}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ThemeToggler />
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto p-4 sm:p-5 lg:p-6 lg:px-0">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity:100 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }}>
            <WalletCard />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }}>
            <SendTokensCard />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }} className="md:col-span-2">
            <SignMessageCard />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
