import { Button } from "@/shared/components/ui/button"
import { Link } from "react-router"

type Props = {}

export default function TopNav({ }: Props) {
    return (
        <div className="w-full flex justify-end items-center">
            <Button variant="neon" className="">
                <Link to="/onboarding/begin">
                    Connect Identity
                </Link>
            </Button>
        </div>
    )
}