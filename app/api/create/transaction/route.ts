import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const data = await req.json();
    const { towardsId, amount, message, comments, statusId, date, handlerId, paymentModeId } = data;
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    const monthYear = `${month}-${year}`;

    const monthYearData = await prismadb.monthYear.findFirst({
        where: {
            id: monthYear,
        },
    })

    if(!monthYearData){
        await prismadb.monthYear.create({
            data: {
                id: monthYear,
                month,
                year,
            },
        });
    }
    try{
        const newTransaction = await prismadb.transaction.create({
            data:{
                towardsId,
                amount,
                message,
                paymentModeId,
                comments,
                statusId,
                date,
                handlerId,
                monthYearId: monthYear
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Transaction created successfully",
            data: newTransaction,
        });
    }catch(error:any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}