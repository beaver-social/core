import Icon from "@/shared/components/Icon";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

export function UsernameSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <h3 className="text-lg font-medium">Username</h3>
            <p className="text-sm text-muted-foreground">
                Your username is unique and appears in your profile URL. It can contain only letters, numbers, and underscores, with no spaces.
            </p>
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <input
                    id="username"
                    placeholder="@username"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button className="mt-4">Update Username</Button>
        </div>
    );
}

export function EmailSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">
                Your email is used for authentication and notifications.
            </p>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <input
                    id="email"
                    placeholder="yourname@example.com"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button className="mt-4">Update Email</Button>
        </div>
    );
}

export function PhoneSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <h3 className="text-lg font-medium">Phone</h3>
            <p className="text-sm text-muted-foreground">
                Your phone number is used for authentication and notifications. You can add multiple phone numbers.
            </p>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <input
                    id="phone"
                    placeholder="123-456-7890"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button className="mt-4">Add Phone Number</Button>
        </div>
    );
}

export function ProfileSettingsContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Profile Photo</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                        <Icon name="User" className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="space-x-2">
                        <Button variant="outline" size="sm">Upload Photo</Button>
                        <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid gap-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <input
                            id="full-name"
                            placeholder="Your full name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about yourself"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <input
                            id="location"
                            placeholder="Your location"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <input
                            id="website"
                            placeholder="Your website URL"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
            </div>
        </div>
    );
}

export function VerificationSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-full bg-blue-500/10">
                    <Icon name="BadgeCheck" className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-lg font-medium">Account Verification</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Verification helps users know they're interacting with authentic accounts.
                    </p>
                </div>
            </div>

            <div className="pl-12 space-y-4 mt-4">
                <div className="space-y-2">
                    <h4 className="font-medium">Verification Status</h4>
                    <p className="text-sm bg-secondary p-3 rounded-md inline-block">
                        Not verified
                    </p>
                </div>

                <Button>Request Verification</Button>
            </div>
        </div>
    );
}