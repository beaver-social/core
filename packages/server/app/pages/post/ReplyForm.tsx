import { useEffect, useState, useRef, useCallback } from "react";
import { Image } from "@/shared/components/Image";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/shared/components/ui/textarea";
import { useBeaver } from "@beaver/react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/shared/components/ui/tooltip";
import ImageCropDialog from "@/shared/components/ImageCropDialog";
import imageCompression from "browser-image-compression";
import EmojiPicker from "../create/EmojiPicker";
import GifPicker from "../create/GifPicker";
import MediaPreview from "../create/MediaPreview";

type MediaFile = {
  file: File;
  type: "image" | "video";
  previewUrl: string;
  aspectRatio:
  | "square"
  | "portrait"
  | "landscape"
  | "banner"
  | "wide"
  | "custom";
};

// Compression options
const imageCompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/jpeg",
  initialQuality: 0.85,
};

export default function ReplyForm({
  postId,
}: {
  postId: string | undefined;
}) {
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const beaver = useBeaver();
  const user = beaver.user;
  const {
    mutate: createPost,
    isSuccess,
    isError,
    isPending,
  } = beaver.post.createPost;

  useEffect(() => {
    if (isSuccess) {
      setContent("");
      setMediaFiles([]);
      setError(null);
    }

    if (isError) {
      toast.error("Failed to post reply..");
    }
  }, [isSuccess, isError]);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      mediaFiles.forEach((media) => URL.revokeObjectURL(media.previewUrl));
    };
  }, [mediaFiles]);

  // Handle file selection for images and videos
  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      try {
        // Only for image files, show the crop dialog
        if (selectedFile.type.startsWith("image/")) {
          const compressedFile = await imageCompression(
            selectedFile,
            imageCompressionOptions,
          );
          setTempFile(compressedFile);
          setShowCropDialog(true);
        } else if (selectedFile.type.startsWith("video/")) {
          // For videos, add directly to the mediaFiles
          const previewUrl = URL.createObjectURL(selectedFile);
          setMediaFiles((prev) => [
            ...prev,
            {
              file: selectedFile,
              type: "video",
              previewUrl,
              aspectRatio: "custom",
            },
          ]);
        }
      } catch (error) {
        console.error("Error processing file:", error);
        setError("Failed to process the selected file");
      }

      // Clear the input value to allow selecting the same file again
      e.target.value = "";
    },
    [],
  );

  // Handle cropping for images
  const handleCrop = useCallback(
    (
      croppedFile: File,
      aspectRatio:
        | "square"
        | "portrait"
        | "landscape"
        | "banner"
        | "wide"
        | "custom",
    ) => {
      const previewUrl = URL.createObjectURL(croppedFile);

      setMediaFiles((prev) => [
        ...prev,
        {
          file: croppedFile,
          type: "image",
          previewUrl,
          aspectRatio,
        },
      ]);

      setShowCropDialog(false);
      setTempFile(null);
    },
    [],
  );

  // Handle removing media
  const removeMedia = useCallback((index: number) => {
    setMediaFiles((prev) => {
      // Revoke the URL to avoid memory leaks
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // Handle adding emoji to content
  const handleEmojiSelect = useCallback((emoji: string) => {
    setContent((prev) => prev + emoji);
  }, []);

  // Handle adding GIF to media
  const handleGifSelect = useCallback((gifUrl: string) => {
    // Create a Blob from the GIF URL and add it as media
    fetch(gifUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `gif-${Date.now()}.gif`, {
          type: "image/gif",
        });
        const previewUrl = URL.createObjectURL(file);

        setMediaFiles((prev) => [
          ...prev,
          {
            file: file,
            type: "image",
            previewUrl,
            aspectRatio: "square",
          },
        ]);
      })
      .catch((err) => {
        console.error("Error adding GIF:", err);
        setError("Failed to add GIF");
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && mediaFiles.length === 0) {
      toast.error("Please enter a reply or add media");
      return;
    }

    if (!postId) {
      toast.error("Parent not found");
      return;
    }

    createPost({
      content,
      parentId: parseInt(postId),
      media: mediaFiles.map((item) => item.file),
    });
  };

  return (
    <div className="flex gap-3 p-4 border-t border-b">
      <Image
        src={user?.imageUrl || "/images/user.webp"}
        alt="Your avatar"
        className="size-8 rounded-full border-2 border-primary/20"
      />
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        className="flex-1"
      >
        <Textarea
          placeholder="Post your reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-sm p-4"
          rows={2}
        />

        {/* Media Preview Section */}
        <AnimatePresence>
          {mediaFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full overflow-hidden mt-3"
            >
              <MediaPreview
                mediaFiles={mediaFiles}
                onRemove={removeMedia}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-destructive/20 text-destructive p-3 rounded-md text-sm mt-3"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPending}
                  >
                    <Icon name="ImagePlus" className="size-4" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Image</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={isPending}
                  >
                    <Icon name="Video" className="size-4" />
                    <input
                      type="file"
                      ref={videoInputRef}
                      onChange={handleFileSelect}
                      accept="video/*"
                      className="hidden"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Video</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              disabled={isPending}
            />

            <GifPicker
              onGifSelect={handleGifSelect}
              disabled={isPending}
            />
          </div>
          <motion.div
            initial={{ opacity: 0.9 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              size="sm"
              disabled={!content.trim() && mediaFiles.length === 0}
              className="rounded-sm"
            >
              {isPending ? (
                <Icon name="LoaderCircle" className="size-4 animate-spin" />
              ) : (
                "Post"
              )}
            </Button>
          </motion.div>
        </div>
      </form>

      {/* Image Crop Dialog */}
      {tempFile && (
        <ImageCropDialog
          isOpen={showCropDialog}
          onClose={() => {
            setShowCropDialog(false);
            setTempFile(null);
          }}
          image={tempFile}
          onCrop={handleCrop}
          initialAspectRatio="square"
          allowedAspectRatios={["square", "portrait"]}
        />
      )}
    </div>
  );
}
