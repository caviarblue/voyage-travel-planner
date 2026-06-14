import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Voyage — Premium Travel Planner & Journal',
  description: 'A premium Next.js travel planner, itinerary compiler, expense tracker, and memory journal.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
