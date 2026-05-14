'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import courseService from '@/api/course';
import type { CourseFilterRequest, CourseSummary } from '@/types/api/course';

const STATUS_TABS = [
  { label: 'All', value: null },
  { label: 'PUBLISHED', value: 'PUBLISHED' },
  { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' },
  { label: 'REJECTED', value: 'REJECTED' },
  { label: 'DRAFT', value: 'DRAFT' },
] as const;

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      setLoading(true);
      try {
        const request: CourseFilterRequest = {
          pageNumber: page,
          size,
          title: searchTerm.trim() || null,
          categoryIds: null,
          rating: null,
          topicId: null,
          levelId: null,
          status,
        };

        const response = await courseService.fetchAllCourseOfTeacher(request);

        if (!active) return;

        setCourses(response?.content ?? []);
        setTotalPages(response?.totalPages ?? 1);
        setTotalElements(response?.totalElements ?? 0);
      } catch {
        if (active) {
          setCourses([]);
          setTotalPages(1);
          setTotalElements(0);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCourses();
    return () => {
      active = false;
    };
  }, [page, searchTerm, size, status]);

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="7xl" py={8}>
        <Box mb={6}>
          <Heading size="xl">Teacher course management</Heading>
          <Text color="gray.600" mt={2}>
            Total courses: {totalElements}
          </Text>
        </Box>

        <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={4} mb={6}>
          <Box display="flex" gap={3} flexWrap="wrap">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses"
              style={{
                flex: '1 1 320px',
                border: '1px solid #d1d5db',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
              }}
            />
            <Button colorScheme="blue" onClick={() => setPage(0)}>
              Search
            </Button>
          </Box>

          <Box display="flex" gap={2} flexWrap="wrap" mt={4}>
            {STATUS_TABS.map((tab) => (
              <Button
                key={tab.label}
                size="sm"
                variant={status === tab.value ? 'solid' : 'outline'}
                colorScheme={status === tab.value ? 'blue' : 'gray'}
                onClick={() => {
                  setStatus(tab.value);
                  setPage(0);
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>

        {loading ? (
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={6}>
            {Array.from({ length: size }).map((_, index) => (
              <Box key={index} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={4} h="300px" />
            ))}
          </Box>
        ) : courses.length === 0 ? (
          <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={8} textAlign="center">
            <Heading size="md">No courses available</Heading>
          </Box>
        ) : (
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={6}>
            {courses.map((course) => (
              <Box key={course.id} bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" overflow="hidden" shadow="sm">
                <Image
                  src={course.imagePreview || course.imageUrl || '/next.svg'}
                  alt={course.title || 'Course'}
                  width={640}
                  height={240}
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
                <Box p={4} display="flex" flexDirection="column" gap={3}>
                  <Text fontSize="sm" color="blue.600" fontWeight="semibold">
                    {course.status || 'UNKNOWN'}
                  </Text>
                  <Heading as="h3" size="md">
                    {course.title || 'Untitled course'}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    {course.descriptionPreview || 'No preview available.'}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {course.countSection ?? 0} lessons · {course.countStudent ?? 0} students
                  </Text>
                  <Link href={`/courses/${course.id}`}>
                    <Button colorScheme="blue" width="full">
                      Open detail
                    </Button>
                  </Link>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        <Box display="flex" alignItems="center" justifyContent="space-between" mt={8} gap={4} flexWrap="wrap">
          <Text color="gray.600">
            Page {page + 1} / {totalPages}
          </Text>
          <Box display="flex" gap={3}>
            <Button isDisabled={page <= 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>
              Previous
            </Button>
            <Button isDisabled={page + 1 >= totalPages} onClick={() => setPage((value) => value + 1)}>
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
