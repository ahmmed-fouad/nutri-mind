import { Link, CheckCircle, XCircle } from "lucide-react";
import React from "react";

type ConnectedAccount = { icon: string; name: string; status: string };
type ConnectedAccountsCardProps = { connectedAccounts: ConnectedAccount[] };

export default function ConnectedAccountsCard({ connectedAccounts }: ConnectedAccountsCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 flex flex-col gap-6">
      <h2 className="text-lg sm:text-xl font-bold text-primary mb-2 flex items-center gap-2">
        <Link className="w-5 h-5" /> Connected Accounts
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full">
        {connectedAccounts.map((acc) => (
          <div
            key={acc.name}
            className={`flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg w-full sm:w-auto ${acc.status !== 'connected' ? "opacity-60" : ""}`}
          >
            {acc.icon === 'google' && <img src="/assets/logo.png" alt="Google" className="w-5 h-5" />} 
            {acc.icon === 'apple' && 'Apple'}
            {acc.name}
            {acc.status === 'connected' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-zinc-400" />}
          </div>
        ))}
      </div>
      <button className="w-full py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition mt-2">
        Connect New Account
      </button>
    </div>
  );
} 