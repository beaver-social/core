import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";

export function DataControlContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Icon name="Database" className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle>Data Control</CardTitle>
              <CardDescription>
                Manage how your data is collected and used.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Data</CardTitle>
          <CardDescription>
            Control how your activity information is collected and used to
            personalize your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Clear Activity Data
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Off-Platform Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="off-platform-data">
                Off-Platform Data Collection
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow collection of data about your activity on connected
                websites and apps
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
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Data Control Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function DataExportContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Icon name="Download" className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle>Data Export</CardTitle>
              <CardDescription>
                Request a copy of your personal data.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>
            Choose what data to include in your export.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="profile-data" defaultChecked />
            <Label htmlFor="profile-data">Profile Information</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="posts-data" defaultChecked />
            <Label htmlFor="posts-data">Posts and Comments</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="wallet-data" defaultChecked />
            <Label htmlFor="wallet-data">Wallet and Transaction History</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="activity-data" defaultChecked />
            <Label htmlFor="activity-data">Activity and Interactions</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="direct-messages" defaultChecked />
            <Label htmlFor="direct-messages">Direct Messages</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="following-data" defaultChecked />
            <Label htmlFor="following-data">Following and Followers</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <RadioGroup defaultValue="json" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="json" id="format-json" />
              <Label htmlFor="format-json">JSON (Machine Readable)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="html" id="format-html" />
              <Label htmlFor="format-html">HTML (Human Readable)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="csv" id="format-csv" />
              <Label htmlFor="format-csv">CSV (Spreadsheet)</Label>
            </div>
          </RadioGroup>

          <div className="p-4 rounded-lg bg-blue-50 mt-4 flex items-start gap-2">
            <Icon name="Info" className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Export Processing Time
              </p>
              <p className="text-sm text-blue-700">
                Data exports may take up to 48 hours to process. You'll receive
                an email when your data is ready for download.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Request Data Export</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Exports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <p className="font-medium">Full Data Export</p>
              <p className="text-xs text-muted-foreground">
                Requested on May 15, 2023
              </p>
            </div>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <p className="font-medium">Profile & Posts</p>
              <p className="text-xs text-muted-foreground">
                Requested on January 10, 2023
              </p>
            </div>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PrivacyPolicyContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Icon name="FileText" className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>
                Review our privacy policies and data practices.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Privacy Policy</h4>
              <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">
                Updated Apr 2023
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Covers how we collect, use, and protect your personal information.
            </p>
            <div className="flex mt-3">
              <Button variant="outline" size="sm">
                Read Full Policy
              </Button>
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Terms of Service</h4>
              <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">
                Updated Mar 2023
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              The rules and guidelines for using our platform and services.
            </p>
            <div className="flex mt-3">
              <Button variant="outline" size="sm">
                Read Terms
              </Button>
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Cookie Policy</h4>
              <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">
                Updated Apr 2023
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Information about how we use cookies and similar technologies.
            </p>
            <div className="flex mt-3">
              <Button variant="outline" size="sm">
                Read Cookie Policy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policy Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md bg-blue-50">
            <div className="flex items-start gap-3">
              <Icon name="Bell" className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">
                  Privacy Policy Update Coming
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  We're updating our privacy policy on June 15, 2023 to reflect
                  new data processing standards and blockchain-specific privacy
                  considerations.
                </p>
                <Button variant="outline" size="sm" className="mt-3 bg-white">
                  Preview Changes
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="policy-notifications">
                Policy Update Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications about policy changes
              </p>
            </div>
            <Switch id="policy-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DataDeletionContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Icon name="Trash" className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle>Data Deletion</CardTitle>
              <CardDescription>
                Manage or permanently delete your account and data.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clear Data</CardTitle>
          <CardDescription>
            Selectively clear specific types of data from your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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

          <div className="p-4 rounded-lg bg-yellow-50 mt-4 flex items-start gap-2">
            <Icon name="Info" className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-700">
              Clearing specific data types may impact your experience and
              personalized recommendations on the platform.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blockchain Data</CardTitle>
          <CardDescription>
            Understand how your blockchain data is handled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-secondary/30">
            <p className="text-sm">
              Due to the nature of blockchain technology, some of your data such
              as transaction history and wallet addresses cannot be completely
              deleted from the blockchain. However, we can disconnect this data
              from your account and remove it from our servers.
            </p>
          </div>

          <div className="mt-4">
            <Button variant="outline" className="w-full">
              Disconnect Blockchain Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-red-50 space-y-3">
            <div className="flex items-start gap-2">
              <Icon name="Info" className="h-5 w-5 text-red-600 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">
                This action is permanent and cannot be undone
              </p>
            </div>
            <p className="text-sm text-red-700">
              Deleting your account will permanently remove all your content,
              including posts, comments, and media. Your profile will no longer
              be accessible. As noted above, blockchain transactions cannot be
              removed from the chain itself.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="confirm-delete" />
              <Label htmlFor="confirm-delete" className="text-sm">
                I understand this action is permanent
              </Label>
            </div>

            <Button variant="destructive" className="w-full" disabled>
              Delete My Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ThirdPartyContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Icon name="Share2" className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle>Third-Party Data Sharing</CardTitle>
              <CardDescription>
                Manage how your data is shared with third parties.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
          <CardDescription>
            Manage third-party services connected to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 border rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="Wallet" className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">MetaMask</p>
                  <p className="text-xs text-muted-foreground">
                    Connected on Apr 12, 2023
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Disconnect
              </Button>
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
                  <Icon
                    name="MessageSquare"
                    className="h-5 w-5 text-purple-600"
                  />
                </div>
                <div>
                  <p className="font-medium">Discord</p>
                  <p className="text-xs text-muted-foreground">
                    Connected on May 5, 2023
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Disconnect
              </Button>
            </div>
            <div className="mt-3">
              <p className="text-xs text-muted-foreground">
                Has access to: Profile information, Username
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Sharing Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Sharing Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Processors</CardTitle>
          <CardDescription>
            Companies that process your data on our behalf.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 overflow-y-auto p-3 border rounded-md space-y-2">
            <div className="pb-2 border-b">
              <p className="font-medium text-sm">Analytics Inc.</p>
              <p className="text-xs text-muted-foreground">
                Usage analytics and metrics
              </p>
            </div>
            <div className="pb-2 border-b">
              <p className="font-medium text-sm">Cloud Storage Provider</p>
              <p className="text-xs text-muted-foreground">
                Media storage and hosting
              </p>
            </div>
            <div className="pb-2 border-b">
              <p className="font-medium text-sm">Blockchain Data Services</p>
              <p className="text-xs text-muted-foreground">
                Transaction monitoring and analysis
              </p>
            </div>
            <div className="pb-2 border-b">
              <p className="font-medium text-sm">Email Service Provider</p>
              <p className="text-xs text-muted-foreground">
                Notification delivery
              </p>
            </div>
            <div>
              <p className="font-medium text-sm">Customer Support Platform</p>
              <p className="text-xs text-muted-foreground">
                Support ticket management
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Full Data Processor List
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
