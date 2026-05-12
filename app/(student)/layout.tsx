import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Easy English - Student',
  description: 'Learn and practice English',
};

export default function StudentLayout({
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
