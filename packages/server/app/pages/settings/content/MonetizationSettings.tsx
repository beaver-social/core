import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export function TokensContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Coins" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Tokens</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your platform tokens and rewards.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Token Balance</h3>

        <div className="p-4 bg-secondary/30 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-bold">1,250 BEAV</p>
          </div>
          <Button>Add More</Button>
        </div>

        <div className="space-y-1 mt-2">
          <p className="text-sm text-muted-foreground">Recent Activity</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border-b">
              <div>
                <p className="font-medium">Content Reward</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <p className="text-green-500 font-medium">+25 BEAV</p>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <div>
                <p className="font-medium">Creator Tip</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
              <p className="text-red-500 font-medium">-50 BEAV</p>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <div>
                <p className="font-medium">Engagement Bonus</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
              <p className="text-green-500 font-medium">+100 BEAV</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Token Settings</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-claim">Auto-Claim Rewards</Label>
              <p className="text-sm text-muted-foreground">
                Automatically claim tokens from engagement rewards
              </p>
            </div>
            <Switch id="auto-claim" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="token-notifications">Token Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about token activity
              </p>
            </div>
            <Switch id="token-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="display-balance">Display Token Balance</Label>
              <p className="text-sm text-muted-foreground">
                Show your token balance in your profile
              </p>
            </div>
            <Switch id="display-balance" />
          </div>
        </div>

        <Button className="mt-4">Save Token Settings</Button>
      </div>
    </div>
  );
}

export function CreatorFundContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Zap" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Creator Fund</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Earn rewards for your content contributions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Eligibility Status</h3>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Icon name="Check" className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium">
                You're eligible for the Creator Fund!
              </p>
              <p className="text-sm text-muted-foreground">
                You meet all requirements to receive rewards for your content.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <p className="text-sm font-medium">Eligibility Requirements:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="Check" className="h-5 w-5 text-green-500" />
              <p className="text-sm">Minimum 500 followers</p>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Check" className="h-5 w-5 text-green-500" />
              <p className="text-sm">Verified wallet</p>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Check" className="h-5 w-5 text-green-500" />
              <p className="text-sm">
                At least 10 original posts in the last 30 days
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Check" className="h-5 w-5 text-green-500" />
              <p className="text-sm">Compliance with community guidelines</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Earnings Overview</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-xl font-bold">2,340 BEAV</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Earned</p>
            <p className="text-xl font-bold">12,875 BEAV</p>
          </div>
        </div>

        <div className="p-4 border rounded-md mt-4">
          <p className="font-medium">Performance Metrics</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm">Engagement Rate</p>
              <p className="text-sm font-medium">8.7%</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Average Likes</p>
              <p className="text-sm font-medium">427</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Content Views</p>
              <p className="text-sm font-medium">23,451</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Payout Settings</h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="payout-wallet">Payout Wallet Address</Label>
            <div className="flex mt-2">
              <Input
                id="payout-wallet"
                defaultValue="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                className="rounded-r-none"
              />
              <Button variant="outline" className="rounded-l-none border-l-0">
                Change
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="payout-threshold">Payout Threshold</Label>
            <Select defaultValue="500">
              <SelectTrigger id="payout-threshold" className="mt-2">
                <SelectValue placeholder="Select threshold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 BEAV</SelectItem>
                <SelectItem value="500">500 BEAV</SelectItem>
                <SelectItem value="1000">1,000 BEAV</SelectItem>
                <SelectItem value="2500">2,500 BEAV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-payout">Automatic Payouts</Label>
              <p className="text-sm text-muted-foreground">
                Automatically send rewards to your wallet when threshold is
                reached
              </p>
            </div>
            <Switch id="auto-payout" defaultChecked />
          </div>
        </div>

        <Button className="mt-4">Save Payout Settings</Button>
      </div>
    </div>
  );
}

export function NFTsContent() {
  const ownedNFTs = [
    {
      id: 1,
      name: "Digital Beaver #428",
      collection: "Beaver Collection",
      image: "nft1.jpg",
    },
    {
      id: 2,
      name: "Crypto Punk #2044",
      collection: "CryptoPunks",
      image: "nft2.jpg",
    },
    {
      id: 3,
      name: "Cool Cat #1337",
      collection: "Cool Cats",
      image: "nft3.jpg",
    },
  ];

  const createdNFTs = [
    {
      id: 4,
      name: "Genesis Artwork #1",
      collection: "My Creations",
      image: "nft4.jpg",
    },
    {
      id: 5,
      name: "Digital Abstract #7",
      collection: "My Creations",
      image: "nft5.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Image" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">NFTs</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your NFT collection and creations.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your NFT Collection</h3>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {ownedNFTs.map((nft) => (
            <div key={nft.id} className="border rounded-md overflow-hidden">
              <div className="aspect-square bg-secondary/50 flex items-center justify-center">
                <Icon
                  name="Image"
                  className="h-10 w-10 text-muted-foreground"
                />
              </div>
              <div className="p-3">
                <p className="font-medium truncate">{nft.name}</p>
                <p className="text-xs text-muted-foreground">
                  {nft.collection}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                  >
                    Display
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Created NFTs</h3>
          <Button variant="default" size="sm">
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {createdNFTs.map((nft) => (
            <div key={nft.id} className="border rounded-md overflow-hidden">
              <div className="aspect-square bg-secondary/50 flex items-center justify-center">
                <Icon
                  name="Image"
                  className="h-10 w-10 text-muted-foreground"
                />
              </div>
              <div className="p-3">
                <p className="font-medium truncate">{nft.name}</p>
                <p className="text-xs text-muted-foreground">
                  {nft.collection}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                  >
                    Analytics
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">NFT Display Settings</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="display-nfts">Show NFTs on Profile</Label>
              <p className="text-sm text-muted-foreground">
                Display your NFT collection on your public profile
              </p>
            </div>
            <Switch id="display-nfts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="nft-pfp">Allow NFT Profile Pictures</Label>
              <p className="text-sm text-muted-foreground">
                Use NFTs from your collection as profile pictures
              </p>
            </div>
            <Switch id="nft-pfp" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="nft-verification">NFT Verification Badge</Label>
              <p className="text-sm text-muted-foreground">
                Show verification badge for NFT profile pictures
              </p>
            </div>
            <Switch id="nft-verification" defaultChecked />
          </div>
        </div>

        <Button className="mt-4">Save NFT Settings</Button>
      </div>
    </div>
  );
}

export function TipsContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Gift" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Tips & Donations</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage how you receive support from your audience.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Tip Settings</h3>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Enabled</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Allow users to send you tokens as tips for your content.
        </p>

        <div className="space-y-6 mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-tips">Enable Tips</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to send you tips
              </p>
            </div>
            <Switch id="enable-tips" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="tip-notifications">Tip Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when someone tips you
              </p>
            </div>
            <Switch id="tip-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public-thanks">Public Thank You</Label>
              <p className="text-sm text-muted-foreground">
                Automatically thank users publicly for tips
              </p>
            </div>
            <Switch id="public-thanks" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Suggested Tip Amounts</h3>
        <p className="text-sm text-muted-foreground">
          Set default tip amounts that will be suggested to users.
        </p>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="tip-small">Small</Label>
              <div className="flex items-center mt-1">
                <Input
                  id="tip-small"
                  type="number"
                  defaultValue="5"
                  className="rounded-r-none"
                />
                <div className="h-10 px-3 border border-l-0 rounded-r-md flex items-center bg-secondary/50">
                  <span className="text-sm">BEAV</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="tip-medium">Medium</Label>
              <div className="flex items-center mt-1">
                <Input
                  id="tip-medium"
                  type="number"
                  defaultValue="20"
                  className="rounded-r-none"
                />
                <div className="h-10 px-3 border border-l-0 rounded-r-md flex items-center bg-secondary/50">
                  <span className="text-sm">BEAV</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="tip-large">Large</Label>
              <div className="flex items-center mt-1">
                <Input
                  id="tip-large"
                  type="number"
                  defaultValue="50"
                  className="rounded-r-none"
                />
                <div className="h-10 px-3 border border-l-0 rounded-r-md flex items-center bg-secondary/50">
                  <span className="text-sm">BEAV</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="custom-amount">Allow Custom Amounts</Label>
              <p className="text-sm text-muted-foreground">
                Let users enter their own tip amount
              </p>
            </div>
            <Switch id="custom-amount" defaultChecked />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Tip Analytics</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Received</p>
            <p className="text-xl font-bold">675 BEAV</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Average Tip</p>
            <p className="text-xl font-bold">18.2 BEAV</p>
          </div>
        </div>

        <Button className="mt-4 w-full" variant="outline">
          View Detailed Analytics
        </Button>
        <Button className="mt-2">Save Tip Settings</Button>
      </div>
    </div>
  );
}

export function SubscriptionsContent() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Icon name="Star" className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Subscriptions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your premium content subscriptions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Subscription Status</h3>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm font-medium">Not Active</span>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-yellow-50 flex items-start gap-2">
          <Icon name="Info" className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              You're eligible to offer subscriptions
            </p>
            <p className="text-sm text-yellow-700">
              Set up your subscription tiers to start earning recurring income
              from your content.
            </p>
          </div>
        </div>

        <Button>Set Up Subscription</Button>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Subscription Tiers</h3>
        <p className="text-sm text-muted-foreground">
          Create different subscription levels with varying benefits.
        </p>

        <div className="space-y-4 mt-4">
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <p className="font-medium">Basic Tier</p>
              </div>
              <p className="font-medium">10 BEAV/month</p>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-sm">Benefits:</p>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                <p className="text-sm">Ad-free experience</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                <p className="text-sm">Special member badge</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                <p className="text-sm">Access to exclusive posts</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <p className="font-medium">Premium Tier</p>
              </div>
              <p className="font-medium">25 BEAV/month</p>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-sm">Benefits:</p>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                <p className="text-sm">All Basic Tier benefits</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                <p className="text-sm">Monthly token rewards</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                <p className="text-sm">Priority comment visibility</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="h-4 w-4 text-green-500" />
                <p className="text-sm">Early access to new features</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Add New Tier
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border space-y-4">
        <h3 className="text-lg font-medium">Subscriber Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Track your subscriber growth and revenue.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Subscribers</p>
            <p className="text-xl font-bold">0</p>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            <p className="text-xl font-bold">0 BEAV</p>
          </div>
        </div>

        <Button className="mt-4" disabled>
          View Subscriber Analytics
        </Button>
      </div>
    </div>
  );
}
