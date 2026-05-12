import { del, get, handleResponse, post, put } from '../../lib/axios';

const SUFFIX_TEST_PART_API_URL = '/test-parts';

export const create = async (addTestRequest: any) => {
  const path = `${SUFFIX_TEST_PART_API_URL}/add`;
  const response = await post(path, addTestRequest);
  return handleResponse(response, 201);
};

export const update = async (id: string, updateTestRequest: any) => {
  const path = `${SUFFIX_TEST_PART_API_URL}/update/${id}`;
  const response = await put(path, updateTestRequest);
  return handleResponse(response, 200);
};

export const getAll = async () => {
  const path = `${SUFFIX_TEST_PART_API_URL}/get-all`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const getById = async (testId: string) => {
  const path = `${SUFFIX_TEST_PART_API_URL}/get-by-id/${testId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const remove = async (testId: string) => {
  const path = `${SUFFIX_TEST_PART_API_URL}/delete/${testId}`;
  const response = await del(path);
  return handleResponse(response, 204);
};

export const getTestPartsByTestId = async (testId: string) => {
  const path = `${SUFFIX_TEST_PART_API_URL}/get-by-test/${testId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const swapPart = async (partId1: string, partId2: string) => {
  const path = `${SUFFIX_TEST_PART_API_URL}/swap/${partId1}/${partId2}`;
  const response = await put(path);
  return handleResponse(response, 204);
};

const testPartApi = {
  create,
  update,
  getAll,
  getById,
  remove,
  getTestPartsByTestId,
  swapPart,
};

export default testPartApi;
