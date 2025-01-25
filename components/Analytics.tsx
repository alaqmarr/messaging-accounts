"use client"
import * as React from "react"
import { CircleCheck, TrendingUp } from "lucide-react"
import { Cell, Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import CountUp from './CountUp';
import { IndianRupeeIcon } from 'lucide-react';

const Analytics = ({ transactions }: { transactions: Array<any> }) => {
    const totalDueAmount = transactions.reduce((acc, transaction) => {
        if (transaction.status.name.toLowerCase() !== "paid") {
            return acc + transaction.amount;
        }
        return acc;
    }, 0);

    const totalTransactions = transactions.length;
    // from the transactions I want to sort by the number of transactions of each towards, and also then I want to get the name of the account which shall be accessible by transaction.payee.name

    const towards = transactions.map(transaction => transaction.towards.name);
    const uniqueTowards = [...new Set(towards)];
    const towardsCount = uniqueTowards.map(towards => {
        const count = transactions.filter(transaction => transaction.towards.name === towards).length;
        return { towards, count };
    });

    const chartData = towardsCount.map(({ towards, count }, index) => ({
        browser: towards,
        visitors: count,
        fill: `hsl(${(index * 360) / uniqueTowards.length}, 70%, 50%)`, // Dynamically generated HSL color
    }));
    const predefinedColors = [
        "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#1ABC9C",
        "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"
    ];

    const chartConfig: ChartConfig = uniqueTowards.reduce((acc, towards, index) => {
        const hue = (index * 360) / uniqueTowards.length; // Spread hues evenly
        const saturation = 70; // Fixed saturation
        const lightness = 50; // Fixed lightness
        acc[towards.toLowerCase()] = {
            label: towards,
            color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        };
        return acc;
    }, {} as ChartConfig);




    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])
    return (
        <div
            className='w-full p-5 flex flex-col items-center justify-center gap-y-4'
        >

            <div
                className="w-full max-w-[400px] mx-auto"
            >
                {
                    totalDueAmount > 0 ? (
                        <Card
                            className='flex flex-col'
                        >
                            <CardHeader>
                                {
                                    totalDueAmount > 0 ? (
                                        <h1>Total Due Amount</h1>
                                    ) : (
                                        <h1>Fully Paid</h1>
                                    )
                                }
                            </CardHeader>
                            <CardContent
                                className='flex items-center'
                            >
                                {
                                    totalDueAmount > 0 ? (
                                        <div
                                            className="flex items-center"
                                        >
                                            <IndianRupeeIcon /> <CountUp to={totalDueAmount} className='text-xl' />
                                        </div>
                                    ) : (
                                        <p className='text-xl'>All dues are cleared</p>
                                    )
                                }
                            </CardContent>
                        </Card>
                    )

                        :

                        (
                            <div className="border-eborder rounded-lg border px-4 py-3 bg-emerald-200">
                                <p className="text-sm">
                                    <CircleCheck
                                        className="-mt-0.5 me-3 inline-flex text-emerald-500"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    All dues have been cleared.
                                </p>
                            </div>
                        )
                }
            </div>
            <div
                className="w-full max-w-[400px] mx-auto"
            >
                <Card className="flex flex-col">
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="visitors"
                                    nameKey="browser"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} /> // Apply the fill color dynamically
                                    ))}
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalVisitors.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Messages
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>



        </div>
    )
}

export default Analytics
