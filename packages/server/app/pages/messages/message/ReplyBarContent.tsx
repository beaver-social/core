import Icon from "@/shared/components/Icon"

type Props = {}

export default function ReplyBarContent({ }: Props) {
    return (
        <div className="relative p-4 border-b w-full">
            <div className="absolute flex items-center gap-3 left-7 top-1/2 transform -translate-y-1/2">
                <Icon name="ImagePlus" className="text-primary size-5" />
                <Icon name="SmilePlus" className="text-primary size-5" />
            </div>
            <input
                type="text"
                placeholder="Start a new chat"
                className="w-full pl-20 pr-4 py-2 rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute flex items-center gap-3 right-7 top-1/2 transform -translate-y-1/2">
                <Icon name="SendHorizontal" className="text-primary size-5" />
            </div>
        </div>
    )
}