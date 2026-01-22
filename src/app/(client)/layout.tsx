import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { images } from "../Images";

export const metadata: Metadata = {
  title: "Complaint Registeration System",
  description: "this is webapp used for Ticket managment system.",
  icons: {
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <main className="flex-1 font-mona-sans">
        <ToastContainer position="top-center" autoClose={3000} />
        {children}
      </main>
    </div>
  );
}
