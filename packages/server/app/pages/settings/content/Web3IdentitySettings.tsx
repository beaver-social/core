import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Icon from "@/shared/components/Icon";

export function IdentityManagementContent() {
    const [isVerified, setIsVerified] = useState(true);

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="KeySquare" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Identity Status</h3>
                        <div className="flex items-center mt-2 text-sm">
                            <Icon name="CircleCheckBig" className="h-4 w-4 mr-2 text-green-500" />
                            <span className="font-medium">Verified Identity</span>
                            <span className="ml-2 px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full text-xs">
                                DID:sui:0x3f8a...21cb
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Your identity is securely managed on the SUI blockchain. This identity is unique and represents your account.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Identity Details</h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                        <div>
                            <span className="text-sm font-medium">Identity NFT ID</span>
                            <p className="text-xs text-muted-foreground mt-1">0x3f8a...21cb</p>
                        </div>
                        <Button variant="outline" size="sm">View on Explorer</Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                        <div>
                            <span className="text-sm font-medium">Creation Date</span>
                            <p className="text-xs text-muted-foreground mt-1">January 15, 2023</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                        <div>
                            <span className="text-sm font-medium">Ownership History</span>
                            <p className="text-xs text-muted-foreground mt-1">1 transfer</p>
                        </div>
                        <Button variant="ghost" size="sm">View History</Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Linked Accounts</h3>
                <p className="text-sm text-muted-foreground">
                    Connect your identity to other platforms and services.
                </p>

                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center">
                            <Icon name="Github" className="h-5 w-5 mr-3" />
                            <span className="font-medium">GitHub</span>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center">
                            <Icon name="Twitter" className="h-5 w-5 mr-3" />
                            <span className="font-medium">Twitter</span>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-md bg-secondary/30">
                        <div className="flex items-center">
                            <Icon name="Mail" className="h-5 w-5 mr-3" />
                            <span className="font-medium">Email</span>
                            <span className="ml-2 text-xs text-muted-foreground">example@domain.com</span>
                        </div>
                        <Button variant="ghost" size="sm">Disconnect</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function IdentityTransferContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-500/10 rounded-full">
                        <Icon name="SendHorizontal" className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Identity Transfer</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Your account identity is represented as an NFT on the SUI blockchain and can be transferred to another wallet.
                            This action is permanent and will give full control of your account to the new owner.
                        </p>
                        <div className="mt-4 p-3 bg-amber-500/10 rounded-md text-sm">
                            <div className="flex items-start">
                                <Icon name="TriangleAlert" className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                                <p className="text-amber-700 dark:text-amber-400">
                                    Transferring your identity will permanently move your account to a new owner.
                                    This includes your profile, followers, posts, and all other account data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Transfer to Another Wallet</h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="recipient-address">Recipient Address</Label>
                        <input
                            id="recipient-address"
                            placeholder="0x..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <p className="text-xs text-muted-foreground">
                            Enter the SUI wallet address that will receive your identity NFT.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="transfer-reason">Reason for Transfer (Optional)</Label>
                        <textarea
                            id="transfer-reason"
                            placeholder="Explain why you're transferring this identity..."
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="pt-2">
                        <Button variant="destructive">
                            Initiate Transfer
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Transfer History</h3>

                <div className="rounded-md border">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium">Original Creation</div>
                                <div className="text-sm text-muted-foreground mt-1">January 15, 2023</div>
                            </div>
                            <div className="text-sm px-2 py-1 bg-green-500/10 text-green-600 rounded-full">
                                Created
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="text-sm text-center text-muted-foreground">
                            No transfer records found
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ZkLoginSetupContent() {
    const [isSetup, setIsSetup] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-500/10 rounded-full">
                        <Icon name="KeyRound" className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">zkLogin Setup</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            zkLogin allows you to securely authenticate with your existing accounts while maintaining privacy through zero-knowledge proofs.
                            Set up zkLogin to enable passwordless authentication with your Google, Facebook, or other OAuth providers.
                        </p>
                    </div>
                </div>
            </div>

            {isSetup ? (
                <div className="bg-card rounded-lg p-6 border space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-medium">zkLogin Enabled</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Your account is secured with zkLogin authentication.
                            </p>
                        </div>
                        <div className="p-2 bg-green-500/10 rounded-full">
                            <Icon name="CircleCheck" className="h-5 w-5 text-green-500" />
                        </div>
                    </div>

                    <div className="space-y-3 mt-4">
                        <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                            <div className="flex items-center">
                                <Icon name="Mail" className="h-5 w-5 mr-3" />
                                <div>
                                    <div className="font-medium">Google</div>
                                    <div className="text-xs text-muted-foreground">example@gmail.com</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Disconnect</Button>
                        </div>
                    </div>

                    <div className="pt-3">
                        <Button variant="outline">Add Another Provider</Button>
                    </div>
                </div>
            ) : (
                <div className="bg-card rounded-lg p-6 border space-y-4">
                    <h3 className="text-lg font-medium">Set Up zkLogin</h3>
                    <p className="text-sm text-muted-foreground">
                        Choose an authentication provider to set up zkLogin for your account.
                    </p>

                    <div className="space-y-3 pt-2">
                        <Button className="w-full justify-start" variant="outline">
                            <Icon name="Mail" className="mr-2 h-4 w-4" />
                            Continue with Google
                        </Button>

                        <Button className="w-full justify-start" variant="outline">
                            <Icon name="Facebook" className="mr-2 h-4 w-4" />
                            Continue with Facebook
                        </Button>

                        <Button className="w-full justify-start" variant="outline">
                            <Icon name="Twitter" className="mr-2 h-4 w-4" />
                            Continue with Twitter
                        </Button>

                        <Button className="w-full justify-start" variant="outline">
                            <Icon name="Github" className="mr-2 h-4 w-4" />
                            Continue with GitHub
                        </Button>
                    </div>

                    <div className="pt-4">
                        <p className="text-xs text-muted-foreground">
                            By enabling zkLogin, you're creating a secure connection between your social account and your on-chain identity
                            without revealing sensitive information on the blockchain.
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Advanced Settings</h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                            <span className="font-medium">Enable Fast Authentication</span>
                            <p className="text-xs text-muted-foreground mt-1">
                                Cache authentication tokens for faster logins
                            </p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                            <span
                                onClick={() => { }}
                                className={`translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                            <span className="font-medium">Salt Rotation</span>
                            <p className="text-xs text-muted-foreground mt-1">
                                Periodically rotate security salt for enhanced privacy
                            </p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-input transition-colors duration-200 ease-in-out focus:outline-none">
                            <span
                                onClick={() => { }}
                                className={`translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function IdentityRecoveryContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-500/10 rounded-full">
                        <Icon name="KeySquare" className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Identity Recovery</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Set up recovery methods to regain access to your web3 identity if you lose access to your primary authentication method.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Recovery Methods</h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                        <div className="flex items-center">
                            <Icon name="Mail" className="h-5 w-5 mr-3" />
                            <div>
                                <div className="font-medium">Email Recovery</div>
                                <div className="text-xs text-muted-foreground">example@domain.com</div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Change</Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center">
                            <Icon name="Smartphone" className="h-5 w-5 mr-3" />
                            <div>
                                <div className="font-medium">Phone Recovery</div>
                                <div className="text-xs text-muted-foreground">Not set up</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Set Up</Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center">
                            <Icon name="Users" className="h-5 w-5 mr-3" />
                            <div>
                                <div className="font-medium">Trusted Contacts</div>
                                <div className="text-xs text-muted-foreground">Not set up</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Set Up</Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Recovery Keys</h3>
                <p className="text-sm text-muted-foreground">
                    Generate a set of one-time use recovery keys that can be used to recover your account.
                </p>

                <div className="space-y-4">
                    <div className="p-4 border rounded-md bg-secondary/20">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Recovery Keys</h4>
                            <span className="text-xs text-muted-foreground">4/10 remaining</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                            Your recovery keys are securely encrypted. Each key can only be used once.
                        </p>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">View Keys</Button>
                            <Button variant="outline" size="sm">Generate New Keys</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Multisig Recovery</h3>
                <p className="text-sm text-muted-foreground">
                    Set up a multisig wallet as a recovery method for your identity.
                </p>

                <Button>Set Up Multisig Recovery</Button>
            </div>
        </div>
    );
}

export function IdentityPermissionsContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-500/10 rounded-full">
                        <Icon name="ShieldCheck" className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Identity Permissions</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage which applications and services have access to your web3 identity and what actions they can perform.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Connected Applications</h3>

                <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                                    <Icon name="Wallet" className="h-5 w-5 text-violet-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium">SUI Wallet</h4>
                                    <p className="text-xs text-muted-foreground mt-1">Connected May 15, 2023</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">Read Profile</span>
                                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">Post Content</span>
                                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">Manage Assets</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Revoke</Button>
                        </div>
                    </div>

                    <div className="p-4 border rounded-md">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                                    <Icon name="Package" className="h-5 w-5 text-pink-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium">NFT Marketplace</h4>
                                    <p className="text-xs text-muted-foreground mt-1">Connected June 2, 2023</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">View NFTs</span>
                                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">Transfer NFTs</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Revoke</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Permission Defaults</h3>
                <p className="text-sm text-muted-foreground">
                    Set default permission levels for new applications requesting access to your identity.
                </p>

                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                            <span className="font-medium">Auto-approve Read Permissions</span>
                            <p className="text-xs text-muted-foreground mt-1">
                                Automatically approve basic read access for new applications
                            </p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-input transition-colors duration-200 ease-in-out focus:outline-none">
                            <span
                                onClick={() => { }}
                                className={`translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                            <span className="font-medium">Require Authentication for Transfers</span>
                            <p className="text-xs text-muted-foreground mt-1">
                                Require additional authentication for asset transfers
                            </p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                            <span
                                onClick={() => { }}
                                className={`translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                            <span className="font-medium">Session Timeout</span>
                            <p className="text-xs text-muted-foreground mt-1">
                                Automatically revoke permissions after period of inactivity
                            </p>
                        </div>
                        <select
                            className="flex h-8 w-32 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="1h">1 hour</option>
                            <option value="24h">24 hours</option>
                            <option value="7d">7 days</option>
                            <option value="30d">30 days</option>
                            <option value="never">Never</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
} 