import { get, post, handleResponse } from '../../lib/axios';

const SUFFIX_LESSON_TRACKER_API_URL = '/lesson-trackers';

export const createCompleteLesson = async (lessonData: any) => {
  const response = await post(`${SUFFIX_LESSON_TRACKER_API_URL}/add`, lessonData);
  return handleResponse(response, 201);
};

export const getFirstUnlearnedLesson = async (courseId: string) => {
  const path = `${SUFFIX_LESSON_TRACKER_API_URL}/get-first-unlearned-lesson/${courseId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

const lessonTrackerApi = {
  createCompleteLesson,
  getFirstUnlearnedLesson,
};

export default lessonTrackerApi;
