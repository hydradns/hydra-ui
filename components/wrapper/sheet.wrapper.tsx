import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { RiAddLine } from "@remixicon/react"

export function SheetWrapper({ triggerText, header, description, children }: { triggerText: string, header: string, description: string, children: React.ReactNode }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="aspect-square max-lg:p-0">
                    <RiAddLine
                        className="lg:-ms-1 opacity-40 size-5"
                        size={20}
                        aria-hidden="true"
                    />
                    <span className="max-lg:sr-only">{triggerText}</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{header}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {children}
                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
