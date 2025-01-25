import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Toloba Messaging Accounts",
    description: "Toloba Messaging Accounts",
};

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["500"]
});

export default function ViewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/"></script>
            </head>
            <body
                className={cn(
                    poppins.className
                )}
            >
                <Toaster position="top-right" />
                {children}

            </body>
        </html>
    );
}
