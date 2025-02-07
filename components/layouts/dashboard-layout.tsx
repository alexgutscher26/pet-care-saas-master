'use client';

import { ReactNode } from 'react';
import { DashboardNav } from '../dashboard/dashboard-nav';
import { DashboardSidebar } from '../dashboard/dashboard-sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <DashboardNav />
        
        {/* Page Content */}
        <main className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
