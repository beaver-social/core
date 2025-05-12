import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Image } from "./Image";
// import { useAuth } from "@beaver/react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import Icon from "./Icon";
import WelcomeSplash from "./animations/WelcomeSplash";
import { useBeaver, useLogin } from "@beaver/react";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
};

export default function ConnectIdentity({ open, onOpenChange }: Props) {
  const beaver = useBeaver();
  const { mutate: login, isSuccess: isLoginSuccess, isError: isLoginError, isPending: isLoginPending } = useLogin();
  const [isOpen, setIsOpen] = useState(open || false);
  const [showWelcomeSplash, setShowWelcomeSplash] = useState(false);
  const [isConnectIdentitySelected, setisConnectIdentitySelected] = useState(false);

  if (showWelcomeSplash) {
    return (
      <WelcomeSplash
        onComplete={() => {
          setShowWelcomeSplash(false);
        }}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(newOpen: boolean) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
      setisConnectIdentitySelected(newOpen);
    }}>
      <DialogTrigger asChild>
        <div
          className={`relative flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition-colors mt-3 ${isConnectIdentitySelected ? 'bg-primary/5' : 'hover:bg-muted'}`}
        >
          <Icon name="User" />
          <span className={isConnectIdentitySelected ? "text-primary font-stretch-semi-condensed" : ""}>Connect</span>
          {isConnectIdentitySelected && (
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 h-full bg-primary rounded-r-sm"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              layoutId="profileIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Connect to Beaver Social
          </DialogTitle>
          <DialogDescription className="text-center">
            Choose your preferred way to connect
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Wallet Connect Section */}
          <div className="space-y-2">
            <div className="space-y-2 w-full">
              {beaver.wallet.wallets.map((wallet, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full flex py-10"
                  onClick={() => {
                    beaver.wallet.connect(index);
                  }}
                >
                  <>
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      className="size-8 p-1 object-contain rounded-sm bg-white"
                    />
                    <p>{wallet.name}</p>
                  </>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <p className="text-xs text-muted-foreground">
            By connecting, you agree to our{" "}
            <a className="underline" href="/terms-of-service">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline" href="/privacy-policy">
              Privacy Policy
            </a>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
