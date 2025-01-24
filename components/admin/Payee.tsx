"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


import toast from 'react-hot-toast'
import { Separator } from '../ui/separator'
const formSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
const Payee = () => {
    const [formState, setFormState] = useState("none")
    const api = "/api/create/payee"
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setFormState("loading")
        toast.loading("Creating payee")

        try {
            const request = await axios.post(api, values)
            if (request.status === 200) {
                setFormState("success")
                form.reset()
                toast.remove()
                toast.success(request.data.message)
            }
        } catch (error: any) {
            toast.remove()
            setFormState("error")
            toast.error(error.response.data.error)
        }
    }
    return (

        <Drawer>
            <DrawerTrigger>
                <Button variant={"secondary"} className='w-full'>
                    New Payee
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create a new Payee</DrawerTitle>
                    <Separator className="mt-3 mb-3" />
                    <DrawerDescription>



                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enter new payee</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Jamaat / Self" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className='w-full'>Submit</Button>
                            </form>
                        </Form>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Payee
