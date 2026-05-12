import { Box, Heading, Text, VStack } from '@chakra-ui/react';

type AudioLessonProps = {
  title?: string;
  content?: string;
  contentUrl?: string;
  description?: string;
};

export default function AudioLesson({ title, content, contentUrl, description }: AudioLessonProps) {
  return (
    <VStack align="stretch" spacing={4}>
      {title ? <Heading size="sm">{title}</Heading> : null}
      {description ? <Text color="gray.600">{description}</Text> : null}
      <Box borderWidth="1px" borderRadius="xl" p={4} bg="white">
        {contentUrl ? (
          <audio controls src={contentUrl} style={{ width: '100%' }} />
        ) : (
          <Text color="gray.500">{content || 'No audio source provided'}</Text>
        )}
      </Box>
    </VStack>
  );
}
