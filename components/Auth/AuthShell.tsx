import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthShellProps = {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClassName?: string;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  maxWidthClassName = 'max-w-md',
}: AuthShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <div className={`w-full ${maxWidthClassName} flex flex-col items-center gap-4`}>
        <Link href="/" className="block">
          <Image
            src="/transient-app-logo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="h-auto w-50"
            priority
          />
        </Link>

        <div className="text-center">
          <h1 className="text-lg font-medium text-slate-800">{title}</h1>
          {subtitle ? <div className="mt-2 text-sm text-slate-600">{subtitle}</div> : null}
        </div>

        <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          {children}
        </div>

        {footer ? <div className="text-center text-sm text-slate-600">{footer}</div> : null}
      </div>
    </div>
  );
}
