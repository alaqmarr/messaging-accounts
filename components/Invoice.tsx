"use client";

import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import React, { useRef } from "react";
import { Separator } from "./ui/separator";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Invoice = ({ transactions, towards, billingPeriod }: {
    transactions: Array<any>,
    towards: string,
    billingPeriod: string
}) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (componentRef.current) {
            // Open a new print window
            const printWindow = window.open('', '', 'width=800,height=600');

            // Write the basic HTML structure to the new window
            printWindow?.document.write('<html><head><title>Invoice</title>');

            // Inject the styles from the current document into the print window
            const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(style => {
                printWindow?.document.write(style.outerHTML);
            });

            printWindow?.document.write('</head><body>');
            printWindow?.document.write(componentRef.current.innerHTML); // Print only the content of componentRef
            printWindow?.document.write('</body></html>');

            // Close the document and trigger the print dialog
            printWindow?.document.close();
            printWindow?.print();
        }
    };


    const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalDueAmount = transactions.reduce((acc, transaction) => {
        if (transaction.status.name !== 'Paid') {
            return acc + transaction.amount;
        }
        return acc;
    }, 0);

    const upiurl = `upi://pay?pa=toloba1@idfcbank&pn=${`Toloba%20Secunderabad-${towards}`}&tn=${towards + ' | ' + billingPeriod}&am=${totalDueAmount}&cu=INR`;
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Invoice Content */}
            <div
                ref={componentRef}
                className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md"
            >
                {/* Invoice Header */}
                <div className="grid grid-cols-2 items-center">
                    <div>
                        <img
                            src="https://tolobasecunderabad.com/assets/img/hero-img.png"
                            alt="Company Logo"
                            height={150}
                            width={150}
                            className="rounded"
                        />
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-lg">Toloba Ul Kulliyaat Il Mumenoon</p>
                        <p className="text-gray-500 text-sm mt-1">+ 91 90527 73029</p>
                    </div>
                </div>

                {/* Billing Information */}
                <div className="grid grid-cols-2 items-start mt-8">
                    <div>
                        <p className="font-bold text-gray-800">Bill to:</p>
                        <p className="text-gray-500">
                            {
                                towards
                            }
                        </p>
                        <p>
                            <span className="font-semibold">Billing Period:</span><br />
                            <span className="text-gray-500">
                                {billingPeriod}
                            </span>

                        </p>
                        <p>
                            <span className="font-semibold">Invoice date:</span><br />
                            <span className="text-gray-500">
                                {/* add with day */}
                                {format(new Date(), "eeee, MMMM dd, yyyy")}
                            </span>

                        </p>

                        <Separator className="mt-3 mb-3" />
                        <p
                            className="flex flex-col items-start"
                        >
                            <p className="text-left text-sm">
                                Account Name : DAWOODI BOHRA JAMAAT TRUST SECBAD-TOLOBA<br />
                                Account Number : 10174118307<br />
                                IFSC : IDFB0080203<br />
                                Bank : IDFC FIRST, Paradise Secunderabad Branch<br />
                                SWIFT Code : IDFBINBBMUM
                            </p>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="flex flex-col items-end">
                            <span className="font-semibold">Scan to pay with UPI</span><br />
                            <span className="text-gray-500">
                                <QRCodeSVG value="https://tolobasecunderabad.com" size={150} />
                            </span>

                        </p>
                    </div>
                </div>
                <div className={`${totalDueAmount > 0 ? 'bg-orange-300' : 'bg-emerald-400'} flex flex-col items-center justify-center p-3 rounded-md mt-3`}>
                    {
                        totalDueAmount > 0 ? (
                            <p className="flex gap-x-3">
                                <AlertCircleIcon />
                                Current due is ₹ {totalDueAmount}
                            </p>
                        )
                            :
                            <p className="flex gap-x-3">
                                <CheckCircleIcon />
                                All dues have been cleared
                            </p>
                    }
                </div>
                {/* Items Table */}
                <div className="overflow-x-auto mt-8">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                                    Message
                                </th>
                                <th className="hidden sm:table-cell px-3 py-3 text-right text-sm font-semibold text-gray-900">
                                    Date
                                </th>
                                <th className="hidden sm:table-cell px-3 py-3 text-right text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.map((transaction) => (
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 text-sm">
                                            {
                                                towards === 'Jamaat' && (
                                                    <p className="font-medium text-gray-900">
                                                        {transaction.towards.name}
                                                    </p>
                                                )
                                            }
                                            <p className="text-gray-500">
                                                {transaction.message}
                                            </p>
                                        </td>
                                        <td className="hidden sm:table-cell px-3 text-right text-sm text-gray-500">
                                            {format(new Date(transaction.date), "MMMM dd, yyyy")}
                                        </td>
                                        <td className="hidden sm:table-cell px-3 text-right text-sm text-gray-500">
                                            {transaction.status.name}
                                        </td>
                                        <td className="px-4 text-right text-sm text-gray-500">
                                            ₹ {transaction.amount}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th
                                    colSpan={3}
                                    className="hidden sm:table-cell px-4 py-4 text-right text-sm font-normal text-gray-500"
                                >
                                    Total
                                </th>
                                <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                                    ₹ {totalAmount}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Print Button */}
            <div className="mt-4 text-center">
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handlePrint}
                >
                    Print Invoice
                </button>
            </div>
        </div>
    );
};

export default Invoice;
