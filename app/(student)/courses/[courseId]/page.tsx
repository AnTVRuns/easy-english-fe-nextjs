import Link from 'next/link';
import { Box, Button, Flex, Grid, Heading, Image, Stack, Text } from '@chakra-ui/react';
import courseService from '@/api/course';
import type { CourseDetailResponse, CourseSummary } from '@/types/api/course';

async function loadCourse(courseId: string): Promise<CourseDetailResponse | null> {
  try {
    return await courseService.fetchMainCourse({ id: courseId });
  } catch {
    return null;
  }
}

async function loadRelatedCourses(courseId: string): Promise<CourseSummary[]> {
  try {
    const response = await courseService.getRelatedCourses({
      courseId,
      numberOfCourses: 4,
      type: 'RELATED',
    });

    return response ?? [];
  } catch {
    return [];
  }
}

function RelatedCourseCard({ course }: { course: CourseSummary }) {
  return (
    <Link href={`/courses/${course.id}`} passHref legacyBehavior>
      <Box borderWidth="1px" borderColor="gray.200" borderRadius="2xl" overflow="hidden" bg="white" shadow="sm">
        <Box h="40" overflow="hidden">
          <Image src={course.imagePreview || course.imageUrl || '/next.svg'} alt={course.title || 'Course'} w="100%" h="100%" objectFit="cover" />
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

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const [course, relatedCourses] = await Promise.all([loadCourse(courseId), loadRelatedCourses(courseId)]);

  if (!course) {
    return (
      <Box maxW="5xl" mx="auto" px={4} py={12}>
        <Heading size="lg">Course not found</Heading>
        <Text color="gray.600" mt={3}>
          Không lấy được dữ liệu khóa học từ API.
        </Text>
        <Link href="/courses">
          <Button mt={6} colorScheme="blue">
            Back to courses
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 14 }}>
        <Flex justify="space-between" align={{ base: 'start', lg: 'center' }} gap={6} flexDir={{ base: 'column', lg: 'row' }}>
          <Stack gap={4} maxW="3xl">
            <Text textTransform="uppercase" letterSpacing="0.2em" fontSize="sm" color="blue.600" fontWeight="bold">
              Course detail
            </Text>
            <Heading as="h1" size="2xl">
              {course.title}
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {course.descriptionPreview || course.description || 'Trang chi tiết khóa học tối thiểu để mở đầu migrate course-commerce flow.'}
            </Text>
            <Flex gap={4} flexWrap="wrap" color="gray.600">
              <Text>{course.topic?.name || 'English'}</Text>
              <Text>•</Text>
              <Text>{course.level?.name || 'All levels'}</Text>
              <Text>•</Text>
              <Text>{course.countStudent ?? 0} students</Text>
              <Text>•</Text>
              <Text>{course.countSection ?? 0} lessons</Text>
            </Flex>
          </Stack>

          <Box w={{ base: 'full', lg: 'sm' }} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="3xl" overflow="hidden" shadow="md">
            <Box h="64" overflow="hidden">
              <Image src={course.imagePreview || course.imageUrl || '/next.svg'} alt={course.title || 'Course'} w="100%" h="100%" objectFit="cover" />
            </Box>
            <Stack gap={4} p={6}>
              <Text color="gray.500" fontSize="sm">
                Instructor
              </Text>
              <Heading as="h2" size="md">
                {course.owner?.fullName || 'Unknown instructor'}
              </Heading>
              <Box borderBottomWidth="1px" borderColor="gray.200" />
              <Text color="gray.600">
                Đây là khung migrate ban đầu, phần action enroll/cart/favourite sẽ được nối tiếp ở phase sau.
              </Text>
              <Link href="/courses">
                <Button colorScheme="blue" size="lg" width="full">
                  Back to courses
                </Button>
              </Link>
            </Stack>
          </Box>
        </Flex>

        <Box mt={12}>
          <Heading as="h2" size="lg" mb={6}>
            Related courses
          </Heading>
          {relatedCourses.length === 0 ? (
            <Box borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={6} bg="white">
              <Text color="gray.600">Related courses are not available yet.</Text>
            </Box>
          ) : (
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={6}>
              {relatedCourses.map((relatedCourse) => (
                <RelatedCourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}