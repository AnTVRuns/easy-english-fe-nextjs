import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import type { CourseDetailResponse } from '@/types/api/course';

function renderList(items: unknown): React.ReactNode {
  if (!Array.isArray(items) || items.length === 0) {
    return <Text color="gray.600">No data available yet.</Text>;
  }

  return (
    <Box as="ul" pl={5} display="grid" gap={2}>
      {items.map((item, index) => (
        <Box as="li" key={index} color="gray.700">
          {typeof item === 'string'
            ? item
            : typeof item === 'object' && item !== null
              ? (item as { title?: string; name?: string; description?: string; content?: string }).title ||
                (item as { title?: string; name?: string; description?: string; content?: string }).name ||
                (item as { title?: string; name?: string; description?: string; content?: string }).description ||
                (item as { title?: string; name?: string; description?: string; content?: string }).content ||
                'Item'
              : String(item)}
        </Box>
      ))}
    </Box>
  );
}

function ContentBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="2xl" p={6} shadow="sm">
      <Heading as="h3" size="md" mb={4}>
        {title}
      </Heading>
      {children}
    </Box>
  );
}

function getReviewerLabel(review: unknown): string {
  if (typeof review === 'object' && review !== null) {
    const item = review as { fullName?: string; userName?: string; comment?: string; content?: string };
    return item.fullName || item.userName || item.comment || item.content || 'Reviewer';
  }

  return typeof review === 'string' ? review : 'Reviewer';
}

export default function CourseDetailPanel({
  course,
  activeTab,
}: {
  course: CourseDetailResponse;
  activeTab: string;
}) {
  if (activeTab === 'description') {
    return (
      <ContentBlock title="Description">
        <Text color="gray.700" whiteSpace="pre-wrap">
          {course.description || course.descriptionPreview || 'No course description available yet.'}
        </Text>
        {course.prerequisites?.length ? (
          <Box mt={5}>
            <Heading as="h4" size="sm" mb={3}>
              Prerequisites
            </Heading>
            {renderList(course.prerequisites)}
          </Box>
        ) : null}
      </ContentBlock>
    );
  }

  if (activeTab === 'curriculum') {
    return (
      <ContentBlock title="Curriculum">
        {Array.isArray(course.sections) && course.sections.length > 0 ? (
          <Box display="grid" gap={3}>
            {course.sections.map((section, index) => (
              <Box key={index} p={4} borderWidth="1px" borderColor="gray.200" borderRadius="xl">
                <Text fontWeight="semibold">
                  {typeof section === 'object' && section !== null
                    ? (section as { title?: string; name?: string }).title || (section as { title?: string; name?: string }).name || `Section ${index + 1}`
                    : `Section ${index + 1}`}
                </Text>
                <Text color="gray.600" mt={1}>
                  {typeof section === 'object' && section !== null
                    ? (section as { description?: string; content?: string }).description || (section as { description?: string; content?: string }).content || 'No lesson description available.'
                    : String(section)}
                </Text>
              </Box>
            ))}
          </Box>
        ) : (
          <Text color="gray.600">Curriculum data will be connected in the next phase.</Text>
        )}
      </ContentBlock>
    );
  }

  if (activeTab === 'faq') {
    return (
      <ContentBlock title="FAQ">
        {renderList(course.faqs || course.faq || [])}
      </ContentBlock>
    );
  }

  if (activeTab === 'announcement') {
    return (
      <ContentBlock title="Announcement">
        <Text color="gray.700" whiteSpace="pre-wrap">
          {course.notice || 'No announcements have been published for this course yet.'}
        </Text>
      </ContentBlock>
    );
  }

  if (activeTab === 'reviews') {
    return (
      <ContentBlock title="Reviews">
        {Array.isArray(course.reviews) && course.reviews.length > 0 ? (
          <Box display="grid" gap={4}>
            {course.reviews.map((review, index) => (
              <Box key={index} p={4} borderWidth="1px" borderColor="gray.200" borderRadius="xl">
                <Flex gap={3} align="start">
                  <Box
                    w="10"
                    h="10"
                    borderRadius="full"
                    bg="blue.100"
                    color="blue.700"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="semibold"
                    flexShrink={0}
                  >
                    {getReviewerLabel(review).charAt(0).toUpperCase()}
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">
                      {getReviewerLabel(review)}
                    </Text>
                    <Text color="gray.600" mt={1}>
                      {typeof review === 'object' && review !== null
                        ? (review as { comment?: string; content?: string }).comment ||
                          (review as { comment?: string; content?: string }).content ||
                          'Review content'
                        : String(review)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          <Text color="gray.600">Reviews will appear here once the review API is connected.</Text>
        )}
      </ContentBlock>
    );
  }

  return null;
}
