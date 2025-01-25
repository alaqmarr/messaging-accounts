import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { Button } from './ui/button';
import { EyeIcon } from 'lucide-react';
import CountUp from './CountUp';
import { ViewAlert } from './ViewAlert';

const TransactionsTable = ({ transactions }: { transactions: Array<any> }) => {
    return (
        <div
            className='max-w-[80vw] flex flex-col gap-y-2'
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Towards</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Payment Mode</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.towards.name}</TableCell>
                            <TableCell>
                                <CountUp
                                    to={transaction.amount}
                                />
                            </TableCell>
                            <TableCell>{transaction.status.name}</TableCell>
                            <TableCell>{transaction.paymentMode.name}</TableCell>
                            <TableCell>
                                <Link href={`/view/transaction/${transaction.id}`}>
                                    <Button
                                        className='w-full'
                                    >
                                        <EyeIcon /> View
                                    </Button>
                                </Link>

                                <ViewAlert
                                    title={transaction.towards.name}
                                    message={transaction.message}
                                    buttonTitle='Message'
                                    onCancel={() => { }}
                                    onConfirm={() => { }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TransactionsTable
