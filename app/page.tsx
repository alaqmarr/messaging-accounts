export const fetchCache = 'force-no-store';
import Account from '@/components/admin/Account';
import Handler from '@/components/admin/Handler';
import Payee from '@/components/admin/Payee'
import PaymentMode from '@/components/admin/PaymentMode'
import Status from '@/components/admin/Status'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import prismadb from '@/lib/db'
import React from 'react'

const HomePage = async () => {
  const paymentModes = await prismadb.paymentMode.findMany();
  const statuses = await prismadb.status.findMany();
  const accounts = await prismadb.accounts.findMany();
  const transactions = await prismadb.transaction.findMany();
  const handlers = await prismadb.handlers.findMany();
  const payee = await prismadb.payee.findMany();
  const monthYear = await prismadb.monthYear.findMany();
  return (
    <div className='p-5 flex flex-col items-center justify-center space-y-4'>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
        <Card>
          <CardHeader>
            Payment Modes
          </CardHeader>
          <CardContent>
            {paymentModes.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            Statuses
          </CardHeader>
          <CardContent>
            {statuses.length}
          </CardContent>

        </Card>


        <Card>
          <CardHeader>
            Accounts
          </CardHeader>
          <CardContent>
            {accounts.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            Transactions
          </CardHeader>
          <CardContent>
            {transactions.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            Handlers
          </CardHeader>
          <CardContent>
            {handlers.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            Payee
          </CardHeader>
          <CardContent>
            {payee.length}
          </CardContent>
        </Card>

      </div>

      <div className='flex flex-col items-center justify-center gap-y-3'>
        <PaymentMode />
        <Status />
        <Payee />
        <Handler />
        <Account/>
      </div>
    </div>
  )
}

export default HomePage
