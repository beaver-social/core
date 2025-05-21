import { useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Import components
import DocsTree from "./components/DocsTree";
import DocsSearch from "./components/DocsSearch";
import DocsContent from "./components/DocsContent";
import { DocsNavbar } from "./components/DocsNavbar";
import Chatbot from "./components/ChatAI";
import { useBeaver } from "@beaver/react";
import { Image } from "@/shared/components/Image";

function DocRedirect() {
    const navigate = useNavigate();
    const { data: docsMetadata } = useBeaver().docs.getDocs();
    const metadata = docsMetadata?.metadata || [];

    useEffect(() => {
        // Try to find the introduction document first
        const introDoc = metadata.find(doc => doc.id === 'introduction');

        if (introDoc) {
            navigate(`/docs/${introDoc.id}`, { replace: true });
            return;
        }

        // If no introduction document, find the first document from the "Getting Started" group
        const gettingStartedDoc = metadata.find(doc => doc.group === 'Getting Started');

        if (gettingStartedDoc) {
            navigate(`/docs/${gettingStartedDoc.id}`, { replace: true });
            return;
        }

        // Fallback to the first document in the metadata
        if (metadata.length > 0) {
            navigate(`/docs/${metadata[0].id}`, { replace: true });
        } else {
            // Last resort fallback if no docs are available
            navigate("/docs/introduction", { replace: true });
        }
    }, [navigate, metadata]);

    return null;
}

function DocPage() {
    const beaver = useBeaver();
    const { docId } = useParams<{ docId: string }>();
    const { data } = beaver.docs.getDocById({
        id: docId || "",
    });

    return (
        <div className="flex">
            <Helmet>
                <title>{data?.metadata?.title ? `${data?.metadata?.title} | Beaver Social Docs` : 'Documentation | Beaver Social'}</title>
                <meta name="description" content={data?.metadata?.description} />
            </Helmet>
            <DocsContent data={data} />
        </div>
    );
}

export default function Docs() {
    const beaver = useBeaver();
    const { data: docsMetadata } = beaver.docs.getDocs();

    return (
        <HelmetProvider>
            <div className="min-h-screen text-zinc-200 relative">
                <Helmet>
                    <title>Documentation | Beaver Social</title>
                    <meta name="description" content="Comprehensive documentation for Beaver Social - the Web3 Social Network Layer built on Sui Blockchain" />
                </Helmet>

                {/* Background Image */}
                <div className="absolute w-full inset-0 opacity-10 -z-10 overflow-hidden">
                    <Image src="/images/landing/15.jpg" alt="Background Effect" className="object-cover min-h-screen w-screen" />
                </div>

                <div className="sticky top-0 z-10">
                    <DocsNavbar data={docsMetadata} />
                </div>

                <div className="flex">
                    {/* Sidebar */}
                    <div className="hidden lg:flex flex-col w-64 border-r border-zinc-800 sticky top-[80px] h-[calc(100vh-80px)]">
                        <DocsTree data={docsMetadata} className="flex-1 mt-2" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-4 lg:px-10">
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
