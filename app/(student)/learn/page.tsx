'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Badge, Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { getCurUser } from '@/api/auth';
import courseService from '@/api/course';
import type { CourseSummary } from '@/types/api/course';

const COURSE_FILTER = {
  pageNumber: 0,
  size: 12,
  title: null,
  categoryIds: null,
  rating: null,
  topicId: null,
  levelId: null,
};

export default function LearnPage() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [userLabel, setUserLabel] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLearnPage = async () => {
      setLoading(true);
      setError(null);

      try {
        const [currentUser, enrolledCourses, fallbackCourses] = await Promise.all([
          getCurUser().catch(() => null),
          courseService.getEnrollCourse(COURSE_FILTER).catch(() => null),
          courseService.getCourseByFilter(COURSE_FILTER).catch(() => null),
        ]);

        if (!isMounted) {
          return;
        }

        setUserLabel(currentUser?.fullName || currentUser?.username || currentUser?.email || 'Student');

        const nextCourses = enrolledCourses?.content?.length
          ? enrolledCourses.content
          : fallbackCourses?.content ?? [];

        setCourses(nextCourses);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Unable to load learning courses');
        setCourses([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLearnPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const cardButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '44px',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    fontWeight: 600,
    textDecoration: 'none',
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="7xl" py={{ base: 8, md: 12 }}>
        <Box mb={8} display="flex" flexDirection="column" gap={4}>
          <Badge alignSelf="start" colorScheme="blue" px={3} py={1} borderRadius="full">
            Student learning
          </Badge>
          <Heading size="xl">Welcome back, {userLabel}</Heading>
          <Text color="gray.600" maxW="3xl">
            Continue the courses you already enrolled in, or open a course detail page to inspect the curriculum first.
          </Text>
        </Box>

        {loading ? (
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
            {[1, 2, 3].map((item) => (
              <Box key={item} borderWidth="1px" borderColor="gray.200" borderRadius="3xl" bg="white" p={6}>
                <Box display="flex" flexDirection="column" gap={4}>
                  <Box h="180px" borderRadius="2xl" bg="gray.200" />
                  <Box h="24px" w="65%" bg="gray.200" borderRadius="md" />
                  <Box h="18px" w="90%" bg="gray.100" borderRadius="md" />
                  <Box h="18px" w="75%" bg="gray.100" borderRadius="md" />
                </Box>
              </Box>
            ))}
          </Box>
        ) : error ? (
          <Box borderWidth="1px" borderColor="red.200" borderRadius="3xl" bg="red.50" p={6}>
            <Heading size="md" color="red.700" mb={2}>
              Failed to load courses
            </Heading>
            <Text color="red.700">{error}</Text>
          </Box>
        ) : (
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
            {courses.length === 0 ? (
              <Box borderWidth="1px" borderColor="gray.200" borderRadius="3xl" bg="white" p={8} shadow="sm" gridColumn={{ base: '1', xl: '1 / -1' }}>
                <Heading size="md" mb={3}>
                  No courses yet
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  You do not have any enrolled courses right now. Browse available courses and start learning.
                </Text>
                <Flex gap={3} mt={6} flexWrap="wrap">
                  <Link href="/courses">
                    <Box as="span" bg="blue.600" color="white" style={cardButtonStyle}>
                      Browse courses
                    </Box>
                  </Link>
                  <Link href="/">
                    <Box as="span" borderWidth="1px" borderColor="blue.500" color="blue.600" style={cardButtonStyle}>
                      Home
                    </Box>
                  </Link>
                </Flex>
              </Box>
            ) : null}
            {courses.map((course) => (
              <Box
                key={course.id}
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="3xl"
                bg="white"
                overflow="hidden"
                shadow="sm"
                transition="all 0.2s ease"
                _hover={{ transform: 'translateY(-3px)', shadow: 'lg' }}
              >
                <Box h="44" bg="gray.100" overflow="hidden">
                  <Image
                    src={course.imagePreview || course.imageUrl || '/next.svg'}
                    alt={course.title || 'Course'}
                    width={640}
                    height={256}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                <Box p={6} display="flex" flexDirection="column" gap={4}>
                  <Box>
                    <Text fontSize="sm" color="blue.600" fontWeight="semibold">
                      {course.topic?.name || 'English course'}
                    </Text>
                    <Heading as="h3" size="md" mt={2}>
                      {course.title || 'Untitled course'}
                    </Heading>
                  </Box>

                  <Text color="gray.600" fontSize="sm" minH="4.5rem">
                    {course.descriptionPreview || 'Open the course detail and continue your learning path from the next available lesson.'}
                  </Text>

                  <Flex justify="space-between" gap={4} color="gray.500" fontSize="sm">
                    <Text>{course.countSection ?? 0} lessons</Text>
                    <Text>{course.countStudent ?? 0} students</Text>
                  </Flex>

                  <Flex gap={3} flexWrap="wrap">
                    <Link href={`/learn/${course.id}`}>
                      <Box as="span" bg="blue.600" color="white" style={cardButtonStyle}>
                        Continue learning
                      </Box>
                    </Link>
                    <Link href={`/courses/${course.id}`}>
                      <Box as="span" borderWidth="1px" borderColor="blue.500" color="blue.600" style={cardButtonStyle}>
                        Detail
                      </Box>
                    </Link>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
