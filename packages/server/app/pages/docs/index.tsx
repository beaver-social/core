import { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Import components
import DocsTree from "./components/DocsTree";
import DocsSearch from "./components/DocsSearch";
import DocsContent from "./components/DocsContent";
import MobileDocsDrawer from "./components/MobileDocsDrawer";
import { DocsNavbar } from "./components/DocsNavbar";
import Chatbot from "./components/ChatAI";
import { docItems } from "./data";

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
    const currentDoc = docItems.find(item => item.id === docId);

    return (
        <>
            <Helmet>
                <title>{currentDoc ? `${currentDoc.title} | Beaver Social Docs` : 'Documentation | Beaver Social'}</title>
                <meta name="description" content="Comprehensive documentation for Beaver Social - the Web3 Social Network Layer built on Sui Blockchain" />
            </Helmet>
            <DocsContent />
        </>
    );
}

export default function Docs() {
    return (
        <HelmetProvider>
            <div className="min-h-screen bg-zinc-950 text-zinc-200 relative">
                <Helmet>
                    <title>Documentation | Beaver Social</title>
                    <meta name="description" content="Comprehensive documentation for Beaver Social - the Web3 Social Network Layer built on Sui Blockchain" />
                </Helmet>

                <div className="absolute w-full inset-0 opacity-5 overflow-hidden">
                    <img src="/images/landing/15.jpg" alt="Background Effect" className="object-cover min-h-screen w-screen" />
                </div>

                <DocsNavbar />

                <div className="flex">
                    {/* Sidebar */}
                    <div className="hidden md:flex flex-col w-64 border-r border-zinc-800 sticky top-[80px] h-[calc(100vh-80px)]">
                        <DocsTree className="flex-1 mt-2" />

                        <div className="p-4">
                            <DocsSearch />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-4 md:px-10">
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
        </HelmetProvider>
    );
}
