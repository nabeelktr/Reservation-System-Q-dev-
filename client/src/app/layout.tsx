import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} bg-gray-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
