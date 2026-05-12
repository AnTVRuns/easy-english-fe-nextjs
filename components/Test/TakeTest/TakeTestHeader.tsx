import { Box, Button, HStack, Progress, Text, VStack } from '@chakra-ui/react';

type TakeTestHeaderProps = {
  title?: string;
  timeLeft?: string;
  progress?: number;
  onSubmit?: () => void;
};

export default function TakeTestHeader({ title, timeLeft, progress = 0, onSubmit }: TakeTestHeaderProps) {
  return (
    <Box borderWidth="1px" borderRadius="xl" p={4} bg="white" position="sticky" top={0} zIndex={1}>
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="semibold">{title || 'Take Test'}</Text>
          <Text fontSize="sm" color="gray.600">{timeLeft || '00:00'}</Text>
        </HStack>
        <Progress value={progress} colorScheme="blue" borderRadius="full" />
        <HStack justify="flex-end">
          <Button colorScheme="blue" onClick={onSubmit}>Submit</Button>
        </HStack>
      </VStack>
    </Box>
  );
}
