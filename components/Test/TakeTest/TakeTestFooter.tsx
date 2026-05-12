import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';

type TakeTestFooterProps = {
  parts?: Array<{ id: string | number; title?: string }>;
  selectedPartId?: string | number;
  onPartClick?: (partId: string | number) => void;
  onSubmit?: () => void;
};

export default function TakeTestFooter({ parts = [], selectedPartId, onPartClick, onSubmit }: TakeTestFooterProps) {
  return (
    <Box borderWidth="1px" borderRadius="xl" p={4} bg="white">
      <VStack align="stretch" spacing={3}>
        <HStack wrap="wrap">
          {parts.map((part) => (
            <Button key={part.id} variant={part.id === selectedPartId ? 'solid' : 'outline'} onClick={() => onPartClick?.(part.id)}>
              {part.title || `Part ${part.id}`}
            </Button>
          ))}
        </HStack>
        <HStack justify="flex-end">
          <Button colorScheme="green" onClick={onSubmit}>Submit Test</Button>
        </HStack>
      </VStack>
    </Box>
  );
}
