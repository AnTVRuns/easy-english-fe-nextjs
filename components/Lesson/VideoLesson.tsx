import { AspectRatio, Box, Heading, Text, VStack } from '@chakra-ui/react';

type VideoLessonProps = {
  title?: string;
  content?: string;
  contentUrl?: string;
  description?: string;
};

export default function VideoLesson({ title, content, contentUrl, description }: VideoLessonProps) {
  return (
    <VStack align="stretch" spacing={4}>
      {title ? <Heading size="sm">{title}</Heading> : null}
      {description ? <Text color="gray.600">{description}</Text> : null}
      <Box borderWidth="1px" borderRadius="xl" overflow="hidden" bg="black">
        <AspectRatio ratio={16 / 9}>
          {contentUrl ? (
            <video controls src={contentUrl} style={{ width: '100%', height: '100%' }} />
          ) : (
            <Box color="white" display="flex" alignItems="center" justifyContent="center" p={8}>
              {content || 'No video source provided'}
            </Box>
          )}
        </AspectRatio>
      </Box>
    </VStack>
  );
}
