import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";
import { Slider } from "@/shared/components/ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";

export function DisplayContent() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-500/10 rounded-full">
                            <Icon name="Monitor" className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <CardTitle>Display</CardTitle>
                            <CardDescription>
                                Customize the appearance of the application.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Text Size</CardTitle>
                    <CardDescription>
                        Adjust the size of text throughout the application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">A</span>
                            <span className="text-xl">A</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} />
                    </div>

                    <div className="p-3 border rounded-md">
                        <p className="text-sm mb-2">Preview</p>
                        <p className="font-medium">This is how your text will appear</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Sample description text to demonstrate the current text size setting.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Theme Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="theme-setting">Theme</Label>
                        <Select defaultValue="system">
                            <SelectTrigger id="theme-setting" className="mt-2">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="high-contrast">High Contrast</Label>
                            <p className="text-sm text-muted-foreground">
                                Increase contrast for better visibility
                            </p>
                        </div>
                        <Switch id="high-contrast" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Color Adjustments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="color-blind">Color Blind Mode</Label>
                            <p className="text-sm text-muted-foreground">
                                Adjust colors for different types of color blindness
                            </p>
                        </div>
                        <Switch id="color-blind" />
                    </div>

                    <div>
                        <Label htmlFor="color-blind-type">Color Blind Type</Label>
                        <Select disabled>
                            <SelectTrigger id="color-blind-type" className="mt-2">
                                <SelectValue placeholder="Select color blind type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                                <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                                <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
                                <SelectItem value="achromatopsia">Achromatopsia (Monochromacy)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Save Display Settings</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export function MotionContent() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-purple-500/10 rounded-full">
                            <Icon name="Activity" className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                            <CardTitle>Motion</CardTitle>
                            <CardDescription>
                                Control animations and motion effects.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Animation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="reduce-motion">Reduce Motion</Label>
                            <p className="text-sm text-muted-foreground">
                                Minimize animations and transitions
                            </p>
                        </div>
                        <Switch id="reduce-motion" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="disable-animations">Disable Animations</Label>
                            <p className="text-sm text-muted-foreground">
                                Turn off all animations completely
                            </p>
                        </div>
                        <Switch id="disable-animations" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transition Speed</CardTitle>
                    <CardDescription>
                        Adjust how quickly elements transition between states.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Slow</span>
                            <span className="text-sm">Fast</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} />
                    </div>

                    <div className="p-3 border rounded-md">
                        <p className="text-sm mb-2">Preview</p>
                        <div className="h-20 bg-muted rounded-md flex items-center justify-center">
                            <p className="text-sm">Hover over this area to see transition effects</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Auto-Playing Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="disable-autoplay">Disable Auto-Playing Media</Label>
                            <p className="text-sm text-muted-foreground">
                                Prevent videos and GIFs from playing automatically
                            </p>
                        </div>
                        <Switch id="disable-autoplay" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="pause-animations">Pause Animations</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow pausing of animated content
                            </p>
                        </div>
                        <Switch id="pause-animations" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Save Motion Settings</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export function KeyboardContent() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-500/10 rounded-full">
                            <Icon name="Keyboard" className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <CardTitle>Keyboard Navigation</CardTitle>
                            <CardDescription>
                                Customize keyboard shortcuts and navigation options.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Keyboard Shortcuts</CardTitle>
                    <CardDescription>
                        View and customize keyboard shortcuts for common actions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                            <div>
                                <p className="font-medium">Navigate to Home</p>
                                <p className="text-sm text-muted-foreground">Go to the home page</p>
                            </div>
                            <kbd className="px-2 py-1 text-sm bg-muted rounded">Ctrl + H</kbd>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                            <div>
                                <p className="font-medium">Search</p>
                                <p className="text-sm text-muted-foreground">Open search dialog</p>
                            </div>
                            <kbd className="px-2 py-1 text-sm bg-muted rounded">Ctrl + K</kbd>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                            <div>
                                <p className="font-medium">Toggle Navigation</p>
                                <p className="text-sm text-muted-foreground">Show/hide navigation menu</p>
                            </div>
                            <kbd className="px-2 py-1 text-sm bg-muted rounded">Ctrl + M</kbd>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">Customize Shortcuts</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Focus Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="focus-indicator">Focus Indicator</Label>
                            <p className="text-sm text-muted-foreground">
                                Show visual indicator for focused elements
                            </p>
                        </div>
                        <Switch id="focus-indicator" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="skip-links">Skip Links</Label>
                            <p className="text-sm text-muted-foreground">
                                Enable skip links for main content
                            </p>
                        </div>
                        <Switch id="skip-links" defaultChecked />
                    </div>

                    <div>
                        <Label htmlFor="focus-style">Focus Style</Label>
                        <select
                            id="focus-style"
                            className="mt-2 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option>Outline</option>
                            <option>High Contrast</option>
                            <option>Custom</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sticky Keys</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="sticky-keys">Enable Sticky Keys</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow modifier keys to be pressed one at a time
                            </p>
                        </div>
                        <Switch id="sticky-keys" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="filter-keys">Enable Filter Keys</Label>
                            <p className="text-sm text-muted-foreground">
                                Ignore brief or repeated keystrokes
                            </p>
                        </div>
                        <Switch id="filter-keys" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Save Keyboard Settings</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export function ScreenReaderContent() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-orange-500/10 rounded-full">
                            <Icon name="Headphones" className="h-6 w-6 text-orange-500" />
                        </div>
                        <div>
                            <CardTitle>Screen Reader</CardTitle>
                            <CardDescription>
                                Configure screen reader settings and text-to-speech options.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Screen Reader Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="screen-reader">Enable Screen Reader Support</Label>
                            <p className="text-sm text-muted-foreground">
                                Optimize content for screen readers
                            </p>
                        </div>
                        <Switch id="screen-reader" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="aria-labels">Enhanced ARIA Labels</Label>
                            <p className="text-sm text-muted-foreground">
                                Provide detailed descriptions for interactive elements
                            </p>
                        </div>
                        <Switch id="aria-labels" defaultChecked />
                    </div>

                    <div>
                        <Label htmlFor="announcement-priority">Announcement Priority</Label>
                        <Select defaultValue="medium">
                            <SelectTrigger id="announcement-priority" className="mt-2">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Text-to-Speech</CardTitle>
                    <CardDescription>
                        Configure text-to-speech settings for content reading.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="tts-voice">Voice</Label>
                        <Select defaultValue="default">
                            <SelectTrigger id="tts-voice" className="mt-2">
                                <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="default">Default Voice</SelectItem>
                                <SelectItem value="male">Male Voice</SelectItem>
                                <SelectItem value="female">Female Voice</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="tts-rate">Speech Rate</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Slow</span>
                                <span className="text-sm">Fast</span>
                            </div>
                            <Slider defaultValue={[50]} max={100} step={1} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-read">Auto-Read Content</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically read new content when it appears
                            </p>
                        </div>
                        <Switch id="auto-read" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Image Descriptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="alt-text">Enhanced Alt Text</Label>
                            <p className="text-sm text-muted-foreground">
                                Provide detailed descriptions for images
                            </p>
                        </div>
                        <Switch id="alt-text" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="image-captions">Image Captions</Label>
                            <p className="text-sm text-muted-foreground">
                                Read image captions when available
                            </p>
                        </div>
                        <Switch id="image-captions" defaultChecked />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Save Screen Reader Settings</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export function CaptionsContent() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-500/10 rounded-full">
                            <Icon name="FileText" className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                            <CardTitle>Captions</CardTitle>
                            <CardDescription>
                                Configure caption settings for video and audio content.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Caption Display</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-captions">Auto-Captions</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically display captions for videos
                            </p>
                        </div>
                        <Switch id="auto-captions" defaultChecked />
                    </div>

                    <div>
                        <Label htmlFor="caption-position">Caption Position</Label>
                        <Select defaultValue="bottom">
                            <SelectTrigger id="caption-position" className="mt-2">
                                <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bottom">Bottom</SelectItem>
                                <SelectItem value="top">Top</SelectItem>
                                <SelectItem value="middle">Middle</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="caption-size">Caption Size</Label>
                        <Select defaultValue="medium">
                            <SelectTrigger id="caption-size" className="mt-2">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Caption Style</CardTitle>
                    <CardDescription>
                        Customize the appearance of captions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="caption-font">Font</Label>
                        <Select defaultValue="arial">
                            <SelectTrigger id="caption-font" className="mt-2">
                                <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="arial">Arial</SelectItem>
                                <SelectItem value="helvetica">Helvetica</SelectItem>
                                <SelectItem value="verdana">Verdana</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="caption-color">Text Color</Label>
                        <Select defaultValue="white">
                            <SelectTrigger id="caption-color" className="mt-2">
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="yellow">Yellow</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="caption-background">Background</Label>
                            <p className="text-sm text-muted-foreground">
                                Add a background to improve readability
                            </p>
                        </div>
                        <Switch id="caption-background" defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Language Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="caption-language">Primary Language</Label>
                        <Select defaultValue="english">
                            <SelectTrigger id="caption-language" className="mt-2">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="german">German</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-translate">Auto-Translate</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically translate captions to your preferred language
                            </p>
                        </div>
                        <Switch id="auto-translate" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Save Caption Settings</Button>
                </CardFooter>
            </Card>
        </div>
    );
}