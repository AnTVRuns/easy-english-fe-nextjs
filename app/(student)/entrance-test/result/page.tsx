'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, Button, SimpleGrid, Skeleton } from '@chakra-ui/react';

export default function EntranceTestResultPage() {
  interface TestResult {
    score: number;
    passingGrade: number;
    level: string;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }

  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        setIsLoading(true);
        // TODO: Fetch entrance test result from API
        // const data = await getEntranceTestResult();
        setTimeout(() => {
          setResult({
            score: 78,
            passingGrade: 70,
            level: 'Intermediate',
            totalQuestions: 50,
            correctAnswers: 39,
            incorrectAnswers: 11,
          });
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Failed to load result:', err);
        setIsLoading(false);
      }
    };

    loadResult();
  }, []);

  if (isLoading) {
    return (
      <Container maxW="container.md" py={8}>
        <Box gap={6} display="flex" flexDirection="column">
          <Skeleton height="100px" borderRadius="lg" />
          <Skeleton height="200px" borderRadius="lg" />
          <Skeleton height="200px" borderRadius="lg" />
        </Box>
      </Container>
    );
  }

  const isPassed = result && result.score >= result.passingGrade;

  return (
    <Container maxW="container.md" py={8}>
      <Box gap={6} display="flex" flexDirection="column" textAlign="center">
        <Box>
          <Heading size="xl" mb={2}>
            {isPassed ? '🎉 Congratulations!' : 'Test Completed'}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Your entrance test results
          </Text>
        </Box>

        {/* Score Card */}
        <Box
          p={8}
          bg={isPassed ? 'green.50' : 'orange.50'}
          borderRadius="lg"
          borderWidth="2px"
          borderColor={isPassed ? 'green.500' : 'orange.500'}
        >
          <Text fontSize="sm" color="gray.600" mb={2}>
            Your Score
          </Text>
          <Heading size="4xl" color={isPassed ? 'green.600' : 'orange.600'} mb={4}>
            {result?.score}%
          </Heading>
          <Text fontSize="md" color="gray.700">
            {isPassed ? 'You passed! ' : 'You need to improve. '}
            Required: {result?.passingGrade}%
          </Text>
        </Box>

        {/* Details Grid */}
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
          <Box p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="sm" color="gray.600" mb={2}>
              Level
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              {result?.level}
            </Text>
          </Box>

          <Box p={4} bg="blue.50" borderRadius="lg">
            <Text fontSize="sm" color="gray.600" mb={2}>
              Correct
            </Text>
            <Text fontWeight="bold" fontSize="lg" color="blue.600">
              {result?.correctAnswers}/{result?.totalQuestions}
            </Text>
          </Box>

          <Box p={4} bg="red.50" borderRadius="lg">
            <Text fontSize="sm" color="gray.600" mb={2}>
              Incorrect
            </Text>
            <Text fontWeight="bold" fontSize="lg" color="red.600">
              {result?.incorrectAnswers}/{result?.totalQuestions}
            </Text>
          </Box>
        </SimpleGrid>

        {/* Actions */}
        <Box gap={4} display="flex" flexDirection="column" pt={4}>
          <Button colorScheme="blue" size="lg">
            Continue to Dashboard
          </Button>
          <Button variant="outline" colorScheme="gray">
            Download Results
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
