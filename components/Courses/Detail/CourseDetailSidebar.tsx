import Link from 'next/link';
import { Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import type { CourseDetailResponse } from '@/types/api/course';

export default function CourseDetailSidebar({ course, courseId }: { course: CourseDetailResponse; courseId: string }) {
  return (
    <Box
      w={{ base: 'full', lg: '360px' }}
      flex="0 0 auto"
    >
      <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="3xl" overflow="hidden" shadow="md" position="sticky" top={4}>
        <Box h="64" overflow="hidden">
          <Image
            src={course.imagePreview || course.imageUrl || '/next.svg'}
            alt={course.title || 'Course'}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
        <Stack gap={4} p={6}>
          <Box>
            <Text color="gray.500" fontSize="sm">
              Instructor
            </Text>
            <Heading as="h2" size="md" mt={1}>
              {course.owner?.fullName || 'Unknown instructor'}
            </Heading>
          </Box>

          <Box borderBottomWidth="1px" borderColor="gray.200" />

          <Box display="grid" gap={3} color="gray.700" fontSize="sm">
            <Flex justify="space-between" gap={4}>
              <Text>Students enrolled</Text>
              <Text fontWeight="semibold">{course.countStudent ?? 0}</Text>
            </Flex>
            <Flex justify="space-between" gap={4}>
              <Text>Lessons</Text>
              <Text fontWeight="semibold">{course.countSection ?? 0}</Text>
            </Flex>
            <Flex justify="space-between" gap={4}>
              <Text>Duration</Text>
              <Text fontWeight="semibold">{course.duration ?? '—'} hours</Text>
            </Flex>
            <Flex justify="space-between" gap={4}>
              <Text>Level</Text>
              <Text fontWeight="semibold">{course.level?.name || 'All levels'}</Text>
            </Flex>
          </Box>

          <Link href={`/learn/${courseId}`}>
            <Button colorScheme="blue" size="lg" width="full">
              Start learning
            </Button>
          </Link>

          <Link href="/courses">
            <Button variant="outline" colorScheme="blue" size="lg" width="full">
              Back to courses
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
