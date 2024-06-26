import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import Nav from "@/app/components/Nav";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Media Bouderga",
  description: "Generated by Abdel-samade Bouderga",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Nav />
          {children}
          </TRPCReactProvider>
      </body>
    </html>
  );
}