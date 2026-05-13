import Link from 'next/link';
import { Box, Button, Flex, Grid, Heading, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import courseService from '@/api/course';
import type { CourseSummary } from '@/types/api/course';

async function loadFeaturedCourses(): Promise<CourseSummary[]> {
  const response = await courseService.getCourseByFilter({
    pageNumber: 0,
    size: 8,
    title: null,
    categoryIds: null,
    rating: null,
    topicId: null,
    levelId: null,
  });

  return response?.content ?? [];
}

function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      shadow="sm"
      transition="all 0.2s ease"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Box h="48" overflow="hidden">
        <Image
          src={course.imagePreview || course.imageUrl || '/next.svg'}
          alt={course.title || 'Course'}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>
      <Stack spacing={3} p={5}>
        <Text fontSize="sm" color="blue.600" fontWeight="semibold">
          {course.topic?.name || 'English Course'}
        </Text>
        <Heading as="h3" size="md" noOfLines={2} minH="3.5rem">
          {course.title}
        </Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={3} minH="4.5rem">
          {course.descriptionPreview || 'Khám phá nội dung khóa học, giáo viên và lộ trình học phù hợp.'}
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

export default async function HomePage() {
  let featuredCourses: CourseSummary[] = [];

  try {
    featuredCourses = await loadFeaturedCourses();
  } catch {
    featuredCourses = [];
  }

  return (
    <Box bg="linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" minH="100vh">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <Grid templateColumns={{ base: '1fr', lg: '1.1fr 0.9fr' }} gap={10} alignItems="center">
          <Stack spacing={6}>
            <Text textTransform="uppercase" letterSpacing="0.2em" fontSize="sm" color="blue.600" fontWeight="bold">
              Easy English
            </Text>
            <Heading as="h1" size="2xl" lineHeight="1.1">
              Bắt đầu học tiếng Anh bằng các khóa học phù hợp nhất với bạn.
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="2xl">
              Đây là bước đầu tiên của phase migrate tiếp theo: đưa trải nghiệm khám phá khóa học từ React cũ sang Next.js, rồi mới mở rộng sang chi tiết khóa học, đăng ký học và thanh toán.
            </Text>
            <Flex gap={3} flexWrap="wrap">
              <Button as="a" href="/courses" colorScheme="blue" size="lg">
                Browse courses
              </Button>
              <Button as="a" href="/login" variant="outline" colorScheme="blue" size="lg">
                Login
              </Button>
            </Flex>
          </Stack>

          <Box borderRadius="3xl" bg="white" shadow="xl" overflow="hidden" borderWidth="1px" borderColor="gray.100">
            <Box px={6} py={5} borderBottomWidth="1px" borderColor="gray.100">
              <Text fontWeight="semibold" color="gray.700">
                Featured courses
              </Text>
            </Box>
            <Box p={6}>
              {featuredCourses.length === 0 ? (
                <Stack spacing={4}>
                  <Skeleton height="110px" borderRadius="xl" />
                  <Skeleton height="24px" />
                  <Skeleton height="24px" width="70%" />
                </Stack>
              ) : (
                <Stack spacing={4}>
                  {featuredCourses.slice(0, 3).map((course) => (
                    <Flex key={course.id} gap={4} align="center" borderWidth="1px" borderColor="gray.100" borderRadius="2xl" p={3}>
                      <Box w="20" h="20" borderRadius="xl" overflow="hidden" flexShrink={0} bg="gray.100">
                        <Image src={course.imagePreview || course.imageUrl || '/next.svg'} alt={course.title || 'Course'} w="100%" h="100%" objectFit="cover" />
                      </Box>
                      <Box flex="1">
                        <Text fontWeight="semibold" noOfLines={2}>
                          {course.title}
                        </Text>
                        <Text fontSize="sm" color="gray.500" noOfLines={2}>
                          {course.topic?.name || 'English'}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
        </Grid>

        <Box mt={{ base: 12, md: 16 }}>
          <Flex justify="space-between" align="end" mb={6} gap={4} flexWrap="wrap">
            <Box>
              <Heading as="h2" size="lg">
                Popular courses
              </Heading>
              <Text color="gray.600" mt={2}>
                Các khóa học nổi bật được đẩy từ API course filter.
              </Text>
            </Box>
            <Button as="a" href="/courses" variant="outline" colorScheme="blue">
              View all
            </Button>
          </Flex>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={6}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
