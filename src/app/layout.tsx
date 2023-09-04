"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "Next Proxy API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            {children}
          </main>
        </body>
      </SessionProvider>
    </html>
  );
}
