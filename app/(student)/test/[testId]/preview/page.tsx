'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@chakra-ui/react';
import TestPreview from '@/components/Test/TestPreview';

interface TestPreviewPageProps {
  params: {
    testId: string;
  };
}

interface TestData {
  id: string;
  title: string;
  description?: string;
  durationInMilis?: number;
  passingGrade?: number;
  parts?: Array<unknown>;
  isDone?: boolean;
}

const fallbackTest: TestData = {
  id: 'test-1',
  title: 'Placement Test',
  description: 'Quick assessment to find your current English level.',
  durationInMilis: 30 * 60 * 1000,
  passingGrade: 70,
  parts: [],
  isDone: false,
};

export default function TestPreviewPage({ params }: TestPreviewPageProps) {
  const { testId } = params;
  const router = useRouter();
  const [test] = useState<TestData>({
    ...fallbackTest,
    id: testId,
    title: 'Placement Test Preview',
  });

  const handleStartTest = () => {
    router.push(`/test/${testId}/take`);
  };

  return (
    <Container maxW="container.md" py={8}>
      <TestPreview test={test} onStart={handleStartTest} />
    </Container>
  );
}
