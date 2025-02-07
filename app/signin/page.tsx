import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';
import Link from 'next/link';
import { AmazonIcon, ShopifyIcon, EtsyIcon } from '@/components/icons';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
        <Image
          src="/dashboard-preview.jpg"
          alt="Dashboard preview"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex h-full flex-col justify-between p-12 text-white">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">Multi-Platform Manager</span>
            </Link>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="text-lg text-white/80">
              Sign in to continue managing your e-commerce listings across multiple platforms.
            </p>
            <div className="flex gap-4 pt-4">
              <AmazonIcon className="h-8 w-8 text-white/80" />
              <ShopifyIcon className="h-8 w-8 text-white/80" />
              <EtsyIcon className="h-8 w-8 text-white/80" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-white/60">
              &quot;The future of commerce has no boundaries.&quot;
            </p>
            <p className="text-sm text-white/40">— Multi-Platform Manager</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 lg:p-16 bg-gray-50/80">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white" aria-hidden="true">
          <div className="h-full w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <svg
              className="absolute inset-0 h-full w-full"
              width="100%"
              height="100%"
              viewBox="0 0 800 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 60L60 0M45 60L60 45M30 60L60 30M15 60L60 15M0 45L45 0M0 30L30 0M0 15L15 0"
                    stroke="rgba(59, 130, 246, 0.05)"
                    strokeWidth="1"
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        <div className="relative w-full max-w-md space-y-8">
          <div className="lg:hidden space-y-4 text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <span className="font-bold text-xl">Multi-Platform Manager</span>
            </Link>
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Sign in to continue managing your e-commerce listings.
            </p>
          </div>
          <AuthForm mode="signin" />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
