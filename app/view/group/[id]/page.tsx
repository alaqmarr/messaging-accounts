export const fetchCache = 'default-no-store';
import Analytics from '@/components/Analytics';
import Invoice from '@/components/Invoice';
import PaymentPage from '@/components/TransactionsTableUser';
import prismadb from '@/lib/db';
import React from 'react';

const revalidate = 0;

// Define types for clarity
type JamaatData = {
    accounts: {
        payee: { name: string; id: string };
        transactions: {
            paymentMode: { name: string; id: string; createdAt: Date; updatedAt: Date };
            status: { name: string; id: string; createdAt: Date; updatedAt: Date };
            towards: { name: string; id: string };
            amount: number;
            message: string;
        }[];
    }[];
};

type AccountData = {
    payee: { name: string; id: string };
    transactions: {
        paymentMode: { name: string; id: string; createdAt: Date; updatedAt: Date };
        status: { name: string; id: string; createdAt: Date; updatedAt: Date };
        towards: { name: string; id: string };
        amount: number;
        message: string;
    }[];
};

const page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tz: string }>;
}) => {
    try {
        // Destructure and validate params
        const { id } = await params;
        const { tz } = await searchParams;

        if (!id) {
            return <div><p>Invalid account ID</p></div>;
        }

        // Determine current month-year or use provided tz
        const date = new Date();
        const currentMonthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        const monthYearArr = tz
            ? tz.split(',').map((entry) => entry.trim())
            : [currentMonthYear];

        // Fetch data based on the provided ID
        const data = id === 'jamaat'
            ? await prismadb.payee.findUnique({
                where: { id },
                include: {
                    accounts: {
                        include: {
                            transactions: {
                                where: { monthYearId: { in: monthYearArr } },
                                include: { towards: true, status: true, paymentMode: true },
                            },
                            payee: true,
                        },
                    },
                },
            })
            : await prismadb.accounts.findUnique({
                where: { id },
                include: {
                    transactions: {
                        where: { monthYearId: { in: monthYearArr } },
                        include: { towards: true, status: true, paymentMode: true },
                    },
                    payee: true,
                },
            });

        // Handle case where no data is found
        if (!data) {
            return <div><p>Account not found</p></div>;
        }

        // Narrow type based on id
        let allTransactions: JamaatData["accounts"][0]["transactions"] | AccountData["transactions"] = [];
        let payeeName: string | undefined;

        if (id === 'jamaat' && 'accounts' in data) {
            // Jamaat case
            allTransactions = data.accounts.flatMap((account) => account.transactions);
            payeeName = data.accounts[0]?.payee?.name;
        } else if ('transactions' in data) {
            // Non-Jamaat case
            allTransactions = data.transactions;
            payeeName = data?.name;
        }

        // Handle case where no transactions exist
        if (allTransactions.length === 0) {
            return (
                <div>
                    <p>No transactions found for the specified time period.</p>
                </div>
            );
        }

        // Render PaymentPage with all transactions
        return (
            <div>

                <div
                    className='flex flex-col gap-y-4 items-center'
                >
                    <Analytics transactions={allTransactions} />
                </div>

                <div
                    className='flex flex-col gap-y-4 items-center'
                >
                    <PaymentPage
                        transactions={allTransactions}
                        payee={payeeName || 'Unknown Payee'}
                        duration={tz || currentMonthYear}
                    />
                </div>

                <Invoice transactions={allTransactions} towards={payeeName || 'Unknown Payee'} billingPeriod={tz || currentMonthYear}/>
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div><p>Something went wrong. Please try again later.</p></div>;
    }
};

export default page;
