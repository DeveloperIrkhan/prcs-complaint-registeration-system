import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import { images } from "../Images";
import React, { Suspense } from "react";
import ClientHydration from "@/components/ClientHydration";
import Spinner from "@/components/Spinner/Spinner";
export const metadata: Metadata = {
  title: "Admin Panel | Complaint Registeration System",
  description: "this is admin panel used for Complaint Registeration System",
  icons: {},
  keywords: [
    "PRCS complaint registration system",
    "Red Cresent Pakistan",
    "PRCS complaint management",
    "online complaint system",
    "public complaint portal",
    "PRCS",
  ],
  authors: [{ name: "PRCS Admin" }],
  creator: "PRCS",
  publisher: "PRCS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ToastContainer autoClose={10} position="top-center" />
      <ClientHydration />
      <main>
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </main>
    </div>
  );
}
