import type { Metadata } from "next";
import "@/styles/globals.css";
import { appConfig } from "@/config/app";

export const metadata: Metadata = {
  title: appConfig.name,
  description: "Multi-tenant gate pass management platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
