import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Copy, Eye, AlertTriangle } from "lucide-react";
import { useBeaver } from "@beaver/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Image } from "@/shared/components/Image";

export default function AppId() {
  const [appName, setAppName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [existingAppsDialogOpen, setExistingAppsDialogOpen] = useState(false);
  const [createdAppData, setCreatedAppData] = useState<any>(null);
  const navigate = useNavigate();

  const beaver = useBeaver();
  const { mutateAsync: createAppId, isPending: isCreatingAppId, isSuccess: isCreatingAppIdSuccess } =
    beaver.application.createAppId;
  const { data: appData, isLoading: isLoadingApps, refetch: refetchApps } =
    beaver.application.getApplications;

  // Check if user is logged in
  const isLoggedIn = !!beaver.user;
  const hasReachedLimit = (appData && appData?.apps?.length >= 5) || false;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!appName.trim() || appName.trim().length < 3) {
      toast.error("Please enter an app name with at least 3 characters");
      return;
    }

    // Check app limit before creating
    if (hasReachedLimit) {
      toast.error("You have reached the maximum limit of 5 applications. Please delete an existing app to create a new one.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createAppId({ name: appName });
      setCreatedAppData(result);
      setSuccessDialogOpen(true);
      setAppName(""); // Clear the form
      toast.success("AppId created successfully!");
      refetchApps();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create AppId");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-cover bg-[url(/images/landing/4.jpg)] bg-center min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center w-full max-w-xl p-8 mx-10 space-y-8 overflow-hidden text-center border shadow-lg bg-background/80 glass rounded-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-full bg-primary/10"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <motion.path
                d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M9 7H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
              <motion.path
                d="M9 11H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="mb-4 text-2xl font-bold">
              Developer Access Required
            </h1>
            <p className="max-w-md mx-auto mb-6 text-muted-foreground">
              To request an AppId, you need to be logged in with a Beaver
              Identity. Create an account or sign in to continue.
            </p>
          </motion.div>

          <Button className="w-full max-w-xs" onClick={() => navigate("/app")}>
            Sign in or Create Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <Image
          src="/images/landing/4.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="flex flex-col items-center w-full max-w-xl p-8 mx-10 space-y-8 overflow-hidden text-center border shadow-lg bg-background/80 glass rounded-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-full bg-primary/10"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <motion.path
              d="M20 7L12 3L4 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M20 7V17L12 21L4 17V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M12 12L20 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            />
            <motion.path
              d="M12 12L4 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            />
            <motion.path
              d="M12 12V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="mb-4 text-2xl font-bold">Request Developer AppId</h1>
          <p className="max-w-md mx-auto mb-6 text-muted-foreground">
            Get an AppId to start building with Beaver SDKs. This will enable
            you to integrate Beaver's decentralized identity features into your
            application.
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="border bg-card/60 backdrop-blur-sm border-border/60">
            <CardContent className="p-6 space-y-6">
              {/* App Quota Display */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Applications created:</span>
                <Badge variant={hasReachedLimit ? "destructive" : "secondary"}>
                  {appData?.apps?.length || 0} / 5
                </Badge>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <Input
                      className="relative z-10 font-medium border-border/60"
                      placeholder="Enter your app name"
                      id="appName"
                      name="appName"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      required
                      disabled={hasReachedLimit}
                    />
                    <p className="mt-1 ml-1 text-xs text-muted-foreground">
                      This name will be associated with your developer
                      credentials
                    </p>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Button
                    className="relative w-full overflow-hidden"
                    type="submit"
                    disabled={isSubmitting || !appName.trim() || hasReachedLimit}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-4 h-4 mr-2 -ml-1 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Generate AppId"
                    )}
                  </Button>

                  {/* View Existing Apps Button */}
                  {appData?.apps && appData?.apps?.length > 0 && (
                    <Dialog open={existingAppsDialogOpen} onOpenChange={setExistingAppsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View My Applications ({appData?.apps?.length})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>My Applications</DialogTitle>
                          <DialogDescription>
                            Here are all your created applications. You can create up to 5 applications total.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>App Name</TableHead>
                                <TableHead>App ID</TableHead>
                                <TableHead>Created Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {appData?.apps?.map((app, index: number) => (
                                <TableRow key={app.appId || index}>
                                  <TableCell className="font-medium">{app.name || `App ${index + 1}`}</TableCell>
                                  <TableCell className="font-mono text-sm">
                                    <div className="flex items-center space-x-2">
                                      <span className="truncate max-w-xs">{app.appId}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(app.appId)}
                                        className="h-6 w-6 p-0"
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Active</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(app.appId)}
                                    >
                                      Copy ID
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Dialog */}
        <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>AppId Created Successfully!</span>
              </DialogTitle>
              <DialogDescription>
                Your new application has been created. Save these details securely.
              </DialogDescription>
            </DialogHeader>
            {createdAppData && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">App Name</label>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-medium">{createdAppData.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">App ID</label>
                    <div className="flex items-center justify-between mt-1 p-2 bg-background rounded border">
                      <code className="font-mono text-sm break-all">{createdAppData.appId}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(createdAppData.appId)}
                        className="ml-2 flex-shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {createdAppData.apiKey && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">API Key</label>
                      <div className="flex items-center justify-between mt-1 p-2 bg-background rounded border">
                        <code className="font-mono text-sm break-all">{createdAppData.apiKey}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(createdAppData.apiKey)}
                          className="ml-2 flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {createdAppData.createdAt && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Created At</label>
                      <div className="mt-1">
                        <span className="text-sm">{new Date(createdAppData.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Important:</p>
                      <p>Store these credentials securely. You won't be able to view the API key again.</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(JSON.stringify(createdAppData, null, 2))}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Data
                  </Button>
                  <Button onClick={() => setSuccessDialogOpen(false)} className="flex-1">
                    Done
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <motion.div
          className="max-w-md mt-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Your AppId gives you access to Beaver SDK features. Keep it secure and
          don't share it publicly.
        </motion.div>
      </div>
    </div>
  );
}
