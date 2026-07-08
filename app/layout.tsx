import type { Metadata } from "next";
import "./globals.css";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

export const metadata: Metadata = {
  title: "MIM Kruskal Faucet",
  description: "Probability magic for pump.fun MIM token",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  const endpoint = 'https://api.mainnet-beta.solana.com';

  return (
    <html lang="en">
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
