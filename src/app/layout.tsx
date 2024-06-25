import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="app">
      <body>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
