import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['300', '400', '500'] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'For Khushboo 💌',
  description: 'A little journey, written with love.',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} bg-white text-gray-800 transition-colors duration-700`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
