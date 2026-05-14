import Link from 'next/link';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import courseService from '@/api/course';
import type { CourseDetailResponse } from '@/types/api/course';

async function loadCourse(courseId: string): Promise<CourseDetailResponse | null> {
  try {
    return await courseService.fetchMainCourse({ id: courseId });
  } catch {
    return null;
  }
}

export default async function LearnCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await loadCourse(courseId);

  if (!course) {
    return (
      <Box maxW="5xl" mx="auto" px={4} py={12}>
        <Heading size="lg">Course not found</Heading>
        <Text color="gray.600" mt={3}>
          Không lấy được dữ liệu khóa học để bắt đầu học.
        </Text>
        <Link href={`/courses/${courseId}`}>
          <Button mt={6} colorScheme="blue">
            Back to course detail
          </Button>
        </Link>
      </Box>
    );
  }

  const sections = Array.isArray(course.sections) ? course.sections : [];

  return (
    <Box bg="gray.50" minH="100vh">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 10 }}>
        <Flex gap={6} flexDir={{ base: 'column', lg: 'row' }} align="start">
          <Box flex="1" minW={0}>
            <Text textTransform="uppercase" letterSpacing="0.2em" fontSize="sm" color="blue.600" fontWeight="bold">
              Learning mode
            </Text>
            <Heading as="h1" size="xl" mt={2}>
              {course.title}
            </Heading>
            <Text color="gray.600" mt={3}>
              Đây là khung migrate ban đầu cho luồng học. Phần lesson viewer, quiz, writing và progress tracking sẽ được nối tiếp ở phase sau.
            </Text>

            <Box mt={8} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={6} shadow="sm">
              <Heading as="h2" size="md" mb={4}>
                Course overview
              </Heading>
              <Text color="gray.700" whiteSpace="pre-wrap">
                {course.descriptionPreview || course.description || 'No overview available yet.'}
              </Text>
            </Box>

            <Box mt={8} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={6} shadow="sm">
              <Heading as="h2" size="md" mb={4}>
                Available sections
              </Heading>
              {sections.length === 0 ? (
                <Text color="gray.600">Section data will be connected once the lesson APIs are migrated.</Text>
              ) : (
                <Box display="grid" gap={3}>
                  {sections.map((section, index) => {
                    const sectionTitle =
                      typeof section === 'object' && section !== null
                        ? (section as { title?: string; name?: string }).title || (section as { title?: string; name?: string }).name || `Section ${index + 1}`
                        : `Section ${index + 1}`;
                    const sectionDescription =
                      typeof section === 'object' && section !== null
                        ? (section as { description?: string; content?: string }).description || (section as { description?: string; content?: string }).content || 'No description'
                        : String(section);

                    return (
                      <Box key={index} p={4} borderWidth="1px" borderColor="gray.200" borderRadius="xl">
                        <Text fontWeight="semibold">{sectionTitle}</Text>
                        <Text color="gray.600" mt={1}>
                          {sectionDescription}
                        </Text>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>

          <Box w={{ base: 'full', lg: '360px' }} flex="0 0 auto">
            <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="3xl" p={6} shadow="md" position="sticky" top={4}>
              <Heading as="h2" size="md">
                Learning actions
              </Heading>
              <Text color="gray.600" mt={3}>
                Progress, lesson viewer, quiz, writing, and completion tracking will live here.
              </Text>

              <Box mt={6} display="grid" gap={3}>
                <Link href={`/courses/${courseId}`}>
                  <Button colorScheme="blue" size="lg" width="full">
                    Back to course detail
                  </Button>
                </Link>
                <Button variant="outline" colorScheme="blue" size="lg" width="full" disabled>
                  Start first lesson
                </Button>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
