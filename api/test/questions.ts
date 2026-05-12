import { del, get, handleResponse, post, put } from '../../lib/axios';

const SUFFIX_TEST_QUESTION_API_URL = '/test-questions';

export const create = async (addTestRequest: any) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/add`;
  const response = await post(path, addTestRequest);
  return handleResponse(response, 201);
};

export const update = async (id: string, updateTestRequest: any) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/update/${id}`;
  const response = await put(path, updateTestRequest);
  return handleResponse(response, 200);
};

export const getAll = async () => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/get-all`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const getById = async (testId: string) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/get-by-id/${testId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const remove = async (testId: string) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/delete/${testId}`;
  const response = await del(path);
  return handleResponse(response, 204);
};

export const getByQuestionGroup = async (questionGroupId: string) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/get-by-question-group/${questionGroupId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const createNewQuestionForQuizType = async (addQuizQuestionRequest: any) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/create-new-question-for-quiz`;
  const response = await post(path, addQuizQuestionRequest);
  return handleResponse(response, 201);
};

export const getAllQuestionsForQuizType = async (testId: string) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/get-questions-for-quiz/${testId}`;
  const response = await get(path);
  return handleResponse(response, 200);
};

export const swapQuestions = async (questionId1: string, questionId2: string) => {
  const path = `${SUFFIX_TEST_QUESTION_API_URL}/swap/${questionId1}/${questionId2}`;
  const response = await put(path);
  return handleResponse(response, 204);
};

const testQuestionApi = {
  create,
  update,
  getAll,
  getById,
  remove,
  getByQuestionGroup,
  createNewQuestionForQuizType,
  getAllQuestionsForQuizType,
  swapQuestions,
};

export default testQuestionApi;
