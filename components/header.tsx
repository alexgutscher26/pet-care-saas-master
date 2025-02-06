'use client';

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            alt="Logo"
            className="h-8 w-8"
            height={32}
            width={32}
            src="/images/logo.png"
            priority
          />
          <span className="font-medium">PetCare</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleGetStarted}
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </nav>
      </div>
    </header>
  )
}
