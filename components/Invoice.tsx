"use client";

import { format } from "date-fns";
import React, { useRef } from "react";

const Invoice = ({transactions, towards, billingPeriod}: {
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
                            height={100}
                            width={100}
                            className="rounded"
                        />
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-lg">Toloba Ul Kulliyaat Il Mumenoon</p>
                        <p className="text-gray-500 text-sm mt-1">+ 91 123456789</p>
                    </div>
                </div>

                {/* Billing Information */}
                <div className="grid grid-cols-2 items-center mt-8">
                    <div>
                        <p className="font-bold text-gray-800">Bill to:</p>
                        <p className="text-gray-500">
                            {
                                towards
                            }
                        </p>
                    </div>
                    <div className="text-right">
                        <p>
                            <span className="font-semibold">Invoice date:</span><br/>
                            <span className="text-gray-500">
                                {/* add with day */}
                                {format(new Date(), "eeee, MMMM dd, yyyy")}
                            </span>

                        </p>
                    </div>
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
                                    <p className="text-gray-500">Laravel-based e-commerce platform.</p>
                                </td>
                                <td className="hidden sm:table-cell px-3 text-right text-sm text-gray-500">500.0</td>
                                <td className="hidden sm:table-cell px-3 text-right text-sm text-gray-500">$100.00</td>
                                <td className="px-4 text-right text-sm text-gray-500">$5,000.00</td>
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
                                    Subtotal
                                </th>
                                <td className="px-4 py-4 text-right text-sm text-gray-500">$10,500.00</td>
                            </tr>
                            <tr>
                                <th
                                    colSpan={3}
                                    className="hidden sm:table-cell px-4 py-4 text-right text-sm font-normal text-gray-500"
                                >
                                    Tax
                                </th>
                                <td className="px-4 py-4 text-right text-sm text-gray-500">$1,050.00</td>
                            </tr>
                            <tr>
                                <th
                                    colSpan={3}
                                    className="hidden sm:table-cell px-4 py-4 text-right text-sm font-normal text-gray-500"
                                >
                                    Discount
                                </th>
                                <td className="px-4 py-4 text-right text-sm text-gray-500">-10%</td>
                            </tr>
                            <tr>
                                <th
                                    colSpan={3}
                                    className="hidden sm:table-cell px-4 py-4 text-right text-sm font-normal text-gray-500"
                                >
                                    Total
                                </th>
                                <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">$9,450.00</td>
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
