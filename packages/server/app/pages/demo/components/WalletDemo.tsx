import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { icons } from "lucide-react";
import { useBeaver } from "@beaver/react";

interface Wallet {
  name: string;
  logo: string;
  icon: keyof typeof icons;
}

export default function WalletDemo() {
  const beaver = useBeaver();
  const wallets = beaver.wallet.wallets;
  const isConnected = beaver.wallet.isConnected;

  const handleConnect = async (index: number) => {
    beaver.wallet.connect(index);
  };

  const handleDisconnect = () => {
    beaver.wallet.disconnect();
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">Wallet Connection</h2>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Connect your Sui wallet to interact with the Beaver Social platform.
        </p>
      </div>

      {isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 md:p-6 bg-grey-800/30 border border-grey-800 rounded-md">
            <div className="flex gap-2 items-center">
              <Icon
                name="CircleCheck"
                className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600"
              />
              <h3 className="text-base md:text-lg font-medium text-green-700">
                {" "}
                Connected
              </h3>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={handleDisconnect}
            className="w-full text-xs md:text-sm"
          >
            <Icon name="LogOut" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
            Disconnect Wallet
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-3">
            {wallets.map((wallet, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full flex py-10"
                onClick={() => handleConnect(index)}
              >
                <>
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="size-8 p-1 object-contain rounded-sm bg-white"
                  />
                  <p>{wallet.name}</p>
                </>
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
