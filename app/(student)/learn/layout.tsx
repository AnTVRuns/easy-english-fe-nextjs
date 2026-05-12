import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn - Easy English',
  description: 'Learn English lessons',
};

export default function LearnLayout({
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
