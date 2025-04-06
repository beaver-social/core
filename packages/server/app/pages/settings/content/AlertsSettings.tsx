import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";

export function FiltersContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Filter" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Alert Filters</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Control what types of activities trigger notifications.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Interaction Alerts</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="likes">Post Likes</Label>
                            <p className="text-sm text-muted-foreground">
                                When someone likes your posts
                            </p>
                        </div>
                        <Switch id="likes" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="comments">Comments</Label>
                            <p className="text-sm text-muted-foreground">
                                When someone comments on your posts
                            </p>
                        </div>
                        <Switch id="comments" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="reposts">Reposts</Label>
                            <p className="text-sm text-muted-foreground">
                                When someone reposts your content
                            </p>
                        </div>
                        <Switch id="reposts" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="mentions">Mentions</Label>
                            <p className="text-sm text-muted-foreground">
                                When someone mentions you in a post
                            </p>
                        </div>
                        <Switch id="mentions" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Network Alerts</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="followers">New Followers</Label>
                            <p className="text-sm text-muted-foreground">
                                When someone follows your account
                            </p>
                        </div>
                        <Switch id="followers" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="follows-you">Mutual Connections</Label>
                            <p className="text-sm text-muted-foreground">
                                When someone you follow also follows you
                            </p>
                        </div>
                        <Switch id="follows-you" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="verified-follows">Verified Account Follows</Label>
                            <p className="text-sm text-muted-foreground">
                                When a verified account follows you
                            </p>
                        </div>
                        <Switch id="verified-follows" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Web3 Activity Alerts</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="token-activity">Token Activity</Label>
                            <p className="text-sm text-muted-foreground">
                                Activity related to tokens you hold or create
                            </p>
                        </div>
                        <Switch id="token-activity" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="nft-activity">NFT Activity</Label>
                            <p className="text-sm text-muted-foreground">
                                When someone interacts with your NFTs
                            </p>
                        </div>
                        <Switch id="nft-activity" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="dao-proposals">DAO Proposals</Label>
                            <p className="text-sm text-muted-foreground">
                                New proposals in DAOs you're a member of
                            </p>
                        </div>
                        <Switch id="dao-proposals" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="price-alerts">Price Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Significant price movements for assets you follow
                            </p>
                        </div>
                        <Switch id="price-alerts" />
                    </div>
                </div>

                <Button className="mt-4">Save Changes</Button>
            </div>
        </div>
    );
}

export function PreferencesContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Settings" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Alert Preferences</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Control how and when you receive notifications.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Notification Timing</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="real-time">Real-time Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive notifications as events happen
                            </p>
                        </div>
                        <Switch id="real-time" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="digest">Daily Digest</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive a daily summary of notifications
                            </p>
                        </div>
                        <Switch id="digest" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="quiet-hours">Quiet Hours</Label>
                            <p className="text-sm text-muted-foreground">
                                Pause notifications during specific hours
                            </p>
                        </div>
                        <Switch id="quiet-hours" />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Quiet Hours Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Set hours when you won't receive notifications.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <select id="start-time" className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option>10:00 PM</option>
                            <option>11:00 PM</option>
                            <option>12:00 AM</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <select id="end-time" className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option>6:00 AM</option>
                            <option>7:00 AM</option>
                            <option>8:00 AM</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium">Days</p>
                    <div className="flex flex-wrap gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <label key={day} className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="h-4 w-4" defaultChecked />
                                <span className="text-sm">{day}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Priority Settings</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="priority-mentions">Priority Mentions</Label>
                            <p className="text-sm text-muted-foreground">
                                Always notify for mentions from verified accounts
                            </p>
                        </div>
                        <Switch id="priority-mentions" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="important-only">Important Notifications Only</Label>
                            <p className="text-sm text-muted-foreground">
                                Only receive notifications for high-priority events
                            </p>
                        </div>
                        <Switch id="important-only" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="favorite-accounts">Favorite Accounts</Label>
                            <p className="text-sm text-muted-foreground">
                                Always notify for activity from accounts you've marked as favorites
                            </p>
                        </div>
                        <Switch id="favorite-accounts" defaultChecked />
                    </div>
                </div>

                <Button className="mt-4">Save Changes</Button>
            </div>
        </div>
    );
}

export function EmailAlertsContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Mail" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Email Alerts</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Control which notifications are sent to your email.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Email Settings</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                        <div>
                            <span className="text-sm font-medium">Your Email</span>
                            <p className="text-xs text-muted-foreground mt-1">user@example.com</p>
                        </div>
                        <Button variant="outline" size="sm">Change Email</Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Email Notification Categories</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="security-emails">Security Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                New logins, security events, and account changes
                            </p>
                        </div>
                        <Switch id="security-emails" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="transaction-emails">Transaction Updates</Label>
                            <p className="text-sm text-muted-foreground">
                                Completed transactions, token transfers, and receipts
                            </p>
                        </div>
                        <Switch id="transaction-emails" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="social-emails">Social Interactions</Label>
                            <p className="text-sm text-muted-foreground">
                                New followers, mentions, and comments
                            </p>
                        </div>
                        <Switch id="social-emails" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="product-emails">Product Updates</Label>
                            <p className="text-sm text-muted-foreground">
                                New features, platform updates, and announcements
                            </p>
                        </div>
                        <Switch id="product-emails" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="marketing-emails">Marketing Communications</Label>
                            <p className="text-sm text-muted-foreground">
                                Offers, promotions, and recommendations
                            </p>
                        </div>
                        <Switch id="marketing-emails" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="digest-emails">Weekly Digest</Label>
                            <p className="text-sm text-muted-foreground">
                                Weekly summary of activity and updates
                            </p>
                        </div>
                        <Switch id="digest-emails" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Email Format Preferences</h3>

                <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
                        <div>
                            <p className="font-medium">HTML Format</p>
                            <p className="text-sm text-muted-foreground">Rich formatting with images</p>
                        </div>
                        <input type="radio" name="email-format" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50">
                        <div>
                            <p className="font-medium">Plain Text Format</p>
                            <p className="text-sm text-muted-foreground">Simple text-only emails</p>
                        </div>
                        <input type="radio" name="email-format" />
                    </div>
                </div>

                <Button className="mt-4">Save Changes</Button>
            </div>
        </div>
    );
}

export function PushAlertsContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Bell" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Push Notifications</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Control push notifications on your devices.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Push Notification Status</h3>

                <div className="p-4 rounded-lg border bg-green-500/10 flex items-center gap-3">
                    <Icon name="CircleCheck" className="h-5 w-5 text-green-500" />
                    <p className="text-sm">Push notifications are enabled for this device</p>
                </div>

                <Button variant="outline" className="mt-2">
                    <Icon name="X" className="mr-2 h-4 w-4" />
                    Disable Push Notifications
                </Button>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Push Notification Categories</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="interactions-push">Interactions</Label>
                            <p className="text-sm text-muted-foreground">
                                Likes, comments, and mentions
                            </p>
                        </div>
                        <Switch id="interactions-push" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="followers-push">Followers</Label>
                            <p className="text-sm text-muted-foreground">
                                New followers and mutual connections
                            </p>
                        </div>
                        <Switch id="followers-push" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="direct-messages-push">Direct Messages</Label>
                            <p className="text-sm text-muted-foreground">
                                New messages and message requests
                            </p>
                        </div>
                        <Switch id="direct-messages-push" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="transaction-push">Transactions</Label>
                            <p className="text-sm text-muted-foreground">
                                Transfers, sales, and purchases
                            </p>
                        </div>
                        <Switch id="transaction-push" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="news-push">News & Updates</Label>
                            <p className="text-sm text-muted-foreground">
                                Platform announcements and news
                            </p>
                        </div>
                        <Switch id="news-push" />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Registered Devices</h3>
                <p className="text-sm text-muted-foreground">
                    Manage push notifications on your devices.
                </p>

                <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Icon name="Smartphone" className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Current Device</p>
                                <p className="text-sm text-muted-foreground">Last active: Now</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded mr-2">Active</span>
                            <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Icon name="Laptop" className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="font-medium">MacBook Pro</p>
                                <p className="text-sm text-muted-foreground">Last active: 2 days ago</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-1 rounded mr-2">Enabled</span>
                            <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function OnChainAlertsContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Activity" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">On-Chain Alerts</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Configure notifications for blockchain activity.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Transaction Monitoring</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="wallet-activity">Wallet Activity</Label>
                            <p className="text-sm text-muted-foreground">
                                Transactions in your connected wallets
                            </p>
                        </div>
                        <Switch id="wallet-activity" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="token-transfers">Token Transfers</Label>
                            <p className="text-sm text-muted-foreground">
                                Incoming and outgoing token transfers
                            </p>
                        </div>
                        <Switch id="token-transfers" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="nft-transfers">NFT Transfers</Label>
                            <p className="text-sm text-muted-foreground">
                                Incoming and outgoing NFT transfers
                            </p>
                        </div>
                        <Switch id="nft-transfers" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="contract-interactions">Contract Interactions</Label>
                            <p className="text-sm text-muted-foreground">
                                Interactions with smart contracts
                            </p>
                        </div>
                        <Switch id="contract-interactions" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Network Events</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="gas-alerts">Gas Price Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Notifications when gas prices are favorable
                            </p>
                        </div>
                        <Switch id="gas-alerts" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="network-status">Network Status</Label>
                            <p className="text-sm text-muted-foreground">
                                Alerts about network congestion or issues
                            </p>
                        </div>
                        <Switch id="network-status" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="upgrades">Protocol Upgrades</Label>
                            <p className="text-sm text-muted-foreground">
                                Notifications about blockchain upgrades
                            </p>
                        </div>
                        <Switch id="upgrades" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Custom Blockchain Alerts</h3>
                <p className="text-sm text-muted-foreground">
                    Create alerts for specific on-chain events or addresses.
                </p>

                <div className="space-y-3 mt-2">
                    <div className="p-3 border rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-blue-500/10">
                                    <Icon name="TriangleAlert" className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Large Transfer Alert</p>
                                    <p className="text-sm text-muted-foreground">For transfers over 1,000 SUI</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                    </div>

                    <div className="p-3 border rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-blue-500/10">
                                    <Icon name="TriangleAlert" className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Address Monitoring</p>
                                    <p className="text-sm text-muted-foreground">Track activity for 0x71C...93E4</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                    </div>

                    <Button className="w-full mt-2" variant="outline">
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Add New Alert
                    </Button>
                </div>

                <div className="mt-6 p-4 border rounded-md bg-secondary/20">
                    <h4 className="font-medium flex items-center">
                        <Icon name="Info" className="mr-2 h-4 w-4" />
                        About On-Chain Alerts
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                        On-chain alerts monitor blockchain activity in real-time and notify you of relevant events. These alerts use decentralized indexers and can be customized to match your specific needs.
                    </p>
                </div>
            </div>
        </div>
    );
}