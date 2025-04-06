import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";

export function PasswordContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Lock" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Password</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Update your password and manage your account security.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                    Create a strong password that you don't use for other websites.
                </p>

                <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <input
                            id="current-password"
                            type="password"
                            placeholder="••••••••"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                </div>

                <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                    <p className="text-sm flex items-start">
                        <Icon name="Info" className="h-4 w-4 mr-2 mt-0.5 text-yellow-500" />
                        <span>Your password must be at least 12 characters long and include a mixture of uppercase, lowercase, numbers, and special characters.</span>
                    </p>
                </div>

                <Button className="mt-4">Update Password</Button>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Password Security</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="required-2fa">Require 2FA For Password Changes</Label>
                            <p className="text-sm text-muted-foreground">
                                Additional security for password changes
                            </p>
                        </div>
                        <Switch id="required-2fa" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="password-expiry">Password Expiry</Label>
                            <p className="text-sm text-muted-foreground">
                                Prompt for password change every 90 days
                            </p>
                        </div>
                        <Switch id="password-expiry" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TwoFactorContent() {
    const [enabled2FA, setEnabled2FA] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="ShieldCheck" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Add an extra layer of security to your account with two-factor authentication.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Two-Factor Authentication Status</h3>
                    <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${enabled2FA ? "bg-green-500/20 text-green-600" : "bg-yellow-500/20 text-yellow-600"}`}>
                            {enabled2FA ? "Enabled" : "Disabled"}
                        </span>
                    </div>
                </div>

                {enabled2FA ? (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Your account is protected with two-factor authentication. You will need to enter a code from your authenticator app when signing in.
                        </p>
                        <Button variant="destructive" onClick={() => setEnabled2FA(false)}>Disable 2FA</Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone in addition to your password.
                        </p>

                        <div className="p-4 border rounded-md">
                            <h4 className="font-medium mb-2">Steps to enable 2FA:</h4>
                            <ol className="list-decimal pl-5 text-sm space-y-1">
                                <li>Download an authenticator app (like Google Authenticator, Authy)</li>
                                <li>Scan the QR code or enter the setup key</li>
                                <li>Enter the verification code from the app</li>
                                <li>Save your backup codes</li>
                            </ol>
                        </div>

                        <Button onClick={() => setEnabled2FA(true)}>Enable 2FA</Button>
                    </div>
                )}
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Alternative 2FA Methods</h3>
                <p className="text-sm text-muted-foreground">
                    Choose additional methods for two-factor authentication.
                </p>

                <div className="space-y-4 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Icon name="Smartphone" className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">SMS Authentication</p>
                                <p className="text-sm text-muted-foreground">Receive codes via text message</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Setup</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Icon name="Mail" className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Email Authentication</p>
                                <p className="text-sm text-muted-foreground">Receive codes via email</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Setup</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Icon name="Key" className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Hardware Key</p>
                                <p className="text-sm text-muted-foreground">Use a physical security key</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Setup</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DevicesContent() {
    const devices = [
        { id: 1, name: "Current Device", type: "Desktop", browser: "Chrome", os: "Windows", lastActive: "Now", status: "active" },
        { id: 2, name: "MacBook Pro", type: "Desktop", browser: "Safari", os: "macOS", lastActive: "2 days ago", status: "active" },
        { id: 3, name: "iPhone 13", type: "Mobile", browser: "Safari", os: "iOS", lastActive: "3 days ago", status: "inactive" }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Laptop" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Devices and Sessions</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage devices that are currently signed in to your account.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Currently Active Devices</h3>
                <p className="text-sm text-muted-foreground">
                    Review all devices that are currently logged into your account.
                </p>

                <div className="space-y-4 mt-4">
                    {devices.map(device => (
                        <div key={device.id} className="p-4 border rounded-md">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Icon
                                        name={device.type === "Desktop" ? "Monitor" : "Smartphone"}
                                        className="h-6 w-6 text-muted-foreground"
                                    />
                                    <div>
                                        <div className="flex items-center">
                                            <p className="font-medium">{device.name}</p>
                                            {device.lastActive === "Now" && (
                                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-500/10 text-green-600 rounded">Current</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {device.browser} on {device.os}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="text-muted-foreground">Last active: {device.lastActive}</p>
                                    {device.lastActive !== "Now" && (
                                        <Button variant="ghost" size="sm" className="mt-1">Sign Out</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-2 mt-4">
                    <Button variant="outline">Refresh List</Button>
                    <Button variant="destructive">Sign Out All Devices</Button>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Session Settings</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-logout">Auto Logout After Inactivity</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically log out after period of inactivity
                            </p>
                        </div>
                        <select
                            id="auto-logout"
                            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option>Never</option>
                            <option>After 1 hour</option>
                            <option>After 4 hours</option>
                            <option>After 8 hours</option>
                            <option>After 24 hours</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="remember-devices">Remember Trusted Devices</Label>
                            <p className="text-sm text-muted-foreground">
                                Skip 2FA on devices you've previously logged in from
                            </p>
                        </div>
                        <Switch id="remember-devices" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="session-activity">Session Activity Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified of new logins to your account
                            </p>
                        </div>
                        <Switch id="session-activity" defaultChecked />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AccountRecoveryContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="LifeBuoy" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Account Recovery</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Set up recovery options to regain access to your account if you get locked out.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Recovery Email</h3>
                <p className="text-sm text-muted-foreground">
                    Add a backup email address to recover your account in case you lose access.
                </p>

                <div className="p-3 bg-secondary/30 rounded-md flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Current Recovery Email</p>
                        <p className="text-xs text-muted-foreground">r***@example.com</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                </div>

                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                    <p className="text-sm flex items-start">
                        <Icon name="Check" className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <span>Your recovery email is verified</span>
                    </p>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Recovery Phone</h3>
                <p className="text-sm text-muted-foreground">
                    Add a backup phone number to recover your account in case you lose access.
                </p>

                <div className="p-3 bg-secondary/30 rounded-md flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Current Recovery Phone</p>
                        <p className="text-xs text-muted-foreground">+1 *** *** 4567</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                </div>

                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                    <p className="text-sm flex items-start">
                        <Icon name="Check" className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <span>Your recovery phone is verified</span>
                    </p>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Web3 Recovery Options</h3>
                <p className="text-sm text-muted-foreground">
                    Use blockchain-based methods to recover your account.
                </p>

                <div className="space-y-4 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Icon name="Wallet" className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Connect Backup Wallet</p>
                                <p className="text-sm text-muted-foreground">Use a secondary wallet for recovery</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Setup</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Icon name="Users" className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Social Recovery</p>
                                <p className="text-sm text-muted-foreground">Recover via trusted contacts</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Setup</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md bg-primary/5">
                        <div className="flex items-center gap-3">
                            <Icon name="Key" className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">Recovery Keys</p>
                                <p className="text-sm text-muted-foreground">Generate one-time recovery keys</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2 px-1.5 py-0.5 text-xs bg-green-500/10 text-green-600 rounded">Active</span>
                            <Button variant="outline" size="sm">Manage</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SecurityKeysContent() {
    const securityKeys = [
        { id: 1, name: "YubiKey 5", registered: "Jan 15, 2023", lastUsed: "Yesterday" }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Key" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Security Keys</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage hardware security keys for authentication.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Registered Security Keys</h3>
                    <Button variant="outline" size="sm">
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Add New Key
                    </Button>
                </div>

                {securityKeys.length > 0 ? (
                    <div className="space-y-4 mt-4">
                        {securityKeys.map(key => (
                            <div key={key.id} className="p-4 border rounded-md flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/50 rounded-full">
                                        <Icon name="Key" className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{key.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Registered: {key.registered} • Last used: {key.lastUsed}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">Rename</Button>
                                    <Button variant="ghost" size="sm">Remove</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center border rounded-md bg-secondary/20">
                        <Icon name="Key" className="mx-auto h-8 w-8 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No security keys</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                            Add a security key for an additional layer of protection when signing in.
                        </p>
                        <Button className="mt-4">Register Security Key</Button>
                    </div>
                )}
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">About Security Keys</h3>
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Security keys provide strong protection against phishing attacks and can be used as a second factor when signing in to your account.
                    </p>
                    <div className="p-3 bg-secondary/30 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Supported Security Keys:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex items-center">
                                <Icon name="Check" className="h-4 w-4 mr-2 text-green-500" />
                                FIDO2 compliant keys (YubiKey, Titan, etc.)
                            </li>
                            <li className="flex items-center">
                                <Icon name="Check" className="h-4 w-4 mr-2 text-green-500" />
                                NFC security keys on compatible devices
                            </li>
                            <li className="flex items-center">
                                <Icon name="Check" className="h-4 w-4 mr-2 text-green-500" />
                                Built-in security keys (Windows Hello, Touch ID)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function BackupCodesContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="FileDigit" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Backup Codes</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Generate and manage backup codes for account recovery.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Backup Codes Status</h3>

                <div className="p-4 border rounded-md bg-yellow-500/10">
                    <div className="flex items-start">
                        <Icon name="TriangleAlert" className="h-5 w-5 mr-3 text-yellow-500" />
                        <div>
                            <p className="font-medium">You have 6 backup codes remaining</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Each code can only be used once. We recommend generating new codes when you have few remaining.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <Button variant="outline">
                        <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
                        Generate New Codes
                    </Button>
                    <Button variant="outline">
                        <Icon name="Printer" className="mr-2 h-4 w-4" />
                        Print Backup Codes
                    </Button>
                    <Button variant="outline">
                        <Icon name="Download" className="mr-2 h-4 w-4" />
                        Download Backup Codes
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Using Backup Codes</h3>

                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Backup codes allow you to sign in to your account when you don't have access to your primary two-factor authentication method.
                    </p>

                    <div className="p-3 bg-secondary/30 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Important information:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start">
                                <Icon name="CircleAlert" className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                Each backup code can only be used once
                            </li>
                            <li className="flex items-start">
                                <Icon name="CircleAlert" className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                Store backup codes securely, separate from your password
                            </li>
                            <li className="flex items-start">
                                <Icon name="CircleAlert" className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                Generate new codes immediately if you suspect they've been compromised
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ConnectedAppsContent() {
    const connectedApps = [
        {
            id: 1,
            name: "DeFi Portfolio Tracker",
            icon: "BarChart",
            connected: "Mar 15, 2023",
            permissions: ["Read account info", "View wallet balance", "View transaction history"]
        },
        {
            id: 2,
            name: "NFT Marketplace",
            icon: "Image",
            connected: "Feb 20, 2023",
            permissions: ["Read account info", "View NFT collection", "Execute transactions"]
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="AppWindow" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Connected Apps</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage third-party applications that have access to your account.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Authorized Applications</h3>
                <p className="text-sm text-muted-foreground">
                    These applications have permission to access your account information.
                </p>

                {connectedApps.length > 0 ? (
                    <div className="space-y-4 mt-4">
                        {connectedApps.map(app => (
                            <div key={app.id} className="p-4 border rounded-md">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-secondary/50 rounded-full">
                                            <Icon name={app.icon as any} className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{app.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Connected: {app.connected}
                                            </p>

                                            <div className="mt-3">
                                                <p className="text-xs font-medium mb-1">Permissions:</p>
                                                <ul className="space-y-1">
                                                    {app.permissions.map((permission, idx) => (
                                                        <li key={idx} className="text-xs text-muted-foreground flex items-center">
                                                            <Icon name="Check" className="h-3 w-3 mr-1 text-green-500" />
                                                            {permission}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Revoke Access</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center border rounded-md bg-secondary/20">
                        <Icon name="AppWindow" className="mx-auto h-8 w-8 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No connected apps</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                            You haven't authorized any third-party applications to access your account.
                        </p>
                    </div>
                )}
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Application Permissions</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-review">Require Approval For New Permissions</Label>
                            <p className="text-sm text-muted-foreground">
                                Prompt for approval when apps request additional permissions
                            </p>
                        </div>
                        <Switch id="auto-review" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="transaction-approval">Transaction Approval</Label>
                            <p className="text-sm text-muted-foreground">
                                Require explicit approval for all transactions from connected apps
                            </p>
                        </div>
                        <Switch id="transaction-approval" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-disconnect">Auto-Disconnect Inactive Apps</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically revoke access for apps not used in 90 days
                            </p>
                        </div>
                        <Switch id="auto-disconnect" />
                    </div>
                </div>
            </div>
        </div>
    );
}
