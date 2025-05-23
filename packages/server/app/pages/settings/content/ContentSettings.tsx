import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";

export function LanguagesContent() {
  interface Language {
    code: string;
    name: string;
    selected: boolean;
  }

  const languages: Language[] = [
    { code: "en", name: "English", selected: true },
    { code: "es", name: "Español", selected: false },
    { code: "fr", name: "Français", selected: false },
    { code: "de", name: "Deutsch", selected: false },
    { code: "zh", name: "中文", selected: false },
    { code: "ja", name: "日本語", selected: false },
    { code: "ko", name: "한국어", selected: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Globe" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Languages</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage language preferences for content and interface.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Display Language</h3>
        <p className="text-sm text-muted-foreground">
          Select the language for the application interface.
        </p>

        <div className="mt-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Content Languages</h3>
        <p className="text-sm text-muted-foreground">
          Select languages for content you'd like to see. Content in these
          languages will be prioritized in your feed.
        </p>

        <div className="space-y-3 mt-4">
          <RadioGroup>
            {languages.map((language) => (
              <div
                key={language.code}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <Label className="font-medium">{language.name}</Label>
                <RadioGroupItem value={language.code} />
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Translation Preferences</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-translate">Auto-Translate Content</Label>
              <p className="text-sm text-muted-foreground">
                Automatically translate content not in your preferred languages
              </p>
            </div>
            <Switch id="auto-translate" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="translate-button">Show Translation Button</Label>
              <p className="text-sm text-muted-foreground">
                Show translation options for content in other languages
              </p>
            </div>
            <Switch id="translate-button" defaultChecked />
          </div>
        </div>

        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  );
}

export function SensitiveContentContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Eye" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Sensitive Content</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control how sensitive or potentially disturbing content is
              displayed.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Content Filtering</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sensitive-images">
                Hide Sensitive Images and Videos
              </Label>
              <p className="text-sm text-muted-foreground">
                Blur potentially sensitive images and videos until clicked
              </p>
            </div>
            <Switch id="sensitive-images" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="content-warning">Show Content Warnings</Label>
              <p className="text-sm text-muted-foreground">
                Display warnings before showing potentially sensitive content
              </p>
            </div>
            <Switch id="content-warning" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hide-nsfw">Hide NSFW Content</Label>
              <p className="text-sm text-muted-foreground">
                Hide content marked as not safe for work
              </p>
            </div>
            <Switch id="hide-nsfw" defaultChecked />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Content Categories</h3>
        <p className="text-sm text-muted-foreground">
          Choose which types of sensitive content you want to see:
        </p>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <p className="font-medium">Violence and Gore</p>
              <p className="text-sm text-muted-foreground">
                Graphic violence or injury
              </p>
            </div>
            <div className="w-40">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always-warn">Always Warn</SelectItem>
                  <SelectItem value="hide-completely">
                    Hide Completely
                  </SelectItem>
                  <SelectItem value="show-without-warning">
                    Show Without Warning
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <p className="font-medium">Adult Content</p>
              <p className="text-sm text-muted-foreground">
                Sexually explicit or suggestive content
              </p>
            </div>
            <div className="w-40">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always-warn">Always Warn</SelectItem>
                  <SelectItem value="hide-completely">
                    Hide Completely
                  </SelectItem>
                  <SelectItem value="show-without-warning">
                    Show Without Warning
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <p className="font-medium">Disturbing Imagery</p>
              <p className="text-sm text-muted-foreground">
                Disturbing or shocking imagery
              </p>
            </div>
            <div className="w-40">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always-warn">Always Warn</SelectItem>
                  <SelectItem value="hide-completely">
                    Hide Completely
                  </SelectItem>
                  <SelectItem value="show-without-warning">
                    Show Without Warning
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button className="mt-4">Save Preferences</Button>
      </div>
    </div>
  );
}

export function InterestsContent() {
  const selectedInterests = [
    "Blockchain",
    "NFTs",
    "DeFi",
    "Web3",
    "Cryptocurrency",
  ];

  const recommendedInterests = [
    "DAOs",
    "Metaverse",
    "Gaming",
    "AI",
    "Digital Art",
    "Smart Contracts",
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Heart" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Interests</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage topics that influence your content recommendations.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Interests</h3>
          <Button variant="outline" size="sm">
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Add Interest
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {selectedInterests.map((interest) => (
            <div
              key={interest}
              className="px-3 py-1.5 bg-secondary rounded-full flex items-center gap-1.5"
            >
              <span className="text-sm font-medium">{interest}</span>
              <button className="text-muted-foreground hover:text-foreground">
                <Icon name="X" className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Recommended Interests</h3>
        <p className="text-sm text-muted-foreground">
          Topics you might be interested in based on your activity.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {recommendedInterests.map((interest) => (
            <div
              key={interest}
              className="px-3 py-1.5 border rounded-full flex items-center gap-1.5"
            >
              <span className="text-sm font-medium">{interest}</span>
              <button className="text-primary hover:text-primary/80">
                <Icon name="Plus" className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Interest Settings</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-interests">
                Automatic Interest Detection
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically add interests based on your activity
              </p>
            </div>
            <Switch id="auto-interests" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="interest-suggestions">Interest Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Show suggestions for new interests to follow
              </p>
            </div>
            <Switch id="interest-suggestions" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="exclude-topics">Not Interested Topics</Label>
              <p className="text-sm text-muted-foreground">
                Manage topics you'd like to see less of
              </p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataUsageContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="ChartBar" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Data Usage</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control how the app uses bandwidth and storage.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Media Quality Settings</h3>

        <div className="space-y-6">
          <div>
            <Label htmlFor="image-quality">Image Quality</Label>
            <div className="w-full mt-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    High Quality (Uses more data)
                  </SelectItem>
                  <SelectItem value="standard">
                    Standard Definition (Balanced)
                  </SelectItem>
                  <SelectItem value="low">
                    Data Saver (Lower quality)
                  </SelectItem>
                  <SelectItem value="auto">
                    Auto (Based on connection)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="video-quality">Video Quality</Label>
            <div className="w-full mt-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    High Quality (Uses more data)
                  </SelectItem>
                  <SelectItem value="standard">
                    Standard Definition (Balanced)
                  </SelectItem>
                  <SelectItem value="low">
                    Data Saver (Lower quality)
                  </SelectItem>
                  <SelectItem value="auto">
                    Auto (Based on connection)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Automatic Media Loading</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoplay-wifi">Autoplay Media on Wi-Fi</Label>
              <p className="text-sm text-muted-foreground">
                Automatically play videos when connected to Wi-Fi
              </p>
            </div>
            <Switch id="autoplay-wifi" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoplay-mobile">
                Autoplay Media on Mobile Data
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically play videos when using mobile data
              </p>
            </div>
            <Switch id="autoplay-mobile" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="preload-images">Preload Images</Label>
              <p className="text-sm text-muted-foreground">
                Load images in advance for smoother browsing
              </p>
            </div>
            <Switch id="preload-images" defaultChecked />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Local Storage</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
            <div>
              <p className="font-medium">Current Cache Size</p>
              <p className="text-sm text-muted-foreground">245 MB</p>
            </div>
            <Button variant="outline" size="sm">
              Clear Cache
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="offline-save">Save Media for Offline</Label>
              <p className="text-sm text-muted-foreground">
                Cache media for viewing when offline
              </p>
            </div>
            <Switch id="offline-save" />
          </div>
        </div>

        <Button className="mt-2">Save Changes</Button>
      </div>
    </div>
  );
}

export function FeedPreferencesContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="LayoutList" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Feed Preferences</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Customize how content appears in your feed.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Feed Layout</h3>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border rounded-md p-4 flex flex-col items-center text-center cursor-pointer hover:bg-secondary/20">
            <div className="w-full aspect-video mb-3 bg-secondary/50 rounded-md flex items-center justify-center">
              <Icon name="LayoutList" className="h-6 w-6" />
            </div>
            <p className="font-medium">Default View</p>
            <p className="text-xs text-muted-foreground mt-1">
              Standard feed view
            </p>
          </div>

          <div className="border rounded-md p-4 flex flex-col items-center text-center cursor-pointer hover:bg-secondary/20 bg-primary/5">
            <div className="w-full aspect-video mb-3 bg-secondary/50 rounded-md flex items-center justify-center">
              <Icon name="LayoutGrid" className="h-6 w-6" />
            </div>
            <p className="font-medium">Compact View</p>
            <p className="text-xs text-muted-foreground mt-1">
              More content per screen
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Sort Order</h3>

        <RadioGroup className="space-y-3 mt-4" defaultValue="relevance">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="latest"
              id="feed-latest"
              className="h-4 w-4"
            />
            <Label htmlFor="feed-latest">Latest First</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="relevance"
              id="feed-relevance"
              className="h-4 w-4"
            />
            <Label htmlFor="feed-relevance">Relevance (Recommended)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="trending"
              id="feed-trending"
              className="h-4 w-4"
            />
            <Label htmlFor="feed-trending">Trending</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Content Preferences</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="following-posts">Following</Label>
              <p className="text-sm text-muted-foreground">
                Show posts from accounts you follow
              </p>
            </div>
            <Switch id="following-posts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recommended-posts">Recommended</Label>
              <p className="text-sm text-muted-foreground">
                Show recommended posts based on your interests
              </p>
            </div>
            <Switch id="recommended-posts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="trending-content">Trending Content</Label>
              <p className="text-sm text-muted-foreground">
                Show trending posts in your feed
              </p>
            </div>
            <Switch id="trending-content" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="token-holders">Token-gated Content</Label>
              <p className="text-sm text-muted-foreground">
                Show exclusive content for tokens you hold
              </p>
            </div>
            <Switch id="token-holders" defaultChecked />
          </div>
        </div>

        <Button className="mt-4">Save Preferences</Button>
      </div>
    </div>
  );
}

export function AutoplayContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Play" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Autoplay</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control how videos and media automatically play in your feed.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Video Autoplay</h3>

        <div className="space-y-6">
          <div>
            <Label htmlFor="autoplay-setting">Autoplay Setting</Label>
            <div className="w-full mt-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always autoplay videos</SelectItem>
                  <SelectItem value="wifi">Autoplay on Wi-Fi only</SelectItem>
                  <SelectItem value="never">Never autoplay videos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="muted-autoplay">Muted Autoplay</Label>
              <p className="text-sm text-muted-foreground">
                Automatically play videos without sound
              </p>
            </div>
            <Switch id="muted-autoplay" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="picture-in-picture">Picture-in-Picture</Label>
              <p className="text-sm text-muted-foreground">
                Continue playing videos in a floating window when scrolling
              </p>
            </div>
            <Switch id="picture-in-picture" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Next Video</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-next">Auto-Play Next Video</Label>
              <p className="text-sm text-muted-foreground">
                Automatically play the next recommended video
              </p>
            </div>
            <Switch id="auto-next" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="countdown">Show Countdown Timer</Label>
              <p className="text-sm text-muted-foreground">
                Display a countdown before playing the next video
              </p>
            </div>
            <Switch id="countdown" defaultChecked />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">GIFs and Animations</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoplay-gifs">Autoplay GIFs</Label>
              <p className="text-sm text-muted-foreground">
                Automatically play animated GIFs in your feed
              </p>
            </div>
            <Switch id="autoplay-gifs" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Show fewer animations for accessibility purposes
              </p>
            </div>
            <Switch id="reduced-motion" />
          </div>
        </div>

        <Button className="mt-4">Save Preferences</Button>
      </div>
    </div>
  );
}
