import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import SecondaryPanel from "@/pages/explore/SecondaryPanel";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
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
import { useBeaver } from "@beaver/react";
import Layout from "../../layout";

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
    twitter: z.string().max(50).nullable().optional(),
    youtube: z.string().max(50).nullable().optional(),
    instagram: z.string().max(50).nullable().optional(),
    website: z.string().url("Please enter a valid URL").nullable().optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export default function EditProfilePage() {
    const navigate = useNavigate();
    const beaver = useBeaver();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showImageCrop, setShowImageCrop] = useState(false);
    const [showBannerCrop, setShowBannerCrop] = useState(false);
    const [tempImage, setTempImage] = useState<File | null>(null);
    const [tempBanner, setTempBanner] = useState<File | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
    const [newBannerImage, setNewBannerImage] = useState<File | null>(null);

    const { mutateAsync: updateProfile, isPending, isSuccess } = beaver.profile.updateProfile;

    // Initialize form with default values
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            fullName: "",
            about: null,
            location: null,
            twitter: null,
            youtube: null,
            instagram: null,
            website: null,
        },
    });

    // Load current user data into form
    useEffect(() => {
        if (beaver.user) {
            form.reset({
                username: beaver.user.username || "",
                fullName: beaver.user.fullName || "",
                about: beaver.user.about || null,
                location: beaver.user.location || null,
                twitter: beaver.user.twitter || null,
                youtube: beaver.user.youtube || null,
                instagram: beaver.user.instagram || null,
                website: beaver.user.website || null,
            });

            // Set initial images if available
            if (beaver.user.imageUrl) {
                setProfileImage(beaver.user.imageUrl);
            }
            if (beaver.user.bannerUrl) {
                setBannerImage(beaver.user.bannerUrl);
            }
        }
    }, [beaver.user, form]);

    // Handle image selection
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'profile') {
                setTempImage(file);
                setShowImageCrop(true);
            } else {
                setTempBanner(file);
                setShowBannerCrop(true);
            }
        }
    };

    // Handle image crop completion
    const handleImageCrop = (croppedFile: File, isProfile = true) => {
        if (isProfile) {
            setProfileImage(URL.createObjectURL(croppedFile));
            setNewProfileImage(croppedFile);
            setShowImageCrop(false);
            setTempImage(null);
        } else {
            setBannerImage(URL.createObjectURL(croppedFile));
            setNewBannerImage(croppedFile);
            setShowBannerCrop(false);
            setTempBanner(null);
        }
    };

    // Form submission handler
    const onSubmit = async (values: ProfileFormValues) => {
        try {
            await updateProfile({
                image: newProfileImage,
                banner: newBannerImage,
                ...values,
            });

            navigate(`/app/profile/${beaver.user?.username || ""}`);
        } catch (error) {
            console.error("Error updating profile:", error);
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

    const socialFields = [
        { name: 'website', label: 'Website', icon: 'Globe', placeholder: 'https://yourwebsite.com' },
        { name: 'twitter', label: 'Twitter', icon: 'Twitter', placeholder: 'username' },
        { name: 'instagram', label: 'Instagram', icon: 'Instagram', placeholder: 'username' },
        { name: 'youtube', label: 'YouTube', icon: 'Youtube', placeholder: 'channel' },
    ] as const;

    return (
        <Layout
            main={
                <div className="max-w-2xl mx-auto py-8 px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(-1)}
                                className="p-2"
                            >
                                <Icon name="ArrowLeft" className="size-4" />
                                <span className="sr-only">Go back</span>
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold">Edit Profile</h1>
                                <p className="text-muted-foreground">
                                    Update your profile information
                                </p>
                            </div>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Banner Image */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={itemAnimations}
                                className="relative h-48 w-full bg-secondary/30 rounded-lg overflow-hidden"
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
                                            className="size-12 text-muted-foreground"
                                        />
                                    </div>
                                )}
                                <div className="absolute bottom-4 right-4">
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
                                        onChange={(e) => handleImageSelect(e, 'banner')}
                                    />
                                </div>
                            </motion.div>

                            {/* Profile Image */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={itemAnimations}
                                className="relative w-32 h-32 mx-auto -mt-24 rounded-full overflow-hidden border-4 border-background bg-secondary"
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
                                            className="size-16 text-muted-foreground"
                                        />
                                    </div>
                                )}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="secondary"
                                        className="rounded-full size-10 p-0 bg-secondary/50"
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
                                        onChange={(e) => handleImageSelect(e, 'profile')}
                                    />
                                </div>
                            </motion.div>

                            {/* Basic Information */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={itemAnimations}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                                    <div className="space-y-4">
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
                                                            rows={4}
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
                                    </div>
                                </div>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={itemAnimations}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Social Links</h2>
                                    <div className="space-y-4">
                                        {socialFields.map(({ name, label, icon, placeholder }) => (
                                            <FormField
                                                key={name}
                                                control={form.control}
                                                name={name}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{label}</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                    <Icon
                                                                        name={icon}
                                                                        className="size-4 text-muted-foreground"
                                                                    />
                                                                </div>
                                                                <Input
                                                                    placeholder={placeholder}
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
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate(-1)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex-1"
                                >
                                    {isPending ? (
                                        <>
                                            <Icon
                                                name="LoaderCircle"
                                                className="mr-2 size-4 animate-spin"
                                            />
                                            Updating...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {/* Image Crop Dialogs */}
                    {tempImage && (
                        <ImageCropDialog
                            isOpen={showImageCrop}
                            onClose={() => {
                                setShowImageCrop(false);
                                setTempImage(null);
                            }}
                            image={tempImage}
                            onCrop={(file) => handleImageCrop(file, true)}
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
                            onCrop={(file) => handleImageCrop(file, false)}
                            initialAspectRatio="banner"
                            allowedAspectRatios={["banner", "landscape", "wide"]}
                        />
                    )}
                </div>
            }
            secondary={<SecondaryPanel />}
        />
    );
} 