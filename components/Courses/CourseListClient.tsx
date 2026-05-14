'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Text,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Image,
  Heading,
} from '@chakra-ui/react';
import type { CourseFilterRequest, CourseSummary } from '@/types/api/course';
import type { FilterState, Topic, Category, Level } from '@/types/ui/search';
import courseService from '@/api/course';
import taxonomyService from '@/api/taxonomy';
import Link from 'next/link';

interface CourseListClientProps {
  initialCourses?: CourseSummary[];
  initialTotal?: number;
}

const Rating = ({ rating }: { rating?: number }) => (
  <HStack gap={1}>
    <Text fontSize="xs" color="gray.600">
      {'★'.repeat(Math.round(rating || 0))}{'☆'.repeat(Math.max(0, 5 - Math.round(rating || 0)))}
    </Text>
    <Text fontSize="xs">{rating || 0}</Text>
  </HStack>
);

const CourseCardSkeleton = () => (
  <Box
    borderWidth="1px"
    borderColor="gray.200"
    borderRadius="lg"
    overflow="hidden"
    bg="white"
    shadow="sm"
  >
    <Skeleton height="160px" width="100%" />
    <Box p={4}>
      <Box display="grid" gap={3}>
      <SkeletonText noOfLines={1} width="50%" />
      <SkeletonText noOfLines={2} width="100%" />
      <SkeletonCircle size="10" />
      <SkeletonText noOfLines={1} width="80%" />
      </Box>
    </Box>
  </Box>
);

export default function CourseListClient({ initialCourses = [], initialTotal = 0 }: CourseListClientProps) {
  const [courses, setCourses] = useState<CourseSummary[]>(initialCourses);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(initialTotal);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categoryIds: [],
    topicId: null,
    levelId: null,
    rating: null,
    sortBy: null,
    pageNumber: 0,
    size: 12,
  });

  // Fetch taxonomies on mount
  useEffect(() => {
    const fetchTaxonomies = async () => {
      const [topicsData, categoriesData, levelsData] = await Promise.all([
        taxonomyService.fetchAllTopics(),
        taxonomyService.fetchAllCategories(),
        taxonomyService.fetchAllLevels(),
      ]);

      setTopics(topicsData || []);
      setCategories(categoriesData || []);
      setLevels(levelsData || []);
    };

    fetchTaxonomies();
  }, []);

  // Fetch courses when filters change
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const request: CourseFilterRequest = {
          pageNumber: filters.pageNumber,
          size: filters.size,
          title: filters.searchQuery || null,
          categoryIds: filters.categoryIds?.length ? filters.categoryIds : null,
          topicId: filters.topicId || null,
          levelId: filters.levelId || null,
          rating: filters.rating || null,
        };

        const response = await courseService.getCourseByFilter(request);
        setCourses(response?.content || []);
        setTotalPages(response?.totalPages || 1);
        setTotalElements(response?.totalElements || 0);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters]);

  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query, pageNumber: 0 }));
  }, []);

  const handleCategoryChange = useCallback((categoryIds: string[]) => {
    setFilters((prev) => ({
      ...prev,
      categoryIds: categoryIds.map((id) => parseInt(id)),
      pageNumber: 0,
    }));
  }, []);

  const handleTopicChange = useCallback((topicId: string) => {
    setFilters((prev) => ({
      ...prev,
      topicId: topicId ? parseInt(topicId) : null,
      levelId: null,
      pageNumber: 0,
    }));
  }, []);

  const handleLevelChange = useCallback((levelId: string) => {
    setFilters((prev) => ({ ...prev, levelId: levelId ? parseInt(levelId) : null, pageNumber: 0 }));
  }, []);

  const handleRatingChange = useCallback((rating: string) => {
    setFilters((prev) => ({ ...prev, rating: rating ? parseFloat(rating) : null, pageNumber: 0 }));
  }, []);

  const handleSortChange = useCallback((sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy: sortBy ? (sortBy as FilterState['sortBy']) : null, pageNumber: 0 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page - 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredLevels = filters.topicId ? levels.filter((l) => l.topicId === filters.topicId) : [];
  const currentPage = filters.pageNumber ?? 0;

  return (
    <Box minH="100vh" bg="gray.50">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <Heading mb={8}>Search & Filter Courses</Heading>

        <Flex gap={6} flexDir={{ base: 'column', lg: 'row' }}>
          {/* Sidebar Filter */}
          <Box w={{ base: 'full', lg: '300px' }} flex="0 0 auto">
            <Box bg="white" p={4} borderRadius="lg" shadow="sm" position="sticky" top={4}>
              <Box display="grid" gap={4}>
                <Box>
                  <Text fontWeight="600" fontSize="sm" mb={2}>
                    Search
                  </Text>
                  <Input
                    placeholder="Search courses..."
                    size="sm"
                    value={filters.searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </Box>

                <Box>
                  <Text fontWeight="600" fontSize="sm" mb={2}>
                    Sort by
                  </Text>
                  <select
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #E2E8F0', fontSize: '0.875rem' }}
                    onChange={(event) => handleSortChange(event.target.value)}
                  >
                    <option value="">Default</option>
                    <option value="newest">Newest</option>
                    <option value="popularity">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </Box>

                <Box>
                  <Text fontWeight="600" fontSize="sm" mb={2}>
                    Topic
                  </Text>
                  <Box display="grid" gap={2}>
                    <label>
                      <input type="radio" name="topic" checked={!filters.topicId} onChange={() => handleTopicChange('')} /> All Topics
                    </label>
                    {topics.map((topic) => (
                      <label key={topic.id}>
                        <input type="radio" name="topic" checked={filters.topicId?.toString() === topic.id.toString()} onChange={() => handleTopicChange(topic.id.toString())} /> {topic.name}
                      </label>
                    ))}
                  </Box>
                </Box>

                {filters.topicId && (
                  <Box>
                    <Text fontWeight="600" fontSize="sm" mb={2}>
                      Level
                    </Text>
                    <Box display="grid" gap={2}>
                      <label>
                        <input type="radio" name="level" checked={!filters.levelId} onChange={() => handleLevelChange('')} /> All Levels
                      </label>
                      {filteredLevels.map((level) => (
                        <label key={level.id}>
                          <input type="radio" name="level" checked={filters.levelId?.toString() === level.id.toString()} onChange={() => handleLevelChange(level.id.toString())} /> {level.name}
                        </label>
                      ))}
                    </Box>
                  </Box>
                )}

                <Box>
                  <Text fontWeight="600" fontSize="sm" mb={2}>
                    Category
                  </Text>
                  <Box display="grid" gap={2}>
                    {categories.map((category) => {
                      const checked = filters.categoryIds?.map(String).includes(category.id.toString()) ?? false;
                      return (
                        <label key={category.id}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              const current = filters.categoryIds?.map(String) || [];
                              const next = e.target.checked
                                ? [...current, category.id.toString()]
                                : current.filter((id) => id !== category.id.toString());
                              handleCategoryChange(next);
                            }}
                          />{' '}
                          {category.name}
                        </label>
                      );
                    })}
                  </Box>
                </Box>

                <Box>
                  <Text fontWeight="600" fontSize="sm" mb={2}>
                    Rating
                  </Text>
                  <Box display="grid" gap={2}>
                    <label>
                      <input type="radio" name="rating" checked={!filters.rating} onChange={() => handleRatingChange('')} /> All Ratings
                    </label>
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating}>
                        <input type="radio" name="rating" checked={filters.rating?.toString() === rating.toString()} onChange={() => handleRatingChange(rating.toString())} /> {rating} & up
                      </label>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Main Content */}
          <Box flex="1">
            {/* Results Summary */}
            <HStack justify="space-between" mb={6} flexWrap="wrap">
              <Text fontSize="sm" color="gray.600">
                Showing {courses.length} of {totalElements} courses
              </Text>
              <select
                style={{ width: '200px', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #E2E8F0', fontSize: '0.875rem' }}
                onChange={(event) => setFilters((prev) => ({ ...prev, size: parseInt(event.target.value, 10) }))}
              >
                <option value={12}>Show 12</option>
                <option value={24}>Show 24</option>
                <option value={48}>Show 48</option>
              </select>
            </HStack>

            {/* Course Grid */}
            {loading ? (
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                {Array(9)
                  .fill('')
                  .map((_, i) => (
                    <CourseCardSkeleton key={i} />
                  ))}
              </Grid>
            ) : courses.length === 0 ? (
              <Box textAlign="center" py={12}>
                <Heading size="md" color="gray.500" mb={4}>
                  No courses found
                </Heading>
                <Text color="gray.400">Try adjusting your search or filters</Text>
              </Box>
            ) : (
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                {courses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Box
                      borderWidth="1px"
                      borderColor="gray.200"
                      borderRadius="lg"
                      overflow="hidden"
                      bg="white"
                      shadow="sm"
                      transition="all 0.2s"
                      _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                      cursor="pointer"
                    >
                      <Box h="160px" overflow="hidden" bg="gray.100">
                        <Image
                          src={course.imagePreview || course.imageUrl || '/next.svg'}
                          alt={course.title || 'Course'}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <Box display="grid" gap={3} p={4}>
                        <Text fontSize="xs" color="blue.600" fontWeight="600">
                          {course.topic?.name || 'English'}
                        </Text>
                        <Heading as="h3" size="sm" minH="3rem">
                          {course.title}
                        </Heading>
                        <Rating rating={course.rating} />
                        <HStack gap={4} fontSize="xs" color="gray.600">
                          <Text>{course.countStudent || 0} students</Text>
                          <Text>{course.countSection || 0} lessons</Text>
                        </HStack>
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <HStack justify="center" mt={8} gap={2}>
                <Button
                  disabled={currentPage === 0}
                  onClick={() => handlePageChange(currentPage)}
                  size="sm"
                >
                  Previous
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = Math.max(0, currentPage - 2) + i;
                  if (pageNum < totalPages) {
                    return (
                      <Button
                        key={pageNum}
                        colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
                        variant={currentPage === pageNum ? 'solid' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum + 1)}
                      >
                        {pageNum + 1}
                      </Button>
                    );
                  }
                  return null;
                })}
                <Button
                  disabled={currentPage === totalPages - 1}
                  onClick={() => handlePageChange(currentPage + 2)}
                  size="sm"
                >
                  Next
                </Button>
              </HStack>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
