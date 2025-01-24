import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import PaymentMode from './admin/PaymentMode'
import Account from './admin/Account'
import Handler from './admin/Handler'
import Payee from './admin/Payee'
import Status from './admin/Status'


const NavBar = () => {
    return (
        <div
            className='h-16 w-full flex p-5'
        >
            <Sheet
            >
                <SheetTrigger>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent
                >
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>

                            <div
                                className='flex flex-col gap-y-6'
                            >

                                <Link href='/new/transaction'>
                                    <Button
                                        variant={"secondary"} className='w-full'
                                    >
                                        <PlusCircleIcon /> New Transaction
                                    </Button>
                                </Link>
                                <PaymentMode />
                                <Status />
                                <Payee />
                                <Handler />
                                <Account />

                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>

    )
}

export default NavBar
