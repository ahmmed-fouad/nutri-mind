'use client';
import "../styles/globals.css";
import { ReactNode } from "react";
import { Navbar, Footer, Sidebar } from "@/components/navigation";
import { Provider } from "react-redux";
import { store } from "@/stores";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors">
        <Provider store={store}>
          <Toaster />
          <Sidebar />
          <div>
            <Navbar/>
            <main className="pl-16">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
