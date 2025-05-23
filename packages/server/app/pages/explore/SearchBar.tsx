import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../shared/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../../shared/components/ui/command";
import { Search } from "lucide-react";
import { Input } from "../../shared/components/ui/input";
import { Image } from "../../shared/components/Image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "../../shared/components/ui/dialog";
import Icon from "@/shared/components/Icon";
import { DialogTitle } from "@radix-ui/react-dialog";

type Profile = {
  id: string;
  name: string;
  handle: string;
  profilePicture: string;
};

type Topic = {
  id: string;
  name: string;
  count: string;
};

type SearchBarProps = {
  profiles: Profile[];
  topics: Topic[];
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  isModal?: boolean;
  onModalClose?: () => void;
};

export default function SearchBar({
  profiles,
  topics,
  className = "",
  placeholder = "Search",
  onSearch,
  isModal = false,
  onModalClose,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Debounce search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
      if (onSearch && searchValue.trim()) {
        onSearch(searchValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  // Filter suggestions based on debounced search value
  const filteredProfiles = debouncedValue
    ? profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          profile.handle.toLowerCase().includes(debouncedValue.toLowerCase()),
      )
    : profiles.slice(0, 3); // Show only a few results when not searching

  const filteredTopics = debouncedValue
    ? topics.filter((topic) =>
        topic.name.toLowerCase().includes(debouncedValue.toLowerCase()),
      )
    : topics.slice(0, 3); // Show only a few results when not searching

  // Combined results for keyboard navigation
  const allResults = [...filteredProfiles, ...filteredTopics];

  // Handle search submission
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchValue.trim()) {
        navigate(
          `/app/explore/search?q=${encodeURIComponent(searchValue.trim())}`,
        );
        setOpen(false);
        if (isModal && onModalClose) {
          onModalClose();
        }
      }
    },
    [searchValue, navigate, isModal, onModalClose],
  );

  // Select a profile
  const handleSelectProfile = useCallback(
    (handle: string) => {
      navigate(`/app/profile/${handle}`);
      setOpen(false);
      setIsFocused(false);
      if (isModal && onModalClose) {
        onModalClose();
      }
    },
    [navigate, isModal, onModalClose],
  );

  // Select a topic
  const handleSelectTopic = useCallback(
    (topic: string) => {
      navigate(`/app/explore/search?q=${encodeURIComponent(topic)}`);
      setOpen(false);
      setIsFocused(false);
      if (isModal && onModalClose) {
        onModalClose();
      }
    },
    [navigate, isModal, onModalClose],
  );

  // Reset search on route change
  useEffect(() => {
    return () => {
      setSearchValue("");
      setDebouncedValue("");
    };
  }, [navigate]);

  // Keep focus on input box
  useEffect(() => {
    if (isFocused && searchInputRef.current) {
      // Ensure input maintains focus
      searchInputRef.current.focus();
    }
  }, [isFocused, open]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [filteredProfiles, filteredTopics]);

  // Function to render search results
  const renderResults = () => {
    let profileStartIndex = 0;
    let topicStartIndex = filteredProfiles.length;

    return (
      <Command className="rounded-sm" shouldFilter={false}>
        <CommandList>
          <CommandGroup heading="Search">
            <CommandItem
              onSelect={() => handleSelectTopic(searchValue)}
              className="cursor-default text-muted-foreground"
            >
              <Icon name="Search" className="mr-2" />
              Search for "{searchValue}"
            </CommandItem>
          </CommandGroup>
          {filteredProfiles.length > 0 && (
            <CommandGroup heading="People">
              {filteredProfiles.map((profile, index) => {
                const isActive = activeIndex === profileStartIndex + index;
                return (
                  <CommandItem
                    key={profile.id}
                    onSelect={() => handleSelectProfile(profile.handle)}
                    className={`flex items-center gap-2 py-2 cursor-pointer ${isActive ? "bg-accent" : ""}`}
                  >
                    <Image
                      src={profile.profilePicture}
                      alt={profile.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        @{profile.handle}
                      </p>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          {filteredTopics.length > 0 && (
            <CommandGroup heading="Topics">
              {filteredTopics.map((topic, index) => {
                const isActive = activeIndex === topicStartIndex + index;
                return (
                  <CommandItem
                    key={topic.id}
                    onSelect={() => handleSelectTopic(topic.name)}
                    className={`flex items-center justify-between py-2 cursor-pointer ${isActive ? "bg-accent" : ""}`}
                  >
                    <div>
                      <p className="font-medium">#{topic.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {topic.count} posts
                      </p>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    );
  };

  const searchContent = (
    <form onSubmit={handleSearchSubmit} className={`${className}`}>
      <Popover open={isFocused && searchValue.length > 0 && !isModal}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              autoComplete="off"
              className="w-full pl-10 pr-4 py-2 bg-background rounded-full border focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              aria-label="Search"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            searchInputRef.current?.focus();
          }}
        >
          {renderResults()}
        </PopoverContent>
      </Popover>
    </form>
  );

  return isModal ? (
    <Dialog
      open={true}
      onOpenChange={(open) => !open && onModalClose && onModalClose()}
    >
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-transparent border-none">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search for people, topics, and more...
        </DialogDescription>
        <form onSubmit={handleSearchSubmit} className="p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              autoFocus
              autoComplete="off"
              className="w-full pl-10 pr-4 py-2 bg-background rounded-md border"
              aria-label="Search"
            />
          </div>
          {searchValue.length > 0 && (
            <div className="mt-2 border rounded-xl">{renderResults()}</div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  ) : (
    searchContent
  );
}
