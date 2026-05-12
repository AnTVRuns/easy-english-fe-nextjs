import { Box, SimpleGrid } from '@chakra-ui/react';
import LessonHeader from './LessonHeader';
import VideoLesson from './VideoLesson';
import TextLesson from './TextLesson';
import AudioLesson from './AudioLesson';
import LessonSidebar, { LessonSidebarItem } from './LessonSidebar';

type LessonViewerProps = {
  lesson?: {
    id?: string | number;
    title?: string;
    description?: string;
    type?: string;
    content?: string;
    contentUrl?: string;
    duration?: number | string;
  };
  sidebarItems?: LessonSidebarItem[];
  activeLessonId?: LessonSidebarItem['id'];
  onSelectLesson?: (item: LessonSidebarItem) => void;
};

export default function LessonViewer({ lesson, sidebarItems = [], activeLessonId, onSelectLesson }: LessonViewerProps) {
  const type = (lesson?.type || '').toLowerCase();

  return (
    <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={6}>
      <Box gridColumn={{ base: '1', lg: '1 / span 1' }}>
        <LessonSidebar items={sidebarItems} activeId={activeLessonId} onSelect={onSelectLesson} />
      </Box>
      <Box gridColumn={{ base: '1', lg: '2 / span 3' }}>
        <LessonHeader
          title={lesson?.title || 'Lesson'}
          description={lesson?.description}
          type={lesson?.type}
          duration={lesson?.duration}
        />
        <Box mt={4}>
          {type.includes('video') ? <VideoLesson {...lesson} /> : null}
          {type.includes('audio') ? <AudioLesson {...lesson} /> : null}
          {!type || type.includes('text') ? <TextLesson {...lesson} /> : null}
        </Box>
      </Box>
    </SimpleGrid>
  );
}
