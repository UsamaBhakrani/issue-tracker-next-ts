import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Container, Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "issue Tracker App made with Next-Ts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme accentColor="green" appearance="light">
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
