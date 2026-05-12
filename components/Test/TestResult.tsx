import { Badge, Box, Heading, HStack, Progress, Stack, Text, VStack } from '@chakra-ui/react';

type TestResultProps = {
  result: {
    id?: string | number;
    score?: number;
    passingScore?: number;
    status?: string;
    finishedAt?: string;
    questions?: Array<any>;
  };
};

export default function TestResult({ result }: TestResultProps) {
  const score = result.score ?? 0;
  return (
    <Box borderWidth="1px" borderRadius="xl" p={5} bg="white">
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Heading size="md">Test Result</Heading>
          {result.status ? <Badge colorScheme={result.status === 'PASS' ? 'green' : 'red'}>{result.status}</Badge> : null}
        </HStack>
        <Stack spacing={1}>
          <Text>Score: {score}</Text>
          {result.passingScore !== undefined ? <Text>Passing score: {result.passingScore}</Text> : null}
          {result.finishedAt ? <Text>Finished at: {result.finishedAt}</Text> : null}
        </Stack>
        <Progress value={score} max={100} colorScheme={score >= (result.passingScore || 0) ? 'green' : 'orange'} borderRadius="full" />
      </VStack>
    </Box>
  );
}
