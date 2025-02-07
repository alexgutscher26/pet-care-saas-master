"use client";

import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function AmazonIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15.93 17.09c-2.71 2.01-6.64 3.08-10.02 3.08-4.74 0-9-1.76-12.23-4.69-.25-.22-.03-.53.27-.35 3.41 1.98 7.64 3.17 12 3.17 2.94 0 6.17-.61 9.15-1.88.45-.19.82.29.37.67z" />
      <path d="M16.58 16.15c-.35-.44-2.29-.21-3.16-.11-.26.03-.3-.2-.07-.37 1.54-1.09 4.08-.77 4.38-.41.3.36-.08 2.87-1.51 4.07-.22.19-.43.09-.33-.15.32-.81 1.04-2.58.69-3.03z" />
    </svg>
  );
}

export function EtsyIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.56 2C8.39 2.73 8.3 3.24 8.3 4.56v1.53H5.82v2.46h2.48v11.89h4.8V8.55h3.31l.52-2.46h-3.83V5.01c0-.7.18-1.18 1.11-1.18h2.72V1.1H13.2c-3.18 0-4.64 1.5-4.64 4.36v.63z" />
    </svg>
  );
}

export function ShopifyIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15.34 7.26c-.09-.55-.53-.83-1.09-.83s-1.03.28-1.13.83l-1.72 9.2h2.47l1.72-9.2zm-4.79 0c-.09-.55-.53-.83-1.09-.83s-1.03.28-1.13.83l-1.72 9.2h2.47l1.72-9.2zM5.76 7.26c-.09-.55-.53-.83-1.09-.83s-1.03.28-1.13.83l-1.72 9.2h2.47l1.72-9.2z" />
    </svg>
  );
}

export function SyncIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 12c0-4.4 3.6-8 8-8 3.4 0 6.3 2.1 7.4 5M22 12c0 4.4-3.6 8-8 8-3.4 0-6.3-2.1-7.4-5" />
    </svg>
  );
}

export function AnalyticsIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  );
}

export function UserIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export const Icons = {
  amazon: AmazonIcon,
  etsy: EtsyIcon,
  shopify: ShopifyIcon,
  sync: SyncIcon,
  analytics: AnalyticsIcon,
  user: UserIcon,
} as const;
