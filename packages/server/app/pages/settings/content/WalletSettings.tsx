import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/components/ui/select";
export function ConnectedWalletsContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Wallet" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Connected Wallets</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage the wallets connected to your account. These wallets can be used for transactions, NFT management, and identity operations.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Primary Wallet</h3>

                <div className="p-4 rounded-lg border flex items-center justify-between bg-secondary/50">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="Wallet" className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">SUI Wallet</p>
                            <p className="text-sm text-muted-foreground">0x71C...93E4</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View on Explorer</Button>
                        <Button variant="ghost" size="sm">Disconnect</Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Additional Wallets</h3>
                    <Button variant="outline" size="sm">
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Connect Wallet
                    </Button>
                </div>

                <div className="space-y-3">
                    <div className="p-4 rounded-lg border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                <Icon name="Wallet" className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium">MetaMask</p>
                                <p className="text-sm text-muted-foreground">0x8bF...42A1</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">View on Explorer</Button>
                            <Button variant="ghost" size="sm">Disconnect</Button>
                        </div>
                    </div>

                    <Button className="w-full mt-2" variant="outline">
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Add Another Wallet
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function SuiBalanceContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Coins" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">SUI Balance</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            View and manage your SUI tokens across connected wallets.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h3 className="text-lg font-medium">Total Balance</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold">1,245.38</span>
                            <span className="ml-2 text-lg text-muted-foreground">SUI</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">≈ $2,490.76 USD</p>
                    </div>

                    <div className="flex gap-2">
                        <Button>
                            <Icon name="ArrowDownUp" className="mr-2 h-4 w-4" />
                            Transfer
                        </Button>
                        <Button variant="outline">
                            <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Wallet Breakdown</h3>

                <div className="space-y-3">
                    <div className="p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon name="Wallet" className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Primary Wallet</p>
                                <p className="text-sm text-muted-foreground">0x71C...93E4</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-medium">1,050.25 SUI</div>
                            <div className="text-sm text-muted-foreground">≈ $2,100.50 USD</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                <Icon name="Wallet" className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium">MetaMask</p>
                                <p className="text-sm text-muted-foreground">0x8bF...42A1</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-medium">195.13 SUI</div>
                            <div className="text-sm text-muted-foreground">≈ $390.26 USD</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Recent Transactions</h3>

                <div className="space-y-3">
                    <div className="p-4 rounded-lg border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Icon name="ArrowDown" className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="font-medium">Received</p>
                                <p className="text-sm text-muted-foreground">June 12, 2023</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-medium text-green-500">+50.00 SUI</div>
                            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">View Details</Button>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <Icon name="ArrowUp" className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                                <p className="font-medium">Sent</p>
                                <p className="text-sm text-muted-foreground">June 10, 2023</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-medium text-red-500">-15.75 SUI</div>
                            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">View Details</Button>
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="w-full">View All Transactions</Button>
            </div>
        </div>
    );
}

export function NftGalleryContent() {
    const [view, setView] = useState<'grid' | 'list'>('grid');

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-500/10 rounded-full">
                        <Icon name="Image" className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">NFT Gallery</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            View and manage your NFT collection across all connected wallets.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-medium">Your Collection</h3>

                    <div className="flex items-center gap-3">
                        <div className="bg-secondary rounded-lg p-1 flex gap-0.5">
                            <button
                                className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-background' : ''}`}
                                onClick={() => setView('grid')}
                            >
                                <Icon name="LayoutGrid" className="h-4 w-4" />
                            </button>
                            <button
                                className={`p-1.5 rounded-md ${view === 'list' ? 'bg-background' : ''}`}
                                onClick={() => setView('list')}
                            >
                                <Icon name="List" className="h-4 w-4" />
                            </button>
                        </div>

                        <select className="bg-secondary border-0 rounded-lg text-sm p-2 h-9">
                            <option>All NFTs</option>
                            <option>Identity NFTs</option>
                            <option>Collectibles</option>
                            <option>Art</option>
                        </select>
                    </div>
                </div>

                {view === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="rounded-lg border overflow-hidden bg-secondary/30">
                                <div className="aspect-square bg-secondary/50 flex items-center justify-center">
                                    <Icon name="Image" className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <div className="p-3">
                                    <div className="font-medium truncate">NFT #{item}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Collection Name</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-3 rounded-lg border">
                                <div className="h-12 w-12 rounded-md bg-secondary/50 flex items-center justify-center">
                                    <Icon name="Image" className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">NFT #{item}</div>
                                    <div className="text-xs text-muted-foreground">Collection Name</div>
                                </div>
                                <Button variant="ghost" size="sm">View</Button>
                            </div>
                        ))}
                    </div>
                )}

                <Button variant="outline" className="w-full">View All NFTs</Button>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Featured Identity NFT</h3>

                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-1/3 aspect-square rounded-lg bg-secondary/50 flex items-center justify-center">
                        <Icon name="User" className="h-12 w-12 text-muted-foreground" />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h4 className="font-medium">Social Identity #3856</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                This NFT represents your primary identity on the platform.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Token ID</span>
                                <span>0x3f8a...21cb</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Created</span>
                                <span>January 15, 2023</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Blockchain</span>
                                <span>SUI</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button variant="outline">View on Explorer</Button>
                            <Button variant="outline">Transfer Identity</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TransactionHistoryContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-500/10 rounded-full">
                        <Icon name="History" className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Transaction History</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            View your transaction history across all connected wallets.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <h3 className="text-lg font-medium">Recent Transactions</h3>

                    <div className="flex items-center gap-2">
                        <div className="w-42">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="transfers">Transfers</SelectItem>
                                    <SelectItem value="nft">NFT Transactions</SelectItem>
                                    <SelectItem value="swaps">Swaps</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-36">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Wallet" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Wallets</SelectItem>
                                    <SelectItem value="primary">Primary Wallet</SelectItem>
                                    <SelectItem value="metamask">MetaMask</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-medium text-sm">Type</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                                <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                                            <Icon name="ArrowDown" className="h-4 w-4 text-green-500" />
                                        </div>
                                        <span>Received</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm">June 12, 2023</td>
                                <td className="py-3 px-4 font-medium text-green-500">+50.00 SUI</td>
                                <td className="py-3 px-4">
                                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                                        Completed
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                                            <Icon name="ArrowUp" className="h-4 w-4 text-red-500" />
                                        </div>
                                        <span>Sent</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm">June 10, 2023</td>
                                <td className="py-3 px-4 font-medium text-red-500">-15.75 SUI</td>
                                <td className="py-3 px-4">
                                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                                        Completed
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                                            <Icon name="Image" className="h-4 w-4 text-purple-500" />
                                        </div>
                                        <span>NFT Purchase</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm">June 5, 2023</td>
                                <td className="py-3 px-4 font-medium text-red-500">-120.00 SUI</td>
                                <td className="py-3 px-4">
                                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                                        Completed
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        Showing 3 of 24 transactions
                    </div>

                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Export Transactions</h3>
                <p className="text-sm text-muted-foreground">
                    Download your transaction history for accounting or tax purposes.
                </p>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <Icon name="FileDown" className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                    <Button variant="outline">
                        <Icon name="FileDown" className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>
        </div>
    );
} 