import { Box } from '@chakra-ui/react';
import courseService from '@/api/course';
import CourseListClient from '@/components/Courses/CourseListClient';
import type { CourseSummary } from '@/types/api/course';

async function loadInitialCourses(): Promise<{ courses: CourseSummary[]; total: number }> {
  try {
    const response = await courseService.getCourseByFilter({
      pageNumber: 0,
      size: 12,
      title: null,
      categoryIds: null,
      rating: null,
      topicId: null,
      levelId: null,
    });

    return {
      courses: response?.content ?? [],
      total: response?.totalElements ?? 0,
    };
  } catch {
    return { courses: [], total: 0 };
  }
}

export default async function CoursesPage() {
  const { courses, total } = await loadInitialCourses();

  return (
    <Box>
      <CourseListClient initialCourses={courses} initialTotal={total} />
    </Box>
  );
}