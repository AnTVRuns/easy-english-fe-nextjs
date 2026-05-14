import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Easy English - Admin',
  description: 'Admin course management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
