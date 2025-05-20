import { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router";

// Import components
import DocsTree from "./components/DocsTree";
import DocsSearch from "./components/DocsSearch";
import DocsContent from "./components/DocsContent";
import MobileDocsDrawer from "./components/MobileDocsDrawer";
import { DocsNavbar } from "./components/DocsNavbar";
import Chatbot from "./components/ChatAI";

function DocRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the installation page by default
        navigate("/docs/installation", { replace: true });
    }, [navigate]);

    return null;
}

function DocPage() {
    const { docId } = useParams<{ docId: string }>();
    return <DocsContent />;
}

export default function Docs() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 relative">
            <div className="absolute w-full inset-0 opacity-20 overflow-hidden">
                <img src="/images/landing/15.jpg" alt="Background Effect" className="object-cover min-h-screen w-screen" />
            </div>


            <DocsNavbar />

            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-64 border-r border-zinc-800 sticky top-[73px] h-[calc(100vh-73px)]">
                    <div className="p-4">
                        <DocsSearch />
                    </div>
                    <DocsTree className="flex-1 mt-2" />
                </div>

                {/* Content */}
                <div className="flex-1 px-10">
                    {/* Mobile View Header */}
                    <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800">
                        <h1 className="text-xl font-bold text-zinc-200">Documentation</h1>
                        <MobileDocsDrawer />
                    </div>

                    {/* Routes */}
                    <Routes>
                        <Route path="/" element={<DocRedirect />} />
                        <Route path="/:docId" element={<DocPage />} />
                    </Routes>
                </div>
            </div>

            {/* Chatbot */}
            <div className="fixed bottom-6 right-6 z-50">
                <Chatbot />
            </div>
        </div>
    );
}
