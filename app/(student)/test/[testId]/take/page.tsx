'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container } from '@chakra-ui/react';

interface TakeTestPageProps {
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

export default function TakeTestPage({ params }: TakeTestPageProps) {
  const { testId } = params;
  const router = useRouter();
  const [test] = useState<TestData>({
    ...fallbackTest,
    id: testId,
    title: 'Placement Test',
  });

  const handleSubmitTest = async () => {
    try {
      // TODO: Submit answers to API
      // const result = await submitTestAnswers(testId, answers);
      // router.push(`/test/${testId}/result`);
      router.push(`/test/${testId}/result`);
    } catch (err) {
      console.error('Failed to submit test:', err);
    }
  };

  return (
    <Container maxW="container.2xl" py={8}>
      <Box>
        <h1>{test.title || 'Test'}</h1>
        {/* TODO: Implement test taking UI with timer */}
        <Box mt={8} p={6} bg="gray.50" borderRadius="lg" textAlign="center">
          <p>Test taking interface coming soon...</p>
          <button
            onClick={() => handleSubmitTest()}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#06b6d4',
              color: 'white',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Submit Test
          </button>
        </Box>
      </Box>
    </Container>
  );
}
