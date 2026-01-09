import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/ui/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-main" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "ANALOGY | Artificial Intelligence Agency",
  description: "Simplifying complexes. AI and software infrastructure for the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
