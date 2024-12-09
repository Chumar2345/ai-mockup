import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Mock Interview",
  description: "Ace your next interview with confidence using AI-driven simulations.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <div className="layout">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
