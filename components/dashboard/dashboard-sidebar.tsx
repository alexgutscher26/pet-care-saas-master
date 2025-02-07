'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ListChecks,
  BarChart2,
  MessageSquare,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const sidebarLinks = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Inventory',
    icon: Package,
    href: '/dashboard/inventory',
  },
  {
    title: 'Listings',
    icon: ListChecks,
    href: '/dashboard/listings',
  },
  {
    title: 'Analytics',
    icon: BarChart2,
    href: '/dashboard/analytics',
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    href: '/dashboard/messages',
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
            <span className="text-sm font-bold text-white">RL</span>
          </div>
          <span className="text-sm font-medium">ResellersLab</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex h-[calc(100vh-3.5rem)] flex-col justify-between py-2">
        <nav className="space-y-1 px-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="space-y-1 px-2">
          <Link
            href="/help"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </Link>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
