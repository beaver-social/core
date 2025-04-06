import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";

export function DataControlContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Database" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Data Control</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage how your data is collected and used.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Activity Data</h3>
                <p className="text-sm text-muted-foreground">
                    Control how your activity information is collected and used to personalize your experience.
                </p>

                <div className="space-y-6 mt-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="personalized-content">Personalized Content</Label>
                            <p className="text-sm text-muted-foreground">
                                Use your activity to personalize content recommendations
                            </p>
                        </div>
                        <Switch id="personalized-content" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="browsing-history">Save Browsing History</Label>
                            <p className="text-sm text-muted-foreground">
                                Keep record of posts and profiles you've viewed
                            </p>
                        </div>
                        <Switch id="browsing-history" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="search-history">Save Search History</Label>
                            <p className="text-sm text-muted-foreground">
                                Remember your recent searches
                            </p>
                        </div>
                        <Switch id="search-history" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="interest-tracking">Interest Tracking</Label>
                            <p className="text-sm text-muted-foreground">
                                Analyze your activity to determine your interests
                            </p>
                        </div>
                        <Switch id="interest-tracking" defaultChecked />
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" className="w-full">Clear Activity Data</Button>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Off-Platform Activity</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="off-platform-data">Off-Platform Data Collection</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow collection of data about your activity on connected websites and apps
                            </p>
                        </div>
                        <Switch id="off-platform-data" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="cross-app-tracking">Cross-App Tracking</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow tracking of your activity across other apps and websites
                            </p>
                        </div>
                        <Switch id="cross-app-tracking" />
                    </div>
                </div>

                <Button className="mt-4">Save Data Control Settings</Button>
            </div>
        </div>
    );
}

export function DataExportContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Download" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Data Export</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Request a copy of your personal data.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Export Options</h3>
                <p className="text-sm text-muted-foreground">
                    Choose what data to include in your export.
                </p>

                <div className="space-y-3 mt-4">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="profile-data" defaultChecked className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500" />
                        <Label htmlFor="profile-data">Profile Information</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="posts-data" defaultChecked className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500" />
                        <Label htmlFor="posts-data">Posts and Comments</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="wallet-data" defaultChecked className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500" />
                        <Label htmlFor="wallet-data">Wallet and Transaction History</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="activity-data" defaultChecked className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500" />
                        <Label htmlFor="activity-data">Activity and Interactions</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="direct-messages" defaultChecked className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500" />
                        <Label htmlFor="direct-messages">Direct Messages</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="following-data" defaultChecked className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500" />
                        <Label htmlFor="following-data">Following and Followers</Label>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Export Format</h3>

                <div className="space-y-3 mt-4">
                    <div className="flex items-center space-x-2">
                        <input type="radio" id="format-json" name="format" defaultChecked className="h-4 w-4" />
                        <Label htmlFor="format-json">JSON (Machine Readable)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="radio" id="format-html" name="format" className="h-4 w-4" />
                        <Label htmlFor="format-html">HTML (Human Readable)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="radio" id="format-csv" name="format" className="h-4 w-4" />
                        <Label htmlFor="format-csv">CSV (Spreadsheet)</Label>
                    </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 mt-4 flex items-start gap-2">
                    <Icon name="Info" className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-blue-800">Export Processing Time</p>
                        <p className="text-sm text-blue-700">
                            Data exports may take up to 48 hours to process. You'll receive an email when your data is ready for download.
                        </p>
                    </div>
                </div>

                <Button className="mt-4">Request Data Export</Button>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Previous Exports</h3>

                <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <p className="font-medium">Full Data Export</p>
                            <p className="text-xs text-muted-foreground">Requested on May 15, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <p className="font-medium">Profile & Posts</p>
                            <p className="text-xs text-muted-foreground">Requested on January 10, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PrivacyPolicyContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="FileText" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Privacy Policy</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Review our privacy policies and data practices.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Current Policies</h3>

                <div className="space-y-4 mt-2">
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Privacy Policy</h4>
                            <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">Updated Apr 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Covers how we collect, use, and protect your personal information.
                        </p>
                        <div className="flex mt-3">
                            <Button variant="outline" size="sm">Read Full Policy</Button>
                        </div>
                    </div>

                    <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Terms of Service</h4>
                            <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">Updated Mar 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            The rules and guidelines for using our platform and services.
                        </p>
                        <div className="flex mt-3">
                            <Button variant="outline" size="sm">Read Terms</Button>
                        </div>
                    </div>

                    <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Cookie Policy</h4>
                            <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">Updated Apr 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Information about how we use cookies and similar technologies.
                        </p>
                        <div className="flex mt-3">
                            <Button variant="outline" size="sm">Read Cookie Policy</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Policy Updates</h3>

                <div className="space-y-4 mt-2">
                    <div className="p-4 border rounded-md bg-blue-50">
                        <div className="flex items-start gap-3">
                            <Icon name="Bell" className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-blue-800">Privacy Policy Update Coming</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    We're updating our privacy policy on June 15, 2023 to reflect new data processing standards and blockchain-specific privacy considerations.
                                </p>
                                <Button variant="outline" size="sm" className="mt-3 bg-white">Preview Changes</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="space-y-0.5">
                        <Label htmlFor="policy-notifications">Policy Update Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive email notifications about policy changes
                        </p>
                    </div>
                    <Switch id="policy-notifications" defaultChecked />
                </div>
            </div>
        </div>
    );
}

export function DataDeletionContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Trash" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Data Deletion</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage or permanently delete your account and data.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Clear Data</h3>
                <p className="text-sm text-muted-foreground">
                    Selectively clear specific types of data from your account.
                </p>

                <div className="space-y-3 mt-4">
                    <Button variant="outline" className="w-full justify-between">
                        Clear Search History
                        <Icon name="X" className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" className="w-full justify-between">
                        Clear Browsing History
                        <Icon name="X" className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" className="w-full justify-between">
                        Clear Interaction Data
                        <Icon name="X" className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" className="w-full justify-between">
                        Delete Uploaded Media
                        <Icon name="X" className="h-4 w-4" />
                    </Button>
                </div>

                <div className="p-4 rounded-lg bg-yellow-50 mt-4 flex items-start gap-2">
                    <Icon name="Info" className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-yellow-700">
                        Clearing specific data types may impact your experience and personalized recommendations on the platform.
                    </p>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Blockchain Data</h3>
                <p className="text-sm text-muted-foreground">
                    Understand how your blockchain data is handled.
                </p>

                <div className="p-4 rounded-lg bg-secondary/30 mt-2">
                    <p className="text-sm">
                        Due to the nature of blockchain technology, some of your data such as transaction history and wallet
                        addresses cannot be completely deleted from the blockchain. However, we can disconnect this data from
                        your account and remove it from our servers.
                    </p>
                </div>

                <div className="mt-4">
                    <Button variant="outline" className="w-full">Disconnect Blockchain Data</Button>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                </p>

                <div className="p-4 rounded-lg bg-red-50 mt-2 space-y-3">
                    <div className="flex items-start gap-2">
                        <Icon name="Info" className="h-5 w-5 text-red-600 mt-0.5" />
                        <p className="text-sm text-red-700 font-medium">
                            This action is permanent and cannot be undone
                        </p>
                    </div>
                    <p className="text-sm text-red-700">
                        Deleting your account will permanently remove all your content, including posts, comments, and media. Your profile will no longer be accessible. As noted above, blockchain transactions cannot be removed from the chain itself.
                    </p>
                </div>

                <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="confirm-delete" className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500" />
                        <Label htmlFor="confirm-delete" className="text-sm">I understand this action is permanent</Label>
                    </div>

                    <Button variant="destructive" className="w-full" disabled>Delete My Account</Button>
                </div>
            </div>
        </div>
    );
}

export function ThirdPartyContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Share2" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Third-Party Data Sharing</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage how your data is shared with third parties.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Connected Services</h3>
                <p className="text-sm text-muted-foreground">
                    Manage third-party services connected to your account.
                </p>

                <div className="space-y-3 mt-4">
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Icon name="Wallet" className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">MetaMask</p>
                                    <p className="text-xs text-muted-foreground">Connected on Apr 12, 2023</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-muted-foreground">
                                Has access to: Wallet address, Transaction history
                            </p>
                        </div>
                    </div>

                    <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Icon name="MessageSquare" className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Discord</p>
                                    <p className="text-xs text-muted-foreground">Connected on May 5, 2023</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-muted-foreground">
                                Has access to: Profile information, Username
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Data Sharing Settings</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="analytics-sharing">Analytics Providers</Label>
                            <p className="text-sm text-muted-foreground">
                                Share usage data with analytics services
                            </p>
                        </div>
                        <Switch id="analytics-sharing" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="marketing-sharing">Marketing Partners</Label>
                            <p className="text-sm text-muted-foreground">
                                Share data for personalized marketing
                            </p>
                        </div>
                        <Switch id="marketing-sharing" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="api-access">API Partners</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow third-party API access to your public data
                            </p>
                        </div>
                        <Switch id="api-access" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="dapp-sharing">DApp Integration</Label>
                            <p className="text-sm text-muted-foreground">
                                Share data with integrated decentralized applications
                            </p>
                        </div>
                        <Switch id="dapp-sharing" defaultChecked />
                    </div>
                </div>

                <Button className="mt-4">Save Sharing Settings</Button>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Data Processors</h3>
                <p className="text-sm text-muted-foreground">
                    Companies that process your data on our behalf.
                </p>

                <div className="max-h-60 overflow-y-auto p-3 border rounded-md mt-2 space-y-2">
                    <div className="pb-2 border-b">
                        <p className="font-medium text-sm">Analytics Inc.</p>
                        <p className="text-xs text-muted-foreground">Usage analytics and metrics</p>
                    </div>
                    <div className="pb-2 border-b">
                        <p className="font-medium text-sm">Cloud Storage Provider</p>
                        <p className="text-xs text-muted-foreground">Media storage and hosting</p>
                    </div>
                    <div className="pb-2 border-b">
                        <p className="font-medium text-sm">Blockchain Data Services</p>
                        <p className="text-xs text-muted-foreground">Transaction monitoring and analysis</p>
                    </div>
                    <div className="pb-2 border-b">
                        <p className="font-medium text-sm">Email Service Provider</p>
                        <p className="text-xs text-muted-foreground">Notification delivery</p>
                    </div>
                    <div>
                        <p className="font-medium text-sm">Customer Support Platform</p>
                        <p className="text-xs text-muted-foreground">Support ticket management</p>
                    </div>
                </div>

                <Button variant="outline" className="mt-2">View Full Data Processor List</Button>
            </div>
        </div>
    );
}
