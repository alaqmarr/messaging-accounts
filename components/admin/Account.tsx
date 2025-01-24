"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    payeeId: z.string().min(1, {
        message: "Select a payee",
    }),
})

const Account = () => {
    const [payee, setPayee] = useState([]);
    const payeeApi = "/api/fetch/payee";
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            payeeId: "",
        },
    })
    async function onSubmit(data: z.infer<typeof formSchema>) {
        toast.loading("Creating Account");
        try {
            const request = await axios.post("/api/create/account", data);
            if (request.status === 200) {
                form.reset();
                toast.remove();
                toast.success("Account created successfully");
            } else {
                toast.remove();
                toast.error("Error creating account");
            }
        } catch (error: any) {
            toast.remove();
            toast.error("Error creating account");
        }
    }
    useEffect(() => {
        const fetchPayee = async () => {
            try {
                const request = await axios.get(payeeApi);
                if (request.status === 200) {
                    setPayee(request.data.data);
                } else {
                    toast.error("Error fetching payee");
                }
            } catch (error) {
                console.log("Error:", error);
                toast.error("Error fetching payee");
            }
        };
        fetchPayee();
    }, []);

    return (
        <Drawer>
            <DrawerTrigger>
                <Button variant={'secondary'} className='w-full'>New Account</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create new Account</DrawerTitle>
                    <Separator className="mt-3 mb-3"/>
                    <DrawerDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-start space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enter New Account Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Jamaat" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="payeeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payee</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a payee" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        payee.map((payee: any) => (
                                                            <SelectItem key={payee.id} value={payee.id}>
                                                                {payee.name}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">Submit</Button>
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
    );
};

export default Account;
