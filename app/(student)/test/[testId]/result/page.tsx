'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Skeleton } from '@chakra-ui/react';

interface TestResultPageProps {
  params: {
    testId: string;
  };
}

export default function TestResultPage({ params }: TestResultPageProps) {
  const { testId } = params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        setIsLoading(true);
        // TODO: Fetch test result from API
        // const data = await getTestResult(testId);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error('Failed to load result:', err);
        setIsLoading(false);
      }
    };

    loadResult();
  }, [testId]);

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box gap={6} display="flex" flexDirection="column">
          <Skeleton height="200px" width="100%" borderRadius="lg" />
          <Skeleton height="200px" width="100%" borderRadius="lg" />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box gap={6} display="flex" flexDirection="column">
        <Box p={6} bg="white" borderRadius="lg" borderWidth="1px">
          <h2>Test Result</h2>
          {/* TODO: Implement test result display with TestResult component */}
          <Box mt={4} p={4} bg="gray.50" borderRadius="lg" textAlign="center">
            <p>Test result will be displayed here...</p>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
