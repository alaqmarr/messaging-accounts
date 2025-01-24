import { Button } from '@/components/ui/button';
import prismadb from '@/lib/db';
import { DollarSign } from 'lucide-react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react'

const ViewTransaction = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const data = await prismadb.transaction.findFirst({
        where: {
            id: id
        },
        include: {
            towards: true
        }
    })

    if (!data) {
        return (
            <div
                className='flex flex-col items-center justify-center p-5'
            >
                <p
                    className='font-bold text-2xl'
                >
                    Transaction not found
                </p>
            </div>
        )
    }

    const paymentLink = `upi://pay?pa=alaqmarak0810-5@oksbi&pn=AlAqmar&tn=${encodeURI(new Date(data.date).toDateString() + " " + data.towards.name)}&am=${data?.amount}&cu=INR&url='https://toloba.alaqmar.dev/view/transaction/'${data.id}`;
    return (
        <div
            className='flex flex-col items-center justify-center p-5'
        >

            <div
                id='paymentDiv'
                className='w-full flex flex-col items-center justify-center gap-y-2'
            >
                <Link href={paymentLink}>
                    <Button className='flex items-center justify-center gap-x-2' variant='default'>
                        <DollarSign /> Pay
                    </Button>
                </Link>
                <QRCodeSVG
                    value={paymentLink}
                />
            </div>
            <p
                className='font-bold text-2xl'
            >
                {data?.message}
            </p>

            <p
                className='text-xl'
            >
                {data?.amount}
            </p>


        </div>
    )
}

export default ViewTransaction
