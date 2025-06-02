import { useTheme } from "@/shared/context/theme-provider";
import { Image } from "@/shared/components/Image";
import Icon from "@/shared/components/Icon";
import { useBeaver, useLogin } from "@beaver/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import ConnectIdentity from "@/shared/components/ConnectIdentity";
import Disconnect from "@/shared/components/Disconnect";
import { useLocation } from "react-router";

export default function TopNav() {
  const { theme } = useTheme();
  const beaver = useBeaver();
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    login();
    setIsPopoverOpen(false);
  };

  if (location.pathname === "/app") {
    return (
      <div className="flex justify-between items-center px-3 py-4">
        <div className="flex items-center gap-[7px]">
          <Image
            src={
              theme === "dark" ? "/icons/logo_dark.png" : "/icons/logo_light.png"
            }
            alt="logo"
            className="size-12"
          />
          <div className="pr-1">
            <p className="text-xl font-bold">Beaver</p>
            <p className="-mt-1 text-sm text-grey-300">Social</p>
          </div>
        </div>

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Icon name="Ellipsis" className="size-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48" align="end">
            <div className="">
              {!beaver.wallet.isConnected ? (
                <ConnectIdentity
                  open={isConnectDialogOpen}
                  onOpenChange={setIsConnectDialogOpen}
                />
              ) : !beaver.user ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLogin}
                  disabled={isLoginPending}
                >
                  <Icon name={isLoginPending ? "LoaderCircle" : "LogIn"} className={`mr-2 size-4 ${isLoginPending ? "animate-spin" : ""}`} />
                  {isLoginPending ? "Logging in..." : "Login"}
                </Button>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Logged in</span>
                  <Disconnect />
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  } else {
    return null;
  }
}
