import { useState } from 'react';
import PostsDemo from './components/PostsDemo';
import ProfileDemo from './components/ProfileDemo';
import AuthDemo from "./components/AuthDemo";
import DemoLayout from "./components/DemoLayout";
import WalletDemo from "./components/WalletDemo";
import { Image } from "@/shared/components/Image";
import { useGlobalUIStore } from "@/shared/stores/zustand";

export default function Demo() {
    const { demoTab, setDemoTab } = useGlobalUIStore();

    return (
        <div className="overflow-x-clip min-h-screen">
            <div className="flex min-h-screen w-full justify-center relative">
                <div className="absolute w-full inset-0 opacity-40 -z-10">
                    <Image src="/images/landing/3.jpg" alt="Background Effect" className="object-cover h-full w-full" />
                </div>

                <DemoLayout title="Beaver React SDK Demo" setActiveTab={setDemoTab} activeTab={demoTab}>
                    {demoTab === 'wallet' && <WalletDemo />}
                    {demoTab === 'auth' && <AuthDemo />}
                    {demoTab === 'posts' && <PostsDemo />}
                    {demoTab === 'profile' && <ProfileDemo />}
                </DemoLayout>
            </div>
        </div>
    );
}