"use client";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Navbar, Footer, Sidebar } from "@/components/navigation";
import { Provider } from "react-redux";
import { store } from "@/stores";
import { Toaster } from "@/components/ui/sonner";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n-app";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors">
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Toaster />
            <Sidebar />
            <div className="ml-[64px]">
              <Navbar />
              <main className="px-15">{children}</main>
              <Footer />
            </div>
          </Provider>
        </I18nextProvider>
      </body>
    </html>
  );
}
