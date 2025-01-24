"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"; // Importing Shadcn's Select component
import { Calendar } from "@/components/ui/calendar"; // Date picker component
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";


interface Account {
  id: string;
  name: string;
  amount: number;
  payeeId: string;
}



const formSchema = z.object({
  towardsId: z.string().min(1, "Please select an account."),
  amount: z.number().min(0.01, "Amount must be greater than zero."),
  message: z.string().min(1, "Message is required."),
  comments: z.string().optional(),
  statusId: z.string().min(1, "Status is required."),
  date: z.string().min(1, "Date is required."),
  handlerId: z.string().min(1, "Please select a handler."),
  paymentModeId: z.string().min(1, "Please select a payment mode.")
});

export function TransactionForm() {
  const [isClient, setIsClient] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [handlers, setHandlers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Wait until the component mounts to use useRouter
  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      towardsId: "",
      amount: 0,
      message: "",
      comments: "",
      statusId: "",
      date: "",
      handlerId: "",
      paymentModeId: ""
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const accountsRes = await axios.get("/api/fetch/accounts");
      const handlersRes = await axios.get("/api/fetch/handlers");
      const statusesRes = await axios.get("/api/fetch/status");
      const paymentModesRes = await axios.get("/api/fetch/payment-modes");

      setAccounts(accountsRes.data.data);
      setHandlers(handlersRes.data.data);
      setStatuses(statusesRes.data.data);
      setPaymentModes(paymentModesRes.data.data);
    };

    fetchData();
  }, []);

  const handleAccountChange = (value: string) => {
    const account = accounts.find((acc) => acc.id === value);
    setSelectedAccount(account || null);

    if (account && account.payeeId === "jamaat") {
      form.setValue("statusId", "against-bill");
      form.setValue("paymentModeId", "transfer");
    } else {
      form.setValue("statusId", "");
    }

    form.setValue("amount", account?.amount || 0);
  };

  const onSubmit = async (data: any) => {
    const date = new Date(data.date).toISOString();
    const transactionData = {
      ...data,
      date: date
    };

    try {
      const req = await axios.post("/api/create/transaction", transactionData);
      toast.loading("Submitting transaction...");
      if (req.status === 200) {
        toast.remove();
        toast.success("Transaction submitted successfully");

        form.reset();
      }
    } catch (error) {
      toast.remove();
      toast.error("Failed to submit transaction");
      console.error("Failed to submit transaction:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-2">
        {/* Account Selection */}
        <FormField
          control={form.control}
          name="towardsId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => { field.onChange(value); handleAccountChange(value); }} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {accounts.map((account: any) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="Enter amount" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comments */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter comments" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="statusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statuses.map((status: any) => (
                        <SelectItem key={status.id} value={status.id}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment Mode */}

        <FormField
          control={form.control}
          name="paymentModeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Mode</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {paymentModes.map((paymentMode: any) => (
                        <SelectItem key={paymentMode.id} value={paymentMode.id}>
                          {paymentMode.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Handler */}
        <FormField
          control={form.control}
          name="handlerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handler</FormLabel>
              <FormControl>
                <Select {...field}
                  onValueChange={(value) => field.onChange(value)} defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Handled By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {handlers.map((handler: any) => (
                        <SelectItem key={handler.id} value={handler.id}>
                          {handler.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Message Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      // Format the selected date to a string
                      const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
                      field.onChange(formattedDate);
                    }}
                    initialFocus
                  />

                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Transaction</Button>
      </form>
    </Form>
  );
}
