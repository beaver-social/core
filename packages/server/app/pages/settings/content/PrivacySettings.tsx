import { useState } from "react";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

export function AudienceSettingsContent() {
    const [publicProfile, setPublicProfile] = useState(true);
    const [allowMentions, setAllowMentions] = useState(true);

    return (
        <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Profile Visibility</h3>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-muted-foreground">
                            Allow anyone to view your profile
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setPublicProfile(!publicProfile)}
                            className={`${publicProfile ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Mentions & Tags</h3>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="allow-mentions">Allow Mentions</Label>
                        <p className="text-sm text-muted-foreground">
                            Allow others to mention you in their posts
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setAllowMentions(!allowMentions)}
                            className={`${allowMentions ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function VisibilitySettingsContent() {
    const [hideReadReceipts, setHideReadReceipts] = useState(false);
    const [privateMode, setPrivateMode] = useState(false);

    return (
        <div className="bg-card rounded-lg p-6 border space-y-6">
            <h3 className="text-lg font-medium">Post Visibility</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="hide-read">Hide Read Receipts</Label>
                        <p className="text-sm text-muted-foreground">
                            Prevent others from seeing when you've viewed their posts
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-input transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setHideReadReceipts(!hideReadReceipts)}
                            className={`${hideReadReceipts ? 'translate-x-5 bg-primary' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="private-mode">Private Mode</Label>
                        <p className="text-sm text-muted-foreground">
                            Only show your posts to followers
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-input transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setPrivateMode(!privateMode)}
                            className={`${privateMode ? 'translate-x-5 bg-primary' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <Button className="mt-2">Save Changes</Button>
        </div>
    );
}