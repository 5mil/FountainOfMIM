'use client';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { kruskalMagic } from './utils';

export default function MIMFaucet() {
  const wallet = useWallet();
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState(0);

  const claimTokens = async () => {
    if (!wallet.publicKey) {
      setStatus('Please connect wallet first');
      return;
    }
    const magicAmount = kruskalMagic();
    setAmount(magicAmount);
    setStatus('Performing Kruskal magic...');

    try {
      const message = new TextEncoder().encode(`Claim ${magicAmount} MIM from Kruskal Faucet`);
      const signature = await wallet.signMessage?.(message);
      setStatus(`🎩 Magic converged! Claimed ${magicAmount} MIM. Tx signed!`);
    } catch (e) {
      setStatus('Signature failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-zinc-950/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🪄</div>
          <h1 className="text-5xl font-bold tracking-tight">MIM Kruskal Faucet</h1>
          <p className="text-purple-400 mt-3">Probability Magic Meets Solana</p>
        </div>

        <div className="flex justify-center mb-8">
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
        </div>

        {wallet.publicKey && (
          <button
            onClick={claimTokens}
            className="w-full py-5 text-xl font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-2xl hover:brightness-110 active:scale-[0.985] transition-all shadow-lg"
          >
            ✨ Run the Magic Trick & Claim Tokens
          </button>
        )}

        {status && (
          <div className="mt-6 p-4 bg-black/50 rounded-2xl text-center text-sm border border-purple-500/20">
            {status}
          </div>
        )}
        {amount > 0 && (
          <div className="text-center mt-4 text-3xl font-mono text-emerald-400">
            +{amount} MIM
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-zinc-500">
          Faucet Address: [ADD YOURS]<br />
          Connect owner wallet to fund via Phantom
        </div>
      </div>
    </div>
  );
}
