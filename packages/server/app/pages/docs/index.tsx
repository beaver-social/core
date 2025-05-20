import { useState, useEffect } from "react";
import { useGlobalUI } from "@/shared/hooks/useGlobalUI";

// Import components
import DocsTree from "./components/DocsTree";
import DocsSearch from "./components/DocsSearch";
import DocsContent from "./components/DocsContent";
import MobileDocsDrawer from "./components/MobileDocsDrawer";
import Chatbot from "./components/ChatAI";

export default function Docs() {
    const [selectedDoc, setSelectedDoc] = useState("installation");

    return (
        <div className="flex">
            <div className="hidden md:flex flex-col border-r sticky top-0 h-screen">
                <div className="p-4">
                    <DocsSearch onSelectDoc={setSelectedDoc} />
                </div>
                <DocsTree
                    selectedDoc={selectedDoc}
                    onSelectDoc={setSelectedDoc}
                    className="flex-1 mt-2"
                />
                <div className="fixed bottom-6 right-6">
                    <Chatbot />
                </div>
            </div>

            <div className="px-8">
                {/* Desktop & Tablet View */}
                <div className="hidden md:block">
                    <DocsContent selectedDoc={selectedDoc} />
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h1 className="text-xl font-bold">Documentation</h1>
                        <MobileDocsDrawer
                            selectedDoc={selectedDoc}
                            onSelectDoc={setSelectedDoc}
                        />
                    </div>
                    <DocsContent selectedDoc={selectedDoc} />
                </div>
            </div>
        </div>
    );
}
