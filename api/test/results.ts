import { del, get, handleResponse, post } from '../../lib/axios';

const SUFFIX_TEST_RESULT_API_URL = '/test-results';

export const getById = async (testResultId: string) => {
  const path = `${SUFFIX_TEST_RESULT_API_URL}/get-by-id/${testResultId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const submit = async (submitTestRequest: any) => {
  const path = `${SUFFIX_TEST_RESULT_API_URL}/submit-test`;
  const response = await post(path, submitTestRequest);
  return handleResponse(response, 200);
};

export const getTestHistory = async (testId: string, page: number, size: number) => {
  const path = `${SUFFIX_TEST_RESULT_API_URL}/get-test-history-by-test-id`;
  const response = await get(path, {
    params: {
      testId,
      page,
      size,
    },
  });
  return handleResponse(response, 200);
};

export const remove = async (testResultId: string) => {
  const path = `${SUFFIX_TEST_RESULT_API_URL}/delete/${testResultId}`;
  const response = await del(path);
  return handleResponse(response, 200);
};

export const getByCurUser = async () => {
  const response = await get(SUFFIX_TEST_RESULT_API_URL);
  return handleResponse(response, 200);
};

const testResultApi = {
  getById,
  submit,
  getTestHistory,
  remove,
  getByCurUser,
};

export default testResultApi;
