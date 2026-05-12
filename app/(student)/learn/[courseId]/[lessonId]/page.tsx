'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container } from '@chakra-ui/react';
import useLessonTracker from '@/hooks/useLessonTracker';
import LessonViewer from '@/components/Lesson/LessonViewer';

interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

interface Lesson {
  id?: string;
  title?: string;
  description?: string;
  type?: string;
  content?: string;
  contentUrl?: string;
  duration?: number | string;
}

const fallbackLesson: Lesson = {
  id: 'lesson-1',
  title: 'Introduction to English',
  description: 'Basic vocabulary and greetings for beginners.',
  type: 'Text',
  content: 'Welcome to your first English lesson.',
  duration: 15,
};

export default function LessonPage({ params }: LessonPageProps) {
  const router = useRouter();
  const { courseId, lessonId } = params;
  const { markLessonAsCompleted } = useLessonTracker();

  const [lesson] = useState<Lesson>(fallbackLesson);

  const handleLessonComplete = async () => {
    try {
      await markLessonAsCompleted({
        username: 'current-user',
        lessonId,
        courseId,
      });
    } catch (err) {
      console.error('Failed to mark lesson as completed:', err);
    }
  };

  const handleSelectLesson = (item: { id: string | number; title: string; type?: string }) => {
    router.push(`/learn/${courseId}/${item.id}`);
  };

  return (
    <Container maxW="container.2xl" py={8}>
      <LessonViewer
        lesson={lesson}
        sidebarItems={[
          { id: lessonId, title: lesson.title || 'Lesson', type: lesson.type }
        ]}
        activeLessonId={lessonId}
        onSelectLesson={handleSelectLesson}
      />
      <Box mt={8}>
        <button
          onClick={handleLessonComplete}
          style={{
            padding: '8px 16px',
            backgroundColor: '#06b6d4',
            color: 'white',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Mark as Completed
        </button>
      </Box>
    </Container>
  );
}
