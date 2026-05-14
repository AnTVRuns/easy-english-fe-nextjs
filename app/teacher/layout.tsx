import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Easy English - Teacher',
  description: 'Teacher course management',
};

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
