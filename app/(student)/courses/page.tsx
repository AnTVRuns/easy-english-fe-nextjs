import Link from 'next/link';
import { Box, Button, Flex, Grid, Heading, Image, Stack, Text } from '@chakra-ui/react';
import courseService from '@/api/course';
import type { CourseSummary } from '@/types/api/course';

async function loadCourses(): Promise<CourseSummary[]> {
  try {
    const response = await courseService.getCourseByFilter({
      pageNumber: 0,
      size: 24,
      title: null,
      categoryIds: null,
      rating: null,
      topicId: null,
      levelId: null,
    });

    return response?.content ?? [];
  } catch {
    return [];
  }
}

function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="2xl" overflow="hidden" bg="white" shadow="sm">
      <Box h="52" overflow="hidden">
        <Image src={course.imagePreview || course.imageUrl || '/next.svg'} alt={course.title || 'Course'} w="100%" h="100%" objectFit="cover" />
      </Box>
      <Stack spacing={3} p={5}>
        <Text fontSize="sm" color="blue.600" fontWeight="semibold">
          {course.topic?.name || 'English Course'}
        </Text>
        <Heading as="h3" size="md" noOfLines={2} minH="3.5rem">
          {course.title}
        </Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={3} minH="4.5rem">
          {course.descriptionPreview || 'Khóa học được hiển thị từ data nguồn course filter để chuẩn bị cho flow course detail.'}
        </Text>
        <Flex justify="space-between" color="gray.500" fontSize="sm">
          <Text>{course.countStudent ?? 0} students</Text>
          <Text>{course.countSection ?? 0} lessons</Text>
        </Flex>
        <Button as="a" href={`/courses/${course.id}`} colorScheme="blue" size="md" width="full">
          View details
        </Button>
      </Stack>
    </Box>
  );
}

export default async function CoursesPage() {
  const courses = await loadCourses();

  return (
    <Box bg="white" minH="100vh">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 14 }}>
        <Flex justify="space-between" align="end" gap={4} flexWrap="wrap" mb={8}>
          <Box>
            <Text textTransform="uppercase" letterSpacing="0.2em" fontSize="sm" color="blue.600" fontWeight="bold">
              Course discovery
            </Text>
            <Heading as="h1" size="xl" mt={2}>
              Browse all courses
            </Heading>
            <Text color="gray.600" mt={2} maxW="2xl">
              Trang này là bước tiếp theo sau home page, dùng cùng dữ liệu course filter để migrate dần search/discovery flow.
            </Text>
          </Box>
          <Button as="a" href="/" variant="outline" colorScheme="blue">
            Back home
          </Button>
        </Flex>

        {courses.length === 0 ? (
          <Box borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={8} bg="gray.50">
            <Heading as="h2" size="md">
              No courses available right now
            </Heading>
            <Text color="gray.600" mt={2}>
              The page is wired correctly, but the backend returned no course data.
            </Text>
          </Box>
        ) : (
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={6}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}