'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Heading, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { fetchLessons } from '@/api/lesson';

interface Lesson {
  id: string;
  title: string;
  description?: string;
  type?: string;
  duration?: number;
}

const fallbackLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introduction to English',
    description: 'Basic vocabulary and greetings for beginners.',
    type: 'Text',
    duration: 15,
  },
  {
    id: 'lesson-2',
    title: 'Listening Practice',
    description: 'Improve your listening with short conversations.',
    type: 'Audio',
    duration: 20,
  },
];

export default function LearnPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLessons({ sectionId: '' });
        setLessons(data || []);
      } catch {
        setError(null);
        setLessons(fallbackLessons);
      } finally {
        setIsLoading(false);
      }
    };

    loadLessons();
  }, []);

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box gap={6} display="flex" flexDirection="column">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={'200px'} borderRadius="lg" />
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box
          p={6}
          bg="red.50"
          borderRadius="lg"
          borderLeft="4px"
          borderColor="red.500"
        >
          <Heading size="md" color="red.700" mb={2}>Error</Heading>
          <Text color="red.700">{error}</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8} size="lg">Learn</Heading>

      {lessons.length === 0 ? (
        <Box p={6} bg="gray.50" borderRadius="lg" textAlign="center">
          <Text color="gray.600">No lessons available</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {lessons.map((lesson) => (
            <Box
              key={lesson.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
              onClick={() => router.push(`/learn/course-1/${lesson.id}`)}
            >
              <Heading size="sm" mb={2}>{lesson.title}</Heading>
              {lesson.description && (
                <Text fontSize="sm" color="gray.600" mb={3} className="line-clamp-2">
                  {lesson.description}
                </Text>
              )}
              <Text fontSize="xs" color="gray.500">
                Type: {lesson.type || 'Text'} {lesson.duration && `• ${lesson.duration}m`}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
