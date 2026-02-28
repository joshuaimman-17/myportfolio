import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Joshua Portfolio",
    default: "Joshua | Full Stack Developer Portfolio",
  },
  description: "Full Stack Developer specializing in modern web technologies and user-centered design.",
  keywords: ["Full Stack Developer", "Next.js", "React", "Portfolio", "Web Development"],
  authors: [{ name: "Joshua" }],
  openGraph: {
    title: "Joshua | Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in modern web technologies and user-centered design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua | Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in modern web technologies and user-centered design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <BootstrapClient />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
