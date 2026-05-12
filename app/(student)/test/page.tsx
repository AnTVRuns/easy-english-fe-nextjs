'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Heading, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { getAllTests } from '@/api/test';

interface Test {
  id: string;
  title: string;
  description?: string;
  durationInMilis?: number;
  passingGrade?: number;
  isDone?: boolean;
}

const fallbackTests: Test[] = [
  {
    id: 'test-1',
    title: 'Placement Test',
    description: 'Quick assessment to find your current English level.',
    durationInMilis: 30 * 60 * 1000,
    passingGrade: 70,
    isDone: false,
  },
  {
    id: 'test-2',
    title: 'Grammar Check',
    description: 'Review core grammar skills with multiple choice questions.',
    durationInMilis: 20 * 60 * 1000,
    passingGrade: 65,
    isDone: true,
  },
];

export default function TestPage() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTests = async () => {
      try {
        setIsLoading(true);
        const data = await getAllTests();
        setTests(data || []);
      } catch {
        setError(null);
        setTests(fallbackTests);
      } finally {
        setIsLoading(false);
      }
    };

    loadTests();
  }, []);

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box gap={6} display="flex" flexDirection="column">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={'150px'} borderRadius="lg" />
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box
          p={6}
          bg="red.50"
          borderRadius="lg"
          borderLeft="4px"
          borderColor="red.500"
        >
          <Heading size="md" color="red.700" mb={2}>Error</Heading>
          <Text color="red.700">{error}</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8} size="lg">Tests</Heading>

      {tests.length === 0 ? (
        <Box p={6} bg="gray.50" borderRadius="lg" textAlign="center">
          <Text color="gray.600">No tests available</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {tests.map((test) => (
            <Box
              key={test.id}
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
              onClick={() => router.push(`/test/${test.id}/preview`)}
            >
              <Heading size="sm" mb={2}>{test.title}</Heading>
              {test.description && (
                <Text fontSize="sm" color="gray.600" mb={3} className="line-clamp-2">
                  {test.description}
                </Text>
              )}
              <Box gap={1} display="flex" flexDirection="column" fontSize="xs" color="gray.500">
                <Text>Duration: {Math.floor((test.durationInMilis || 0) / 60000)} mins</Text>
                <Text>Passing Grade: {test.passingGrade ?? 0}%</Text>
                <Text>Status: {test.isDone ? '✓ Completed' : 'Not Started'}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
