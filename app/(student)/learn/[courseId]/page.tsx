'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Heading, Skeleton, Text } from '@chakra-ui/react';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Skeleton height="200px" borderRadius="lg" />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box gap={6} display="flex" flexDirection="column">
        <Box>
          <Heading mb={2}>Course {courseId}</Heading>
          <Text color="gray.600">Course details will be displayed here</Text>
        </Box>
      </Box>
    </Container>
  );
}
