export const fetchCache = 'default-no-store';
import AccountsTable from '@/components/AccountsTable';
import Account from '@/components/admin/Account';
import Handler from '@/components/admin/Handler';
import Payee from '@/components/admin/Payee'
import PaymentMode from '@/components/admin/PaymentMode'
import Status from '@/components/admin/Status'
import { TransactionForm } from '@/components/admin/Transaction';
import TransactionsTable from '@/components/TransactionsTable';
import PaymentPage from '@/components/TransactionsTableUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import prismadb from '@/lib/db'
import { DollarSign, EyeIcon, IdCardIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


const revalidate = 60;
const HomePage = async () => {
  // const paymentModes = await prismadb.paymentMode.findMany();
  // const statuses = await prismadb.status.findMany();
  const accounts = await prismadb.accounts.findMany({
    include: {
      payee: true,
      transactions: {
        include: {
          paymentMode: true,
          status: true,
          towards: true
        }
      }
    }
  });

  const sortedAccounts = accounts.sort((a, b) => {
    return b.transactions.length - a.transactions.length
  })

  // const transactions = await prismadb.transaction.findMany({
  //   include: {
  //     towards: true,
  //     status: true,
  //     paymentMode: true
  //   }
  // });
  // const handlers = await prismadb.handlers.findMany();
  // const payee = await prismadb.payee.findMany();
  // const monthYear = await prismadb.monthYear.findMany();
  return (
    <div className='p-5 flex flex-col items-center justify-center space-y-4'>
      {/* <div className='w-full gap-x-3 gap-y-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
        <Card>
          <CardHeader
            className='w-full items-start font-bold text-2xl'
          >
            Payment Modes
          </CardHeader>
          <CardContent
            className='text-xl'
          >
            {paymentModes.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            className='w-full items-start font-bold text-2xl'
          >
            Statuses
          </CardHeader>
          <CardContent
            className='text-xl'
          >
            {statuses.length}
          </CardContent>

        </Card>


        <Card>
          <CardHeader
            className='w-full items-start font-bold text-2xl'
          >
            Accounts
          </CardHeader>
          <CardContent
            className='text-xl'
          >
            {accounts.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            className='w-full items-start font-bold text-2xl'
          >
            Transactions
          </CardHeader>
          <CardContent
            className='text-xl'
          >
            {transactions.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            className='w-full items-start font-bold text-2xl'
          >
            Handlers
          </CardHeader>
          <CardContent
            className='text-xl'
          >
            {handlers.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            className='w-full items-start font-bold text-2xl'
          >
            Payee
          </CardHeader>
          <CardContent
            className='text-xl'
          >
            {payee.length}
          </CardContent>
        </Card>

      </div> */}


      <div className='w-full flex flex-col items-center justify-center'>
        <AccountsTable accounts={sortedAccounts} />
      </div>
    </div>
  )
}

export default HomePage
