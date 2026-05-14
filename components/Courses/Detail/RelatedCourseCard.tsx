import Link from 'next/link';
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import type { CourseSummary } from '@/types/api/course';

export default function RelatedCourseCard({ course }: { course: CourseSummary }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Box
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        shadow="sm"
        transition="all 0.2s"
        _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
      >
        <Box h="40" overflow="hidden">
          <Image
            src={course.imagePreview || course.imageUrl || '/next.svg'}
            alt={course.title || 'Course'}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
        <Stack gap={2} p={4}>
          <Text fontSize="sm" color="blue.600" fontWeight="semibold">
            {course.topic?.name || 'English Course'}
          </Text>
          <Heading as="h3" size="sm" minH="2.75rem">
            {course.title}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {course.descriptionPreview || 'Related course'}
          </Text>
        </Stack>
      </Box>
    </Link>
  );
}
