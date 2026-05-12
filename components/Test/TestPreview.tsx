import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';

type TestPreviewProps = {
  test: {
    id?: string | number;
    title?: string;
    description?: string;
    durationInMilis?: number;
    passingGrade?: number;
    parts?: Array<any>;
    isDone?: boolean;
  };
  onStart?: () => void;
};

export default function TestPreview({ test, onStart }: TestPreviewProps) {
  const totalQuestions = (test.parts || []).reduce((sum, part) => sum + (part.questions?.length || 0), 0);

  return (
    <Box borderWidth="1px" borderRadius="xl" p={5} bg="white">
      <VStack align="stretch" spacing={4}>
        <Heading size="md">{test.title || 'Test Preview'}</Heading>
        {test.description ? <Text color="gray.600">{test.description}</Text> : null}
        <Stack spacing={1} fontSize="sm" color="gray.600">
          <Text>Duration: {Math.floor((test.durationInMilis || 0) / 60000)} minutes</Text>
          <Text>Passing grade: {test.passingGrade ?? 0}%</Text>
          <Text>Total questions: {totalQuestions}</Text>
          <Text>Status: {test.isDone ? 'Completed' : 'Not completed'}</Text>
        </Stack>
        <HStack>
          <Button colorScheme="blue" onClick={onStart}>Start Test</Button>
        </HStack>
      </VStack>
    </Box>
  );
}
