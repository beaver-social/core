import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import Icon from "@/shared/components/Icon";
import { Image } from "@/shared/components/Image";
import ImageCropDialog from "@/shared/components/ImageCropDialog";

// Form schema validation
const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50),
  about: z
    .string()
    .max(160, "Bio must be less than 160 characters")
    .nullable()
    .optional(),
  location: z.string().max(50).nullable().optional(),
  birthday: z.date().nullable().optional(),
  twitter: z.string().max(50).nullable().optional(),
  youtube: z.string().max(50).nullable().optional(),
  instagram: z.string().max(50).nullable().optional(),
  website: z.string().url("Please enter a valid URL").nullable().optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ProfileFormValues;
};

export default function EditProfileDialog({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageCrop, setShowImageCrop] = useState(false);
  const [showBannerCrop, setShowBannerCrop] = useState(false);
  const [tempImage, setTempImage] = useState<File | null>(null);
  const [tempBanner, setTempBanner] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      username: "",
      fullName: "",
      about: null,
      location: null,
      birthday: null,
      twitter: null,
      youtube: null,
      instagram: null,
      website: null,
    },
  });

  // Handle profile image selection
  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTempImage(file);
      setShowImageCrop(true);
    }
  };

  // Handle banner image selection
  const handleBannerImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTempBanner(file);
      setShowBannerCrop(true);
    }
  };

  // Handle image crop completion
  const handleImageCrop = (
    croppedFile: File,
    aspectRatio:
      | "square"
      | "portrait"
      | "landscape"
      | "banner"
      | "wide"
      | "custom",
  ) => {
    setProfileImage(URL.createObjectURL(croppedFile));
    setShowImageCrop(false);
    setTempImage(null);
  };

  // Handle banner crop completion
  const handleBannerCrop = (
    croppedFile: File,
    aspectRatio:
      | "square"
      | "portrait"
      | "landscape"
      | "banner"
      | "wide"
      | "custom",
  ) => {
    setBannerImage(URL.createObjectURL(croppedFile));
    setShowBannerCrop(false);
    setTempBanner(null);
  };

  // Form submission handler
  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Here you would typically call your API to update the profile
      console.log("Form values:", values);
      console.log("Profile image:", profileImage);
      console.log("Banner image:", bannerImage);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const itemAnimations = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Banner Image */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={itemAnimations}
                className="relative h-32 w-full bg-secondary/30 rounded-lg overflow-hidden"
              >
                {bannerImage ? (
                  <Image
                    src={bannerImage}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Icon
                      name="Image"
                      className="size-8 text-muted-foreground"
                    />
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="rounded-full"
                    onClick={() =>
                      document.getElementById("banner-upload")?.click()
                    }
                  >
                    <Icon name="Camera" className="size-4" />
                    <span className="sr-only">Upload banner</span>
                  </Button>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerImageSelect}
                  />
                </div>
              </motion.div>

              {/* Profile Image */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={itemAnimations}
                className="relative w-24 h-24 mx-auto -mt-12 rounded-full overflow-hidden border-4 border-background bg-secondary/30"
              >
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Icon
                      name="User"
                      className="size-12 text-muted-foreground"
                    />
                  </div>
                )}
                {/* centre the button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="rounded-full size-8 p-0"
                    onClick={() =>
                      document.getElementById("profile-upload")?.click()
                    }
                  >
                    <Icon name="Camera" className="size-4" />
                    <span className="sr-only">Upload profile</span>
                  </Button>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageSelect}
                  />
                </div>
              </motion.div>

              {/* Basic Information */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={itemAnimations}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-muted-foreground">@</span>
                          </div>
                          <Input
                            placeholder="username"
                            className="pl-7"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your unique username on the platform
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          className="resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/160 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City, Country"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Birthday</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Icon
                                name="Calendar"
                                className="ml-auto h-4 w-4 opacity-50"
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={itemAnimations}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">Social Links</h3>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Icon
                              name="Globe"
                              className="size-4 text-muted-foreground"
                            />
                          </div>
                          <Input
                            placeholder="https://yourwebsite.com"
                            className="pl-10"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Icon
                              name="Twitter"
                              className="size-4 text-muted-foreground"
                            />
                          </div>
                          <Input
                            placeholder="username"
                            className="pl-10"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Icon
                              name="Instagram"
                              className="size-4 text-muted-foreground"
                            />
                          </div>
                          <Input
                            placeholder="username"
                            className="pl-10"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Icon
                              name="Youtube"
                              className="size-4 text-muted-foreground"
                            />
                          </div>
                          <Input
                            placeholder="channel"
                            className="pl-10"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmitting}
                  className="rounded-sm px-6"
                >
                  {isSubmitting ? (
                    <>
                      <Icon
                        name="LoaderCircle"
                        className="mr-2 size-4 animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Image Crop Dialogs */}
      {tempImage && (
        <ImageCropDialog
          isOpen={showImageCrop}
          onClose={() => {
            setShowImageCrop(false);
            setTempImage(null);
          }}
          image={tempImage}
          onCrop={handleImageCrop}
          initialAspectRatio="square"
          allowedAspectRatios={["square", "portrait"]}
        />
      )}

      {tempBanner && (
        <ImageCropDialog
          isOpen={showBannerCrop}
          onClose={() => {
            setShowBannerCrop(false);
            setTempBanner(null);
          }}
          image={tempBanner}
          onCrop={handleBannerCrop}
          initialAspectRatio="banner"
          allowedAspectRatios={["banner", "landscape", "wide"]}
        />
      )}
    </>
  );
}
