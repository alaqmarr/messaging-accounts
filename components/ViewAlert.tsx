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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function ViewAlert({
    message,
    title,
    onConfirm,
    onCancel,
    buttonTitle
}: {
    message: string
    title: string
    buttonTitle: string
    onConfirm: () => void
    onCancel: () => void
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="secondary">
                    {buttonTitle}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
                className="max-w-[70vw] rounded-md"
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="w-full bg-slate-100"
                    >
                        Close
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
