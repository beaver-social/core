import { useState } from "react";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

export function NotificationPreferencesContent() {
    const [push, setPush] = useState(true);
    const [email, setEmail] = useState(true);
    const [newFollowers, setNewFollowers] = useState(true);
    const [mentions, setMentions] = useState(true);

    return (
        <div className="bg-card rounded-lg p-6 border space-y-6">
            <h3 className="text-lg font-medium">Notification Channels</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive notifications on your device
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setPush(!push)}
                            className={`${push ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setEmail(!email)}
                            className={`${email ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-medium pt-4">Notification Types</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="new-followers">New Followers</Label>
                        <p className="text-sm text-muted-foreground">
                            When someone follows your account
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setNewFollowers(!newFollowers)}
                            className={`${newFollowers ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="mentions">Mentions</Label>
                        <p className="text-sm text-muted-foreground">
                            When someone mentions you in a post
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setMentions(!mentions)}
                            className={`${mentions ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <Button className="mt-2">Save Preferences</Button>
        </div>
    );
} 