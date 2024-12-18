import type { Metadata } from 'next';
import './globals.css';
import ProgressBar from './components/ProgressBar';
import { inter } from './ui/fonts';
import { ToastProvider } from '@/app/ui/toast';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div id="modal-root"></div>
        <ToastProvider>
          <ProgressBar>{children}</ProgressBar>
        </ToastProvider>
      </body>
    </html>
  );
}
