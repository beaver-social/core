import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import Icon from "@/shared/components/Icon";
import { Slider } from "@/shared/components/ui/slider";

export function DisplayContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Monitor" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Display</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Customize the appearance of the application.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Text Size</h3>
                <p className="text-sm text-muted-foreground">
                    Adjust the size of text throughout the application.
                </p>

                <div className="space-y-4 mt-4">
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
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Theme Settings</h3>

                <div className="space-y-6">
                    <div>
                        <Label htmlFor="theme-setting">Theme</Label>
                        <select
                            id="theme-setting"
                            className="mt-2 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option>Light</option>
                            <option>Dark</option>
                            <option selected>System</option>
                        </select>
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
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Color Adjustments</h3>

                <div className="space-y-6">
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
                        <select
                            id="color-blind-type"
                            className="mt-2 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            disabled
                        >
                            <option>Protanopia (Red-Blind)</option>
                            <option>Deuteranopia (Green-Blind)</option>
                            <option>Tritanopia (Blue-Blind)</option>
                            <option>Achromatopsia (Monochromacy)</option>
                        </select>
                    </div>
                </div>

                <Button className="mt-4">Save Display Settings</Button>
            </div>
        </div>
    );
}

export function MotionContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Clock" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Motion</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Control animations and motion effects.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Animation Settings</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="reduce-motion">Reduce Motion</Label>
                            <p className="text-sm text-muted-foreground">
                                Minimize animations and motion effects
                            </p>
                        </div>
                        <Switch id="reduce-motion" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="disable-animations">Disable All Animations</Label>
                            <p className="text-sm text-muted-foreground">
                                Turn off all animations completely
                            </p>
                        </div>
                        <Switch id="disable-animations" />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Autoplay Controls</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="disable-autoplay">Disable Autoplay</Label>
                            <p className="text-sm text-muted-foreground">
                                Prevent videos from playing automatically
                            </p>
                        </div>
                        <Switch id="disable-autoplay" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="disable-gifs">Disable GIF Animations</Label>
                            <p className="text-sm text-muted-foreground">
                                Show static images instead of animated GIFs
                            </p>
                        </div>
                        <Switch id="disable-gifs" />
                    </div>
                </div>

                <Button className="mt-4">Save Motion Settings</Button>
            </div>
        </div>
    );
}

export function KeyboardContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="Keyboard" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Keyboard</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Customize keyboard navigation and shortcuts.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Keyboard Shortcuts</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="enable-shortcuts">Enable Keyboard Shortcuts</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow keyboard shortcuts for common actions
                            </p>
                        </div>
                        <Switch id="enable-shortcuts" defaultChecked />
                    </div>

                    <Button variant="outline" size="sm">View All Shortcuts</Button>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Custom Shortcuts</h3>
                <p className="text-sm text-muted-foreground">
                    Customize keyboard shortcuts for common actions.
                </p>

                <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <p className="font-medium">New Post</p>
                        <div className="flex items-center space-x-1">
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">N</kbd>
                            <button className="text-xs text-blue-500 hover:text-blue-700">Edit</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <p className="font-medium">Search</p>
                        <div className="flex items-center space-x-1">
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd>
                            <span>+</span>
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">K</kbd>
                            <button className="text-xs text-blue-500 hover:text-blue-700">Edit</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <p className="font-medium">Like Post</p>
                        <div className="flex items-center space-x-1">
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">L</kbd>
                            <button className="text-xs text-blue-500 hover:text-blue-700">Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Navigation Settings</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="keyboard-navigation">Keyboard Navigation</Label>
                            <p className="text-sm text-muted-foreground">
                                Navigate using keyboard only
                            </p>
                        </div>
                        <Switch id="keyboard-navigation" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="tab-focus">Focus Indicators</Label>
                            <p className="text-sm text-muted-foreground">
                                Show enhanced focus indicators when tabbing
                            </p>
                        </div>
                        <Switch id="tab-focus" defaultChecked />
                    </div>
                </div>

                <Button className="mt-4">Save Keyboard Settings</Button>
            </div>
        </div>
    );
}

export function ScreenReaderContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="MessageSquare" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Screen Reader</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Configure settings for screen readers and text-to-speech.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Screen Reader Support</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="screen-reader-mode">Screen Reader Optimized Mode</Label>
                            <p className="text-sm text-muted-foreground">
                                Enhance compatibility with screen readers
                            </p>
                        </div>
                        <Switch id="screen-reader-mode" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="verbose-labels">Use Descriptive Labels</Label>
                            <p className="text-sm text-muted-foreground">
                                Add more detailed descriptions for screen readers
                            </p>
                        </div>
                        <Switch id="verbose-labels" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Image Descriptions</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-alt-text">Auto-Generate Alt Text</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically generate descriptions for images without alt text
                            </p>
                        </div>
                        <Switch id="auto-alt-text" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="show-alt-text">Show Image Descriptions</Label>
                            <p className="text-sm text-muted-foreground">
                                Display alt text captions below images
                            </p>
                        </div>
                        <Switch id="show-alt-text" />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Text-to-Speech</h3>

                <div className="space-y-6">
                    <div>
                        <Label htmlFor="tts-voice">Voice</Label>
                        <select
                            id="tts-voice"
                            className="mt-2 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option selected>System Default</option>
                            <option>Female Voice 1</option>
                            <option>Male Voice 1</option>
                            <option>Female Voice 2</option>
                            <option>Male Voice 2</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tts-speed">Speech Rate</Label>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Slow</span>
                            <span className="text-sm">Fast</span>
                        </div>
                        <Slider id="tts-speed" defaultValue={[50]} max={100} step={1} />
                    </div>
                </div>

                <Button className="mt-4">Save Screen Reader Settings</Button>
            </div>
        </div>
    );
}

export function CaptionsContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <Icon name="FileText" className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Captions</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Configure caption and subtitle settings for videos.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Caption Display</h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="show-captions">Show Captions</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically show captions on videos
                            </p>
                        </div>
                        <Switch id="show-captions" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-translate-captions">Auto-Translate Captions</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically translate captions to your preferred language
                            </p>
                        </div>
                        <Switch id="auto-translate-captions" />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Caption Style</h3>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="caption-size">Font Size</Label>
                        <select
                            id="caption-size"
                            className="mt-2 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option>Small</option>
                            <option selected>Medium</option>
                            <option>Large</option>
                            <option>Extra Large</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="caption-font">Font Family</Label>
                        <select
                            id="caption-font"
                            className="mt-2 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option selected>Sans-serif</option>
                            <option>Serif</option>
                            <option>Monospace</option>
                            <option>Casual</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="caption-color">Color</Label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            <div className="h-6 bg-white border border-gray-300 rounded-md cursor-pointer"></div>
                            <div className="h-6 bg-yellow-300 rounded-md cursor-pointer"></div>
                            <div className="h-6 bg-green-300 rounded-md cursor-pointer"></div>
                            <div className="h-6 bg-blue-300 rounded-md cursor-pointer"></div>
                            <div className="h-6 bg-red-300 rounded-md cursor-pointer"></div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="caption-background">Background</Label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            <div className="h-6 bg-black rounded-md cursor-pointer"></div>
                            <div className="h-6 bg-gray-800 rounded-md cursor-pointer"></div>
                            <div className="h-6 bg-gray-500 rounded-md cursor-pointer"></div>
                            <div className="h-6 bg-transparent border border-gray-300 rounded-md cursor-pointer flex items-center justify-center">
                                <span className="text-xs">None</span>
                            </div>
                            <div className="h-6 bg-blue-900 rounded-md cursor-pointer"></div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border rounded-md mt-4 bg-gray-900">
                    <p className="text-center text-white bg-black/50 p-1 text-sm inline-block mx-auto">Caption Preview</p>
                </div>

                <Button className="mt-4">Save Caption Settings</Button>
            </div>
        </div>
    );
}