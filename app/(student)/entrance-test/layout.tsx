import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrance Test - Easy English',
  description: 'Take the entrance test to assess your English level',
};

export default function EntranceTestLayout({
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
