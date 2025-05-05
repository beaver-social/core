import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/components/ui/alertdialog"

interface Props {
    className?: string
    title?: string
    description?: string
    children?: React.ReactNode
    onConfirm: () => void
}

export function AlertDialogComponent(props: Props) {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <button>
                    {props.children}
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title || "Are you sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.description || "This action is irreversible."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={props.onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
