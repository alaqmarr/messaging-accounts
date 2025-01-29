import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { Separator } from "./ui/separator"
import { IndianRupee } from "lucide-react"
import CountUp from "./CountUp"
import { ViewAlert } from "./ViewAlert"

export default function PaymentPage({ transactions, payee, duration }: { transactions: Array<any>, payee: String, duration: String }) {
    // Filter transactions with status not paid
    const notPaidTransactions = transactions.filter(transaction => transaction.status.name.toLowerCase() !== "paid");
    const totalNotPaidAmount = notPaidTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const transactionNote = encodeURIComponent(`Payment for ${payee} messages | ${duration}`);
    const upiLink = `upi://pay?pa=toloba1@idfcbank&pn=${`Toloba%20Secunderabad-${payee}`}&tn=${transactionNote}&am=${totalNotPaidAmount}&cu=INR`;

    return (
        <div className="container mx-auto p-4 space-y-8">
            {
                totalNotPaidAmount > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle
                                className="w-full text-center"
                            >Complete Payment</CardTitle>
                        </CardHeader>
                        <Separator className="mb-3" />
                        <CardContent>
                            <div className="flex flex-col items-center justify-center gap-y-2">
                                <p>
                                    Scan using any UPI app to complete payment
                                </p>
                                <QRCodeSVG value={upiLink} />
                                <div className="w-[100%] flex justify-evenly text-center items-center">
                                    <div className="w-[40%] flex flex-col">
                                        <Separator className="bg-black" />
                                    </div>
                                    <p className="w-[20%]">
                                        OR
                                    </p>
                                    <div className="w-[40%] flex flex-col">
                                        <Separator className="bg-black" />
                                    </div>
                                </div>
                                <Link href={upiLink}>
                                    <Button variant="default"><IndianRupee />Click here to pay using UPI</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )
            }

            <Card>
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Towards</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{new Date(transaction.date).toDateString()}</TableCell>
                                    <TableCell>{transaction.towards.name}</TableCell>
                                    <TableCell>
                                        {
                                            transaction.type || 'Text'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <ViewAlert
                                            title={transaction.towards.name}
                                            message={transaction.message}
                                            buttonTitle='View'
                                            onCancel={() => { }}
                                            onConfirm={() => { }}
                                        />
                                    </TableCell>
                                    <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(transaction.amount)}</TableCell>
                                    <TableCell>{transaction.status.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
