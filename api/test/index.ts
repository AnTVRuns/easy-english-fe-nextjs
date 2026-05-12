import { del, get, post, put, handleResponse } from '../../lib/axios';

const SUFFIX_TEST_API_URL = '/tests';

export const createTest = async (addTestRequest: any) => {
  const path = `${SUFFIX_TEST_API_URL}/add`;
  const response = await post(path, addTestRequest);
  return handleResponse(response, 201);
};

export const updateTest = async (id: string, updateTestRequest: any) => {
  const path = `${SUFFIX_TEST_API_URL}/update/${id}`;
  const response = await put(path, updateTestRequest);
  return handleResponse(response, 200);
};

export const getAllTests = async () => {
  const path = `${SUFFIX_TEST_API_URL}/get-all`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const getTestById = async (testId: string) => {
  const path = `${SUFFIX_TEST_API_URL}/get-by-id/${testId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const removeTest = async (testId: string) => {
  const path = `${SUFFIX_TEST_API_URL}/delete/${testId}`;
  const response = await del(path);
  return handleResponse(response, 204);
};

export const getTestsBySection = async (sectionId: string) => {
  const path = `${SUFFIX_TEST_API_URL}/get-by-section/${sectionId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const uploadAudio = async (testId: string, audioFile: File) => {
  const path = `${SUFFIX_TEST_API_URL}/${testId}/upload-audio`;
  const formData = new FormData();
  formData.append('audio', audioFile);
  const response = await put(path, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return handleResponse(response, 200);
};

export const deleteAudio = async (testId: string) => {
  const path = `${SUFFIX_TEST_API_URL}/${testId}/delete-audio`;
  const response = await del(path);
  return handleResponse(response, 204);
};

export const isEmptyTest = async (testId: string) => {
  const path = `${SUFFIX_TEST_API_URL}/is-empty/${testId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

const testApi = {
  createTest,
  updateTest,
  getAllTests,
  getTestById,
  removeTest,
  getTestsBySection,
  uploadAudio,
  deleteAudio,
  isEmptyTest,
};

export default testApi;
