import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";

export default function Error404() {
    return (
        <section
            className={"min-h-screen flex flex-col items-center justify-center"}
        >
            <h1 className="text-[12rem] uppercase tracking-wider text-grey-400 font-light">
                404
            </h1>

            <Button variant="secondary">
                <Link to="/app">
                    Back to Home
                </Link>
            </Button>
        </section>
    );
}
