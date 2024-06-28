// src/app/layout.tsx
import "@/styles/globals.css";
import Nav from "@/app/components/Nav";
import { TRPCReactProvider } from "@/trpc/react";
import Provider from "@/app/components/Provider";
import { ReactNode } from "react";

export const metadata = {
  title: "Media Bouderga",
  description: "Generated by Abdel-samade Bouderga",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <Provider>
          <TRPCReactProvider>
            <Nav />
            {children}
          </TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}
