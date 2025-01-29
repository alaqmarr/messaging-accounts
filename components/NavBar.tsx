import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HomeIcon, MenuIcon, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import PaymentMode from './admin/PaymentMode'
import Account from './admin/Account'
import Handler from './admin/Handler'
import Payee from './admin/Payee'
import Status from './admin/Status'
import { Separator } from './ui/separator'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'


const NavBar = () => {
    return (
        <div
            className='h-16 w-full flex p-5 justify-between'
        >
            <div
            className='w-full'
            >
            <Sheet
            >
                <SheetTrigger>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent
                >

                    <SheetHeader>
                        <SheetTitle>
                            Navigation
                        </SheetTitle>
                        <Separator />
                        <SheetDescription
                        >

                            <div
                                className='flex flex-col gap-y-6'
                            >
                                <Link href='/'>
                                    <Button
                                        variant={"secondary"} className='w-full'
                                    >
                                        <HomeIcon /> Home
                                    </Button>
                                </Link>
                                <Link href='/new/user'>
                                    <Button
                                        variant={"secondary"} className='w-full'
                                    >
                                        <PlusCircleIcon /> New Login Credentials
                                    </Button>
                                </Link>
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

            <div
            className='w-full flex items-center justify-end'
            >
                <SignedIn>
                    {/* Mount the UserButton component */}
                    <UserButton showName />
                </SignedIn>
                <SignedOut>
                    {/* Signed out users get sign in button */}
                    <SignInButton />
                </SignedOut>
            </div>
        </div>

    )
}

export default NavBar
