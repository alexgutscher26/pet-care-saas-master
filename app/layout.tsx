'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
