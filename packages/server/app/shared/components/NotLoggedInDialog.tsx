import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import ConnectIdentity from "./ConnectIdentity";
import Icon from "./Icon";
import { useNavigate } from "react-router";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function NotLoggedInDialog({ open, onOpenChange }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(
    open !== undefined ? open : true,
  );
  const [animationStep, setAnimationStep] = useState(0);
  const navigate = useNavigate();

  // Reset animation state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setAnimationStep(0);
      navigate("/app");
    } else {
      const timer = setTimeout(() => {
        setAnimationStep(1);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/80 opacity-50"></div>

          <div className="p-6 relative z-10">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-2xl font-bold text-center">
                Join Beaver Social
              </DialogTitle>
              <DialogDescription className="text-center">
                Connect to unlock all features and interact with the community
              </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center gap-6 my-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.5,
                    },
                  }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Icon name="Lock" className="size-10 text-primary/80" />
                </motion.div>

                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">Restricted Access</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                    You need to connect your identity to access this content and
                    interact with the Beaver Social community.
                  </p>
                </div>

                <div className="flex justify-center w-full">
                  <ConnectIdentity
                    open={animationStep === 1}
                    onOpenChange={(open) => {
                      if (!open) {
                        handleOpenChange(false);
                      }
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-muted/30 p-4 border-t flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Explore the platform as a guest
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenChange(false)}
              className="text-xs"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
