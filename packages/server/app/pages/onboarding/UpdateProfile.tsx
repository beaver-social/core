import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Image } from "@/shared/components/Image";
import { useGlobalUIStore } from "@/shared/stores/zustand";
import { useBeaver, useRegister } from "@beaver/react";
import { toast } from "sonner";
import Icon from "@/shared/components/Icon";
// import { useAuth } from "@beaver/react";
type Props = {
  onComplete: () => void;
  handleBack: () => void;
}

export default function UpdateProfile({ onComplete, handleBack }: Props) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useState<HTMLInputElement | null>(null);
  const { onboardingData, setOnboardingData } = useGlobalUIStore();
  const { mutateAsync: register, isPending } = useRegister()
  const beaver = useBeaver();

  async function handleSubmit() {
    if (!name || name.length < 3) {
      return toast.error("Invalid Name")
    }

    if (!onboardingData?.username) {
      return toast.error("Set Username first")
    }

    register({
      fullName: name,
      username: onboardingData?.username,
      image: profilePicture,
      about,
    }).then(
      () => {
        onComplete();
      }
    ).catch((error) => {

      if (error.message.includes("Error: User already exists")) {
        onComplete();
      }

      console.log(error);
      toast.error("Error saving profile")
    })
  };

  const canSubmit = name.trim().length > 0;

  if (!onboardingData || onboardingData.username === null) {
    handleBack();
    return;
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Add some personal details to help others recognize you
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="bg-card/60 backdrop-blur-sm border border-border/60">
          <CardContent className="p-6 space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setProfilePicture(e.target.files?.[0] || null);
                  }}
                  ref={(input) => fileInputRef[1](input)}
                />

                {/* Profile Picture Preview */}
                <div
                  className="relative size-24 rounded-full bg-gray-100 border border-border flex items-center justify-center overflow-hidden cursor-pointer group"
                  onClick={() => fileInputRef[0]?.click()}
                >
                  {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30">
                      <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : profilePicture ? (
                    <>
                      <Image
                        src={URL.createObjectURL(profilePicture)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <Icon name="Camera" className="text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                          <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>

                <motion.div
                  className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full size-7 flex items-center justify-center border-2 border-background cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef[0]?.click()}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </motion.div>

              <p className="text-xs text-muted-foreground">
                Upload a profile picture
              </p>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border/60"
              />
            </div>

            {/* About Input */}
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium flex justify-between">
                <span>About</span>
                <span className="text-muted-foreground text-xs">{about.length}/160</span>
              </label>
              <Textarea
                id="bio"
                placeholder="Tell others a bit about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength={160}
                className="border-border/60 min-h-[100px] resize-none"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!canSubmit || isPending}
            >
              {isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.button
        onClick={handleBack}
        className="text-xs text-muted-foreground mt-2 underline underline-offset-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Go Back
      </motion.button>

      <motion.div
        className="text-xs text-muted-foreground mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        You can always update these details later from your profile settings
      </motion.div>
    </div>
  );
} 