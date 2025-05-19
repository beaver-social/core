import Chatbot from "./chat";

export default function Docs() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold"  >Docs</h1>
            <div className="fixed bottom-6 right-6">
                <Chatbot />
            </div>
        </div>
    )
}