import Link from 'next/link';
import { Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import courseService from '@/api/course';
import type { CourseDetailResponse, CourseSummary } from '@/types/api/course';
import CourseDetailPanel from '@/components/Courses/Detail/CourseDetailPanel';
import CourseDetailSidebar from '@/components/Courses/Detail/CourseDetailSidebar';
import CourseDetailTabLink from '@/components/Courses/Detail/CourseDetailTabLink';
import RelatedCourseCard from '@/components/Courses/Detail/RelatedCourseCard';

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

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ tab?: string }>;
}) {
  const { courseId } = await params;
  const resolvedSearchParams = (await searchParams) || {};
  const activeTab = resolvedSearchParams.tab || 'description';
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
        <Flex gap={8} flexDir={{ base: 'column', lg: 'row' }} align="start">
          <Box flex="1" minW={0}>
            <Text textTransform="uppercase" letterSpacing="0.2em" fontSize="sm" color="blue.600" fontWeight="bold">
              Course detail
            </Text>
            <Heading as="h1" size="2xl" mt={2}>
              {course.title}
            </Heading>
            <Text color="gray.600" fontSize="lg" mt={4} maxW="4xl">
              {course.descriptionPreview || course.description || 'Trang chi tiết khóa học được migrate theo từng phần, ưu tiên đủ thông tin để người học quyết định xem tiếp hoặc bắt đầu học.'}
            </Text>

            <Flex gap={4} flexWrap="wrap" color="gray.600" mt={5}>
              <Text>{course.topic?.name || 'English'}</Text>
              <Text>•</Text>
              <Text>{course.level?.name || 'All levels'}</Text>
              <Text>•</Text>
              <Text>{course.countStudent ?? 0} students</Text>
              <Text>•</Text>
              <Text>{course.countSection ?? 0} lessons</Text>
            </Flex>

            <Box mt={8} borderBottomWidth="1px" borderColor="gray.200" display="flex" gap={1} flexWrap="wrap">
              <CourseDetailTabLink href={`/courses/${courseId}?tab=description`} active={activeTab === 'description'}>
                Description
              </CourseDetailTabLink>
              <CourseDetailTabLink href={`/courses/${courseId}?tab=curriculum`} active={activeTab === 'curriculum'}>
                Curriculum
              </CourseDetailTabLink>
              <CourseDetailTabLink href={`/courses/${courseId}?tab=faq`} active={activeTab === 'faq'}>
                FAQ
              </CourseDetailTabLink>
              <CourseDetailTabLink href={`/courses/${courseId}?tab=announcement`} active={activeTab === 'announcement'}>
                Announcement
              </CourseDetailTabLink>
              <CourseDetailTabLink href={`/courses/${courseId}?tab=reviews`} active={activeTab === 'reviews'}>
                Reviews
              </CourseDetailTabLink>
            </Box>

            <Box mt={6}>
              <CourseDetailPanel course={course} activeTab={activeTab} />
            </Box>

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

          <CourseDetailSidebar course={course} courseId={courseId} />
        </Flex>
      </Box>
    </Box>
  );
}