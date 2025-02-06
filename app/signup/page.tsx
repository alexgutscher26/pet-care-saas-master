import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
        <Image
          src="/auth-bg.jpg"
          alt="Pet care background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex h-full flex-col justify-between p-12 text-white">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                alt="Logo"
                className="mx-auto h-10 w-auto"
                height={40}
                width={40}
                src="/images/logo.png"
                priority
              />
              <span className="font-medium text-xl">PetCare</span>
            </Link>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Join PetCare Today</h1>
            <p className="text-lg text-white/80">
              Create an account and start managing your pet&apos;s care with our AI-powered assistant.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-white/60">
              &quot;Until one has loved an animal, a part of one&apos;s soul remains unawakened.&quot;
            </p>
            <p className="text-sm text-white/40">— Anatole France</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 lg:p-16 bg-gray-50/80">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white" aria-hidden="true">
          <div className="h-full w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
                    stroke="rgba(99, 102, 241, 0.05)"
                    strokeWidth="1"
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div
              className="absolute left-1/2 top-0 -ml-[40rem] w-[80rem] opacity-30"
              aria-hidden="true"
            >
              <div className="aspect-[1400/678] w-[80rem] bg-gradient-to-br from-purple-100 opacity-20 blur-2xl" />
            </div>
            <div
              className="absolute right-1/2 bottom-0 -mr-[40rem] w-[80rem] opacity-30"
              aria-hidden="true"
            >
              <div className="aspect-[1400/678] w-[80rem] bg-gradient-to-tr from-blue-100 opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-md space-y-8">
          <div className="lg:hidden space-y-4 text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <Image
                alt="Logo"
                className="mx-auto h-10 w-auto"
                height={40}
                width={40}
                src="/images/logo.png"
                priority
              />
              <span className="font-medium text-xl">PetCare</span>
            </Link>
            <h1 className="text-3xl font-bold">Join PetCare Today</h1>
            <p className="text-gray-600">
              Create an account to get started with PetCare.
            </p>
          </div>
          <AuthForm mode="signup" />
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
