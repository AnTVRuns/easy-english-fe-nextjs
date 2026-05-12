import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tests - Easy English',
  description: 'Take English tests',
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
