'use client';

import { Bell, ChevronDown, Settings, User, LogOut, Search } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

const mockNotifications = [
  {
    id: 1,
    title: "New appointment request",
    message: "Dr. Smith has requested an appointment",
    time: "5 minutes ago"
  },
  {
    id: 2,
    title: "Vaccination reminder",
    message: "Max's vaccination is due next week",
    time: "1 hour ago"
  },
  {
    id: 3,
    title: "Medical record updated",
    message: "Your pet's medical record has been updated",
    time: "2 hours ago"
  }
];

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(value.length > 0);
  }, []);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            {mockNotifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <User className="h-6 w-6 rounded-full" />
            <span>{user?.email}</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/dashboard/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/settings">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
