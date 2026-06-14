import "./globals.css";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "Voyage – Travel Planner",
  description: "Plan your trips with style",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
