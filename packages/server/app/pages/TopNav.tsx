import { Button } from "@/shared/components/ui/button"
import { Link } from "react-router"

type Props = {}

export default function TopNav({ }: Props) {
    return (
        <Button variant="neon" className="">
            <Link to="/onboarding/begin">
                Connect Identity
            </Link>
        </Button>
    )
}