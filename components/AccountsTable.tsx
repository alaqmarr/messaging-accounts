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

const AccountsTable = ({ accounts }: { accounts: Array<any> }) => {
    return (
        <div
            className='max-w-[80vw] flex flex-col gap-y-2'
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Payee</TableCell>
                        <TableCell>Transactions</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {accounts.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.name}</TableCell>
                            <TableCell>{transaction.payee.name}</TableCell>
                            <TableCell>
                                <CountUp
                                    to={transaction.transactions.length}
                                />
                            </TableCell>
                            <TableCell>
                                <Link href={`/view/group/${transaction.id}`}>
                                    <Button
                                        className='w-full'
                                    >
                                        <EyeIcon /> View
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AccountsTable
