import { post } from '../../lib/axios';

const SUFFIX_TEXT_LESSON_API_URL = '/lesson';

export const fetchTextLessonById = async (lessonRequest: any) => {
  const path = `${SUFFIX_TEXT_LESSON_API_URL}/get-lesson-by-id`;
  const response = await post(path, lessonRequest);
  return response?.status === 200 ? response.data : null;
};

export const createTextLesson = async (formData: any) => {
  const path = `${SUFFIX_TEXT_LESSON_API_URL}/create-lesson`;
  const response = await post(path, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response?.status === 201 ? response.data : null;
};

export const updateTextLesson = async (formData: any) => {
  const path = `${SUFFIX_TEXT_LESSON_API_URL}/update-lesson`;
  const response = await post(path, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response?.status === 200 ? response.data : null;
};

const textLessonApi = {
  fetchTextLessonById,
  createTextLesson,
  updateTextLesson,
};

export default textLessonApi;
