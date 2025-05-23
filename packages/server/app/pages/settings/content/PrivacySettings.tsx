import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export function AudienceAndTaggingContent() {
  const [postVisibility, setPostVisibility] = useState("public");
  const [tagPermission, setTagPermission] = useState("anyone");

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Users" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Audience and Tagging</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control who can see your content and who can tag you in posts and
              comments.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Default Audience</h3>
        <p className="text-sm text-muted-foreground">
          Choose who can see your posts by default. You can still change this
          for individual posts.
        </p>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="Globe" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Public</p>
                <p className="text-sm text-muted-foreground">
                  Anyone on or off the platform
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="audience"
              checked={postVisibility === "public"}
              onChange={() => setPostVisibility("public")}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="Users" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Followers</p>
                <p className="text-sm text-muted-foreground">
                  Only people who follow you
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="audience"
              checked={postVisibility === "followers"}
              onChange={() => setPostVisibility("followers")}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="Lock" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Token Holders Only</p>
                <p className="text-sm text-muted-foreground">
                  Only holders of your creator token
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="audience"
              checked={postVisibility === "token-holders"}
              onChange={() => setPostVisibility("token-holders")}
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Tagging</h3>
        <p className="text-sm text-muted-foreground">
          Control who can tag you in their posts and comments.
        </p>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="Users" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Anyone</p>
                <p className="text-sm text-muted-foreground">
                  Any user can tag you
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="tagging"
              checked={tagPermission === "anyone"}
              onChange={() => setTagPermission("anyone")}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="UserCheck" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">People You Follow</p>
                <p className="text-sm text-muted-foreground">
                  Only people you follow can tag you
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="tagging"
              checked={tagPermission === "following"}
              onChange={() => setTagPermission("following")}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="Lock" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Verified Identities Only</p>
                <p className="text-sm text-muted-foreground">
                  Only verified web3 identities can tag you
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="tagging"
              checked={tagPermission === "verified"}
              onChange={() => setTagPermission("verified")}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export function PostVisibilityContent() {
  const [enablePosts, setEnablePosts] = useState(true);
  const [enableComments, setEnableComments] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Eye" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Post Visibility</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control the visibility of your posts and interactions on the
              platform.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Content Privacy</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="posts-visible">Make My Posts Discoverable</Label>
              <p className="text-sm text-muted-foreground">
                Allow your posts to be visible in public feeds and search
                results
              </p>
            </div>
            <Switch
              id="posts-visible"
              checked={enablePosts}
              onCheckedChange={setEnablePosts}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="comments-visible">
                Allow Comments on My Posts
              </Label>
              <p className="text-sm text-muted-foreground">
                Let others comment on content you share
              </p>
            </div>
            <Switch
              id="comments-visible"
              checked={enableComments}
              onCheckedChange={setEnableComments}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hide-likes">Hide Like Counts</Label>
              <p className="text-sm text-muted-foreground">
                Hide the number of likes on your posts from others
              </p>
            </div>
            <Switch id="hide-likes" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Content Indexing</h3>
        <p className="text-sm text-muted-foreground">
          Control how your content is indexed and shared across the web.
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="search-engines">
                Allow Search Engine Indexing
              </Label>
              <p className="text-sm text-muted-foreground">
                Let search engines like Google index your profile and posts
              </p>
            </div>
            <Switch id="search-engines" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="aggregators">Allow Content Aggregators</Label>
              <p className="text-sm text-muted-foreground">
                Allow third-party content aggregators to display your posts
              </p>
            </div>
            <Switch id="aggregators" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="embed">Allow Post Embedding</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to embed your posts on external websites
              </p>
            </div>
            <Switch id="embed" />
          </div>
        </div>

        <div className="mt-4">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export function MuteAndBlockContent() {
  const blockedAccounts = [
    { id: "1", name: "Alex Smith", username: "alex_web3", avatar: "User" },
    { id: "2", name: "Crypto Trader", username: "trader_xyz", avatar: "User" },
  ];

  const mutedAccounts = [
    { id: "3", name: "NFT Collector", username: "nft_whale", avatar: "User" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Shield" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Mute and Block</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage accounts you've muted or blocked from interacting with you.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Blocked Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Blocked accounts cannot follow you, view your posts, or interact with
          you.
        </p>

        {blockedAccounts.length > 0 ? (
          <div className="space-y-3 mt-2">
            {blockedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Icon
                      name={account.avatar as any}
                      className="h-5 w-5 text-muted-foreground"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">
                      @{account.username}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-center py-4 bg-secondary/30 rounded-md">
            No blocked accounts
          </p>
        )}
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Muted Accounts</h3>
        <p className="text-sm text-muted-foreground">
          You won't see posts from muted accounts in your feed, but they can
          still interact with you.
        </p>

        {mutedAccounts.length > 0 ? (
          <div className="space-y-3 mt-2">
            {mutedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Icon
                      name={account.avatar as any}
                      className="h-5 w-5 text-muted-foreground"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">
                      @{account.username}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Unmute
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-center py-4 bg-secondary/30 rounded-md">
            No muted accounts
          </p>
        )}
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Block or Mute New Account</h3>
        <p className="text-sm text-muted-foreground">
          Enter a username to block or mute an account.
        </p>

        <div className="flex gap-3 mt-2">
          <input
            type="text"
            placeholder="@username"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Button variant="outline">Mute</Button>
          <Button variant="default">Block</Button>
        </div>
      </div>
    </div>
  );
}

export function DirectMessagesContent() {
  const [messageRetention, setMessageRetention] = useState("forever");

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="MessageSquare" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Direct Messages</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control who can send you direct messages and manage your messaging
              privacy.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Message Requests</h3>
        <p className="text-sm text-muted-foreground">
          Control who can send you message requests.
        </p>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-everyone">
                Allow Messages from Everyone
              </Label>
              <p className="text-sm text-muted-foreground">
                Anyone can send you direct messages
              </p>
            </div>
            <Switch id="allow-everyone" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-followers">
                Allow Messages from Followers
              </Label>
              <p className="text-sm text-muted-foreground">
                Only people who follow you can send messages
              </p>
            </div>
            <Switch id="allow-followers" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-verified">
                Allow Messages from Verified Identities
              </Label>
              <p className="text-sm text-muted-foreground">
                Only accounts with verified web3 identities can message you
              </p>
            </div>
            <Switch id="allow-verified" defaultChecked />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Message Privacy</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="read-receipts">Show Read Receipts</Label>
              <p className="text-sm text-muted-foreground">
                Let others know when you've read their messages
              </p>
            </div>
            <Switch id="read-receipts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="media-messages">Allow Media in Messages</Label>
              <p className="text-sm text-muted-foreground">
                Let others send images and media in direct messages
              </p>
            </div>
            <Switch id="media-messages" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="e2ee">Enable End-to-End Encryption</Label>
              <p className="text-sm text-muted-foreground">
                Secure your messages with blockchain-based encryption
              </p>
            </div>
            <Switch id="e2ee" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="message-retention">
                Message Retention Period
              </Label>
              <p className="text-sm text-muted-foreground">
                Set how long messages are stored before being deleted
              </p>
            </div>
            <div className="w-56">
              <Select value="forever" onValueChange={setMessageRetention}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forever">Forever</SelectItem>
                  <SelectItem value="30-days">30 days</SelectItem>
                  <SelectItem value="7-days">7 days</SelectItem>
                  <SelectItem value="24-hours">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  );
}

export function LocationInformationContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="MapPin" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Location Information</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control how your location information is used and shared.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Location Services</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share-location">Share Location in Posts</Label>
              <p className="text-sm text-muted-foreground">
                Allow location tagging in your posts
              </p>
            </div>
            <Switch id="share-location" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="precise-location">Use Precise Location</Label>
              <p className="text-sm text-muted-foreground">
                Use your exact location instead of general area
              </p>
            </div>
            <Switch id="precise-location" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="location-history">Store Location History</Label>
              <p className="text-sm text-muted-foreground">
                Keep a history of locations you've tagged in posts
              </p>
            </div>
            <Switch id="location-history" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Public Profile Location</h3>
        <p className="text-sm text-muted-foreground">
          Control how your location appears on your public profile.
        </p>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="Globe" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Show Full Location</p>
                <p className="text-sm text-muted-foreground">
                  Display city and country
                </p>
              </div>
            </div>
            <input type="radio" name="profile-location" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="Map" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Show Country Only</p>
                <p className="text-sm text-muted-foreground">
                  Display only your country
                </p>
              </div>
            </div>
            <input type="radio" name="profile-location" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
            <div className="flex items-center">
              <Icon name="EyeOff" className="mr-3 h-5 w-5" />
              <div>
                <p className="font-medium">Hide Location</p>
                <p className="text-sm text-muted-foreground">
                  Don't show any location information
                </p>
              </div>
            </div>
            <input type="radio" name="profile-location" />
          </div>
        </div>

        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  );
}

export function DataSharingContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Share2" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Data Sharing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Control how your personal data is shared with partners and third
              parties.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Personalization</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="personalized-ads">Personalized Ads</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to show you more relevant advertisements
              </p>
            </div>
            <Switch id="personalized-ads" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="personalized-content">Personalized Content</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to show you more relevant posts and content
              </p>
            </div>
            <Switch id="personalized-content" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="interest-tracking">Interest Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Allow tracking of your interests based on activity
              </p>
            </div>
            <Switch id="interest-tracking" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Third-Party Data Sharing</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dapp-sharing">DApp Integration</Label>
              <p className="text-sm text-muted-foreground">
                Share data with connected decentralized applications
              </p>
            </div>
            <Switch id="dapp-sharing" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="partners-sharing">Partners and Advertisers</Label>
              <p className="text-sm text-muted-foreground">
                Share data with our trusted partners
              </p>
            </div>
            <Switch id="partners-sharing" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics-sharing">Analytics Providers</Label>
              <p className="text-sm text-muted-foreground">
                Share anonymized data for platform improvements
              </p>
            </div>
            <Switch id="analytics-sharing" defaultChecked />
          </div>
        </div>

        <div className="mt-6 p-4 border rounded-md bg-secondary/20">
          <h4 className="font-medium flex items-center">
            <Icon name="Info" className="mr-2 h-4 w-4" />
            Web3 Data Control
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Your on-chain activity is public by default on the blockchain. These
            settings only control how our platform uses and shares this data
            with third parties.
          </p>
        </div>

        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  );
}

export function OffChainPrivacyContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Shield" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Off-Chain Privacy</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage privacy settings for data that's stored off-chain.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Private Data Storage</h3>
        <p className="text-sm text-muted-foreground">
          Control how your private data is stored and encrypted off-chain.
        </p>

        <div className="space-y-6 mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="encrypted-storage">End-to-End Encryption</Label>
              <p className="text-sm text-muted-foreground">
                Store sensitive data with end-to-end encryption
              </p>
            </div>
            <Switch id="encrypted-storage" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="decentralized-storage">
                Decentralized Storage
              </Label>
              <p className="text-sm text-muted-foreground">
                Store data on decentralized networks instead of centralized
                servers
              </p>
            </div>
            <Switch id="decentralized-storage" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="backup-security">Backup Key Security</Label>
              <p className="text-sm text-muted-foreground">
                Enable additional security for encryption key backups
              </p>
            </div>
            <Switch id="backup-security" defaultChecked />
          </div>
        </div>

        <div className="mt-6 p-4 border rounded-md bg-primary/5">
          <h4 className="font-medium flex items-center">
            <Icon name="Key" className="mr-2 h-4 w-4" />
            Your Encryption Keys
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Your data is encrypted with keys that only you control. Make sure to
            back up your keys securely.
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm">
              Backup Keys
            </Button>
            <Button variant="ghost" size="sm">
              Rotate Keys
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Metadata Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Control how metadata about your activity is handled.
        </p>

        <div className="space-y-6 mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="activity-tracking">Activity Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Track your activity for personalized experiences
              </p>
            </div>
            <Switch id="activity-tracking" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="metadata-minimization">
                Metadata Minimization
              </Label>
              <p className="text-sm text-muted-foreground">
                Reduce the amount of metadata collected about your activity
              </p>
            </div>
            <Switch id="metadata-minimization" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="private-browsing">Private Browsing Mode</Label>
              <p className="text-sm text-muted-foreground">
                Browse content without logging activity
              </p>
            </div>
            <Switch id="private-browsing" />
          </div>
        </div>

        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  );
}
