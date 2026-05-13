import { get, handleResponse, post, put } from '@/lib/axios';
import type {
  CourseDetailResponse,
  CourseFilterRequest,
  CoursePageResponse,
  CourseSummary,
} from '@/types/api/course';

const API_BASE = '/course';

export const fetchAllCourses = async (): Promise<CourseSummary[] | null> => {
  const response = await get(`${API_BASE}/get-all-course`);
  return handleResponse(response, 200);
};

export const fetchAllCourseOfTeacher = async (
  courseRequest: CourseFilterRequest,
): Promise<CoursePageResponse<CourseSummary> | null> => {
  const response = await post(`${API_BASE}/get-all-course-of-teacher`, courseRequest);
  return handleResponse(response, 200);
};

export const getCourseByFilter = async (
  courseRequest: CourseFilterRequest,
): Promise<CoursePageResponse<CourseSummary> | null> => {
  const response = await post(`${API_BASE}/get-course-by-filter`, courseRequest);
  return handleResponse(response, 200);
};

export const fetchMainCourse = async (
  courseRequest: { id: string | number },
): Promise<CourseDetailResponse | null> => {
  const response = await post(`${API_BASE}/get-main-course`, courseRequest);
  return handleResponse(response, 200);
};

export const getRelatedCourses = async (
  requestPayload: { courseId: string | number; numberOfCourses: number; type?: string },
): Promise<CourseSummary[] | null> => {
  const response = await post(`${API_BASE}/get-related-courses`, requestPayload);
  return handleResponse(response, 200);
};

export const getCourseDetailButtonStatus = async (
  courseId: string | number,
): Promise<string | null> => {
  const response = await get(`${API_BASE}/get-button-status/${courseId}`);
  return handleResponse(response, 200);
};

export const addCourseToFavourite = async (courseRequest: { id: string | number }) => {
  const response = await post(`${API_BASE}/add-course-to-favorite`, courseRequest);
  return handleResponse(response, 200);
};

export const deleteCourseOfFavourite = async (courseRequest: { id: string | number }) => {
  const response = await post(`${API_BASE}/remove-course-from-favorite`, courseRequest);
  return handleResponse(response, 200);
};

export const getEnrollCourse = async (
  courseRequest: CourseFilterRequest,
): Promise<CoursePageResponse<CourseSummary> | null> => {
  const response = await post(`${API_BASE}/get-all-course-of-student`, courseRequest);
  return handleResponse(response, 200);
};

export const countView = async (courseId: string | number): Promise<unknown> => {
  const response = await put(`${API_BASE}/count-view/${courseId}`);
  return handleResponse(response, 200);
};

export const deleteCourse = async (courseRequest: { id: string | number }) => {
  const response = await post(`${API_BASE}/delete-course`, courseRequest);
  return handleResponse(response, 200);
};

export const createCourse = async (courseRequest: FormData) => {
  const response = await post(`${API_BASE}/create-course`, courseRequest, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return handleResponse(response, 201);
};

export const updateCourse = async (courseRequest: FormData) => {
  const response = await post(`${API_BASE}/update-course`, courseRequest, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return handleResponse(response, 200);
};

export const updateCourseStatus = async (courseId: string | number, status: string) => {
  const response = await put(`${API_BASE}/update-status/${courseId}/${status}`);
  return handleResponse(response, 200);
};

export const updateCourseNotice = async (courseRequest: Record<string, any>) => {
  const response = await put(`${API_BASE}/update-notice`, courseRequest);
  return handleResponse(response, 200);
};

export default {
  addCourseToFavourite,
  countView,
  createCourse,
  deleteCourse,
  deleteCourseOfFavourite,
  fetchAllCourseOfTeacher,
  fetchAllCourses,
  fetchMainCourse,
  getCourseByFilter,
  getCourseDetailButtonStatus,
  getEnrollCourse,
  getRelatedCourses,
  updateCourse,
  updateCourseNotice,
  updateCourseStatus,
};