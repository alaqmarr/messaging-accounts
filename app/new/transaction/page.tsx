import { TransactionForm } from '@/components/admin/Transaction'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Transaction = () => {
    return (
        <div
            className='flex flex-col items-center justify-center p-5'
        >
            <p
            className='font-bold text-2xl'
            >
                Create a new transaction
            </p>
            <Separator className='mt-3 mb-3 w-full bg-black'/>
            <TransactionForm />
        </div>
    )
}

export default Transaction
