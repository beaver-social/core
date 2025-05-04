import ThemeSwitch from "@/shared/components/ThemeSwitch";
import { useEffect, useState } from "react";
// import { useAuth } from "@beaver/react";

type Props = {};

export default function GoogleOAuth({ }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { zkLoginCallback } = useAuth();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      if (window.location.hash.includes("id_token")) {
        setIsLoading(true);
        // await zkLoginCallback({
        //     redirectPath: "/?auth_success=true&auth_type=google"
        // });
      }
    };

    handleOAuthRedirect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 bg-grey-200 rounded-full animate-pulse" />
      </div>

      <div className="fixed bottom-0 right-0 p-4">
        <ThemeSwitch />
      </div>
    </div>
  );
}
