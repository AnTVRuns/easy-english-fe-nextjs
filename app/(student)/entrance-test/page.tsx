'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';

export default function EntranceTestPage() {
  const router = useRouter();

  return (
    <Container maxW="container.md" py={16}>
      <Box gap={8} display="flex" flexDirection="column" textAlign="center">
        <Box>
          <Heading size="xl" mb={4}>Entrance Test</Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Welcome to the Easy English Entrance Test. This test will assess your current English level.
          </Text>
        </Box>

        <Box bg="blue.50" p={6} borderRadius="lg" borderLeft="4px" borderColor="blue.500">
          <Heading size="md" mb={4} color="blue.700">Test Information</Heading>
          <Box gap={3} display="flex" flexDirection="column" fontSize="sm" color="gray.700">
            <Text>
              <strong>Duration:</strong> 60 minutes
            </Text>
            <Text>
              <strong>Number of questions:</strong> 50
            </Text>
            <Text>
              <strong>Question types:</strong> Multiple choice
            </Text>
            <Text>
              <strong>Passing grade:</strong> 70%
            </Text>
          </Box>
        </Box>

        <Box bg="yellow.50" p={6} borderRadius="lg" borderLeft="4px" borderColor="yellow.500">
          <Heading size="md" mb={3} color="yellow.700">Important Notes</Heading>
          <Text fontSize="sm" color="gray.700" textAlign="left">
            • Please ensure you have a stable internet connection
            <br />
            • You cannot pause the test once started
            <br />
            • You must answer all questions before submitting
            <br />
            • Answers are auto-saved every 30 seconds
          </Text>
        </Box>

        <Box gap={4} display="flex" flexDirection="column">
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => router.push('/entrance-test/test')}
          >
            Start Test
          </Button>
          <Button
            variant="outline"
            colorScheme="gray"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
