import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/shared/components/Icon";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Image } from "@/shared/components/Image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/shared/components/ui/tooltip";
import { Progress } from "@/shared/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import ImageCropDialog from "@/shared/components/ImageCropDialog";
import imageCompression from "browser-image-compression";
import CreatePostSuccessDialog from "./CreatePostSuccessDialog";
import EmojiPicker from "./EmojiPicker";
import GifPicker from "./GifPicker";
import MediaPreview from "./MediaPreview";
import { useBeaver } from "@beaver/react";

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
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
};

export default function CreatePage() {
  const beaver = useBeaver();
  const { mutateAsync: createPost } = beaver.post.createPost;

  // States
  const [activeTab, setActiveTab] = useState<"post" | "swipe">("post");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPostId, setCreatedPostId] = useState<string | undefined>(
    undefined,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mention suggestion state
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [debouncedMentionQuery, setDebouncedMentionQuery] = useState("");
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [cursorPosition, setCursorPosition] = useState(0);

  // Debounce the mention query to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMentionQuery(mentionQuery);
    }, 200); // 200ms debounce delay

    return () => clearTimeout(timer);
  }, [mentionQuery]);

  // Fetch user suggestions when debounced query changes
  const { data: userSuggestions, isLoading: isLoadingUsers } =
    beaver.profile.searchSuggestions({
      search: debouncedMentionQuery,
      limit: 5,
    });

  // Reset state when tab changes
  useEffect(() => {
    setContent("");
    setMediaFiles([]);
    setLocation("");
    setError(null);
  }, [activeTab]);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      mediaFiles.forEach((media) => URL.revokeObjectURL(media.previewUrl));
    };
  }, [mediaFiles]);

  // Handle file selection for images
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

  // Handle text changes and detect @ mentions
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setContent(newContent);

      // Track cursor position
      const cursorPos = e.target.selectionStart;
      setCursorPosition(cursorPos);

      // Check if we're typing a mention
      let mentionStart = -1;
      for (let i = cursorPos - 1; i >= 0; i--) {
        if (newContent[i] === "@") {
          mentionStart = i;
          break;
        } else if (newContent[i] === " " || newContent[i] === "\n") {
          break;
        }
      }

      if (mentionStart !== -1) {
        // We're in a mention
        const query = newContent
          .substring(mentionStart + 1, cursorPos)
          .toLowerCase();
        setMentionQuery(query);

        // Position the mention dropdown
        if (textareaRef.current) {
          // Get cursor position for positioning dropdown
          const cursorCoords = getCursorXY(textareaRef.current, cursorPos);

          // Position dropdown below cursor
          setMentionPosition({
            top: cursorCoords.top + 30, // Add some offset for better positioning
            left: cursorCoords.left,
          });
        }

        // Show mentions dropdown if query is not empty
        setShowMentions(true);
      } else {
        setShowMentions(false);
        setMentionQuery("");
      }
    },
    [],
  );

  // Helper function to get cursor position in textarea
  const getCursorXY = (input: HTMLTextAreaElement, selectionPoint: number) => {
    const { offsetLeft: inputX, offsetTop: inputY } = input;

    // Create a copy of the textarea styles to measure text
    const div = document.createElement("div");
    const styles = getComputedStyle(input);

    // Copy styles to make the measurement div look like the textarea
    const props = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "letterSpacing",
      "lineHeight",
      "textTransform",
      "wordSpacing",
      "textIndent",
      "paddingLeft",
      "paddingRight",
      "paddingTop",
      "paddingBottom",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
      "borderBottomWidth",
    ];

    props.forEach((prop) => {
      div.style[prop as any] = styles[prop as any];
    });

    // Set essential styles for text measurement
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.visibility = "hidden";
    div.style.whiteSpace = "pre-wrap";
    div.style.overflow = "hidden";
    div.style.width = input.offsetWidth + "px";
    div.style.height = "auto";

    // Get the text content up to the cursor
    const textBeforeCaret = input.value.substring(0, selectionPoint);
    div.textContent = textBeforeCaret;

    // Add a span at the end to get cursor position
    const span = document.createElement("span");
    span.textContent = ".";
    div.appendChild(span);

    document.body.appendChild(div);

    // Measure position
    const { offsetLeft: spanX, offsetTop: spanY } = span;

    // Consider textarea scroll position
    const x = inputX + spanX - input.scrollLeft;
    const y = inputY + spanY - input.scrollTop;

    // Clean up
    document.body.removeChild(div);

    return { left: x, top: y };
  };

  // Handle selecting a user from mentions
  const handleSelectMention = useCallback(
    (user: any) => {
      // Find the start and end of the current mention
      let mentionStart = -1;
      for (let i = cursorPosition - 1; i >= 0; i--) {
        if (content[i] === "@") {
          mentionStart = i;
          break;
        } else if (content[i] === " " || content[i] === "\n") {
          break;
        }
      }

      if (mentionStart !== -1) {
        // Replace the partial mention with the selected username
        const newContent =
          content.substring(0, mentionStart) +
          "@" +
          user?.username +
          " " +
          content.substring(cursorPosition);

        setContent(newContent);

        // Calculate new cursor position after the inserted mention
        const newPosition = mentionStart + user?.username.length + 2; // +2 for @ and space

        // Set focus back to textarea with new cursor position
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(newPosition, newPosition);
          }
        }, 0);
      }

      setShowMentions(false);
      setMentionQuery("");
    },
    [content, cursorPosition],
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (content.trim() === "") {
        setError("Please add content to your post");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const totalSteps = mediaFiles.length + 1;
        setUploadProgress(Math.floor((1 / totalSteps) * 100));

        const result = await createPost({
          content,
          media: mediaFiles.map((item) => item.file),
          location,
          parentId: null,
          reposting: null,
          nsfw: false,
          subscriberOnly: false,
          swipe: activeTab === "swipe" ? true : false,
        });

        setUploadProgress(Math.floor((totalSteps / totalSteps) * 100));

        // Show success dialog
        setShowSuccess(true);
        setCreatedPostId(result.id.toString());

        // Reset form
        setContent("");
        setLocation("");
        setMediaFiles([]);
        setUploadProgress(0);
      } catch (error) {
        console.error("Error submitting:", error);
        setError("Failed to publish your post. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [content, mediaFiles, location],
  );

  return (
    <div className="max-w-2xl sm:border mx-auto mt-4 mb-10 p-8 md:p-6 rounded-lg bg-background shadow-md">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Create</h1>
        <p className="text-muted-foreground">
          Share your thoughts with the world
        </p>
      </motion.div>

      <Tabs
        defaultValue="post"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "post" | "swipe")}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="post" className="text-base">
            Post
          </TabsTrigger>
          <TabsTrigger value="swipe" className="text-base">
            Swipe
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="post"
          className="focus-visible:outline-none focus-visible:ring-0"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemAnimations}
            className="space-y-6"
          >
            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="space-y-6"
            >
              <div className="flex gap-4">
                <Image
                  src={beaver.user?.imageUrl || "/images/default/profile.webp"}
                  alt="User avatar"
                  className="hidden sm:block w-12 h-12 rounded-full flex-shrink-0"
                />

                <div className="flex flex-col w-full space-y-4">
                  <div className="relative">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={content}
                      onChange={handleContentChange}
                      className="w-full p-4 resize-none min-h-[120px] text-base focus:ring-primary"
                      disabled={isSubmitting}
                      ref={textareaRef}
                    />

                    <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                      {content.length} / 280
                    </div>

                    {/* Mention suggestions dropdown */}
                    {showMentions && (
                      <div
                        className="absolute z-10 bg-background border rounded-md shadow-lg w-64 max-h-60 overflow-y-auto"
                        style={{
                          top: `${mentionPosition.top}px`,
                          left: `${mentionPosition.left}px`,
                        }}
                      >
                        {isLoadingUsers && (
                          <div className="flex items-center justify-center p-4">
                            <Icon
                              name="LoaderCircle"
                              className="size-5 animate-spin"
                            />
                          </div>
                        )}

                        {!isLoadingUsers &&
                          userSuggestions?.users.length === 0 && (
                            <div className="p-3 text-center text-muted-foreground text-sm">
                              No users found
                            </div>
                          )}

                        {!isLoadingUsers &&
                          userSuggestions?.users.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer"
                              onClick={() => handleSelectMention(user)}
                            >
                              <Image
                                src={user?.imageUrl || "/images/user.webp"}
                                alt={user?.fullName || user?.username}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <div className="font-medium">
                                  {user?.fullName || user?.username}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  @{user?.username}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Media Preview Section */}
                  <AnimatePresence>
                    {mediaFiles.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full overflow-hidden"
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
                        className="bg-destructive/20 text-destructive p-3 rounded-md text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Loading State */}
                  <AnimatePresence>
                    {isSubmitting && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="w-full"
                      >
                        <Progress value={uploadProgress} className="h-1" />
                        <p className="text-center text-sm text-muted-foreground mt-2">
                          {uploadProgress < 100
                            ? "Uploading..."
                            : "Processing..."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="rounded-full hover:bg-secondary transition-colors"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isSubmitting}
                            >
                              <Icon name="ImagePlus" className="size-5" />
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
                              size="icon"
                              variant="ghost"
                              className="rounded-full hover:bg-secondary transition-colors"
                              onClick={() => videoInputRef.current?.click()}
                              disabled={isSubmitting || activeTab === "swipe"}
                            >
                              <Icon name="Video" className="size-5" />
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
                        disabled={isSubmitting}
                      />

                      <GifPicker
                        onGifSelect={handleGifSelect}
                        disabled={isSubmitting}
                      />

                      <TooltipProvider>
                        <Tooltip>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="rounded-full hover:bg-secondary transition-colors"
                                disabled={isSubmitting}
                              >
                                <Icon name="MapPin" className="size-5" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4">
                              <div className="space-y-4">
                                <h3 className="font-medium">Add Location</h3>
                                <input
                                  type="text"
                                  placeholder="Search for a location"
                                  className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                />
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                  {/* Location suggestions would go here */}
                                  <button
                                    className="p-2 hover:bg-secondary rounded-md w-full text-left"
                                    onClick={() => setLocation("New York, NY")}
                                  >
                                    New York, NY
                                  </button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <TooltipContent>Add Location</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <Button
                      type="submit"
                      variant="interactive"
                      disabled={
                        isSubmitting ||
                        (content.trim() === "" && mediaFiles.length === 0)
                      }
                      className="rounded-full px-6 font-semibold group relative overflow-hidden"
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </TabsContent>

        <TabsContent
          value="swipe"
          className="focus-visible:outline-none focus-visible:ring-0"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemAnimations}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-lg p-8 min-h-[300px]">
                {mediaFiles.length === 0 ? (
                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 rounded-full p-4 inline-block">
                      <Icon
                        name="Clapperboard"
                        className="size-6 text-primary"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Upload Swipes</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Swipes are the best way to reach new audience. Upload in
                      portrait mode for best viewing experience
                    </p>
                    <Button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="mt-4"
                      disabled={isSubmitting}
                    >
                      Choose Video
                      <input
                        type="file"
                        ref={videoInputRef}
                        onChange={handleFileSelect}
                        accept="video/*"
                        className="hidden"
                      />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <MediaPreview
                      mediaFiles={mediaFiles}
                      onRemove={removeMedia}
                    />

                    <div className="space-y-4 mt-6">
                      <Label htmlFor="caption">Caption</Label>
                      <div className="relative mt-2">
                        <Textarea
                          id="caption"
                          placeholder="Add a caption to your swipe"
                          value={content}
                          onChange={handleContentChange}
                          className="w-full resize-none min-h-[100px]"
                          disabled={isSubmitting}
                          ref={textareaRef}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                          {content.length} / 150
                        </div>

                        {/* Mention suggestions dropdown for swipe tab */}
                        {showMentions && (
                          <div
                            className="absolute z-10 bg-background border rounded-md shadow-lg w-64 max-h-60 overflow-y-auto"
                            style={{
                              top: `${mentionPosition.top}px`,
                              left: `${mentionPosition.left}px`,
                            }}
                          >
                            {isLoadingUsers && (
                              <div className="flex items-center justify-center p-4">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                              </div>
                            )}

                            {!isLoadingUsers &&
                              userSuggestions?.users.length === 0 && (
                                <div className="p-3 text-center text-muted-foreground">
                                  No users found
                                </div>
                              )}

                            {!isLoadingUsers &&
                              userSuggestions?.users.map((user) => (
                                <div
                                  key={user.id}
                                  className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer"
                                  onClick={() => handleSelectMention(user)}
                                >
                                  <Image
                                    src={user?.imageUrl || "/images/user.webp"}
                                    alt={user?.fullName || user?.username}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {user?.fullName || user?.username}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      @{user?.username}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <EmojiPicker
                          onEmojiSelect={handleEmojiSelect}
                          disabled={isSubmitting}
                        />
                        <GifPicker
                          onGifSelect={handleGifSelect}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-destructive/20 text-destructive p-3 rounded-md text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading State */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="w-full"
                  >
                    <Progress value={uploadProgress} className="h-1" />
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      {uploadProgress < 100
                        ? "Uploading video..."
                        : "Processing..."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between">
                <Select
                  defaultValue="public"
                  value={privacy}
                  onValueChange={setPrivacy}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Icon name="Globe" className="size-4" />
                        <span>Public</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="followers">
                      <div className="flex items-center gap-2">
                        <Icon name="Users" className="size-4" />
                        <span>Followers</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  type="submit"
                  variant="interactive"
                  disabled={isSubmitting || mediaFiles.length === 0}
                  className="rounded-full px-6 font-semibold"
                >
                  Publish
                </Button>
              </div>
            </form>
          </motion.div>
        </TabsContent>
      </Tabs>

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

      {/* Success Dialog */}
      <CreatePostSuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type={activeTab}
        postId={createdPostId}
      />
    </div>
  );
}
