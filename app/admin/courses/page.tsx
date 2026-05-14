'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import courseService from '@/api/course';
import type { CourseFilterRequest, CourseSummary } from '@/types/api/course';

const STATUS_OPTIONS = [
  { label: 'All', value: null },
  { label: 'Published', value: 'PUBLISHED' },
  { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Deleted', value: 'DELETED' },
] as const;

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [ownerUsername, setOwnerUsername] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [statusUpdates, setStatusUpdates] = useState<Record<string | number, string>>({});

  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      setLoading(true);
      try {
        const request: CourseFilterRequest = {
          pageNumber: page,
          size,
          ownerUsername: ownerUsername.trim() || null,
          status,
        };

        const response = await courseService.getAllCourseForAdmin(request);

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
  }, [ownerUsername, page, size, status]);

  const handleUpdateStatus = async (courseId: string | number) => {
    const nextStatus = statusUpdates[courseId];
    if (!nextStatus) {
      return;
    }

    await courseService.updateCourseStatus(courseId, nextStatus);
    const response = await courseService.getAllCourseForAdmin({
      pageNumber: page,
      size,
      ownerUsername: ownerUsername.trim() || null,
      status,
    });
    setCourses(response?.content ?? []);
    setTotalPages(response?.totalPages ?? 1);
    setTotalElements(response?.totalElements ?? 0);
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="7xl" py={8}>
        <Box mb={6}>
          <Heading size="xl">Admin course management</Heading>
          <Text color="gray.600" mt={2}>
            Total courses: {totalElements}
          </Text>
        </Box>

        <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={4} mb={6}>
          <Box display="flex" gap={3} flexWrap="wrap">
            <input
              value={ownerUsername}
              onChange={(e) => setOwnerUsername(e.target.value)}
              placeholder="Search by teacher username"
              style={{
                flex: '1 1 320px',
                border: '1px solid #d1d5db',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
              }}
            />
            <select
              value={status ?? ''}
              onChange={(e) => setStatus(e.target.value || null)}
              style={{
                minWidth: '220px',
                border: '1px solid #d1d5db',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
              }}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.label} value={option.value ?? ''}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button onClick={() => setPage(0)} colorScheme="blue">
              Search
            </Button>
          </Box>
        </Box>

        <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" overflowX="auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Teacher</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Lessons</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Students</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center' }}>
                    Loading...
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center' }}>
                    No courses available
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <Image
                        src={course.imagePreview || course.imageUrl || '/next.svg'}
                        alt={course.title || 'Course'}
                        width={72}
                        height={48}
                        style={{ width: '72px', height: '48px', objectFit: 'cover', borderRadius: '0.5rem' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <Link href={`/courses/${course.id}`}>
                        <Text fontWeight="semibold" color="blue.600">
                          {course.title || 'Untitled course'}
                        </Text>
                      </Link>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{course.owner?.fullName || 'Unknown'}</td>
                    <td style={{ padding: '0.75rem', minWidth: '220px' }}>
                      <select
                        value={statusUpdates[course.id] || course.status || ''}
                        onChange={(e) =>
                          setStatusUpdates((prev) => ({ ...prev, [course.id]: e.target.value }))
                        }
                        style={{
                          width: '100%',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.75rem',
                          padding: '0.6rem 0.8rem',
                        }}
                      >
                        {STATUS_OPTIONS.slice(1).map((option) => (
                          <option key={option.label} value={option.value || ''}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{course.countSection ?? 0}</td>
                    <td style={{ padding: '0.75rem' }}>{course.countStudent ?? 0}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <Button colorScheme="blue" onClick={() => handleUpdateStatus(course.id)}>
                        Save
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Box>

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
