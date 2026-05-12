import { Box, Heading, Text, VStack } from '@chakra-ui/react';

type TextLessonProps = {
  title?: string;
  content?: string;
  description?: string;
};

export default function TextLesson({ title, content, description }: TextLessonProps) {
  return (
    <VStack align="stretch" spacing={4}>
      {title ? <Heading size="sm">{title}</Heading> : null}
      {description ? <Text color="gray.600">{description}</Text> : null}
      <Box borderWidth="1px" borderRadius="xl" p={4} bg="white">
        <Text whiteSpace="pre-wrap">{content || 'No text content provided'}</Text>
      </Box>
    </VStack>
  );
}
