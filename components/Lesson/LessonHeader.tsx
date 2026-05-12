import { Badge, Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';

type LessonHeaderProps = {
  title: string;
  description?: string;
  type?: string;
  duration?: number | string;
};

export default function LessonHeader({ title, description, type, duration }: LessonHeaderProps) {
  return (
    <Box borderWidth="1px" borderRadius="xl" p={4} bg="white">
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between" flexWrap="wrap">
          <Heading size="md">{title}</Heading>
          {type ? <Badge colorScheme="blue">{type}</Badge> : null}
        </HStack>
        {description ? <Text color="gray.600">{description}</Text> : null}
        {duration !== undefined ? <Text fontSize="sm" color="gray.500">Duration: {duration}</Text> : null}
      </VStack>
    </Box>
  );
}
