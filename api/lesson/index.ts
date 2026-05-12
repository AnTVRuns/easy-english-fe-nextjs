import { post } from '../../lib/axios';

const SUFFIX_LESSON_API_URL = '/lesson';

export const fetchLessonById = async (lessonRequest: any) => {
  const path = `${SUFFIX_LESSON_API_URL}/get-lesson-by-id`;
  const response = await post(path, lessonRequest);
  return response?.status === 200 ? response.data : null;
};

export const createLesson = async (formData: any) => {
  const path = `${SUFFIX_LESSON_API_URL}/create-lesson`;
  const response = await post(path, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response?.status === 200 || response?.status === 201 ? response.data : null;
};

export const updateLesson = async (formData: any) => {
  const path = `${SUFFIX_LESSON_API_URL}/update-lesson`;
  const response = await post(path, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response?.status === 200 || response?.status === 201 ? response.data : null;
};

export const deleteLesson = async (lessonRequest: any) => {
  const path = `${SUFFIX_LESSON_API_URL}`;
  const response = await post(path, lessonRequest);
  return response?.status === 200 ? response.data : null;
};

export const fetchLessons = async (lessonRequest: any) => {
  const path = `${SUFFIX_LESSON_API_URL}/get-all-lesson-by-section`;
  const response = await post(path, lessonRequest);
  return response?.status === 200 ? response.data : null;
};

const lessonApi = {
  createLesson,
  updateLesson,
  fetchLessonById,
  fetchLessons,
  deleteLesson,
};

export default lessonApi;
