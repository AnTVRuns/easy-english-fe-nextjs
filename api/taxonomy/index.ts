import { get, handleResponse } from '@/lib/axios';

const API_BASE = '';

interface Topic {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

interface Category {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

interface Level {
  id: string | number;
  name: string;
  topicId?: string | number;
  [key: string]: unknown;
}

export const fetchAllTopics = async (): Promise<Topic[] | null> => {
  const response = await get(`${API_BASE}/topics/get-all`);
  return handleResponse(response, 200);
};

export const getTopicById = async (topicId: string | number): Promise<Topic | null> => {
  const response = await get(`${API_BASE}/topics/get-by-id/${topicId}`);
  return handleResponse(response, 200);
};

export const fetchAllCategories = async (): Promise<Category[] | null> => {
  const response = await get(`${API_BASE}/categories/get-all`);
  return handleResponse(response, 200);
};

export const getCategoryById = async (categoryId: string | number): Promise<Category | null> => {
  const response = await get(`${API_BASE}/categories/get-by-id/${categoryId}`);
  return handleResponse(response, 200);
};

export const fetchAllLevels = async (): Promise<Level[] | null> => {
  const response = await get(`${API_BASE}/levels/get-all`);
  return handleResponse(response, 200);
};

export const fetchLevelsByTopic = async (topicId: string | number): Promise<Level[] | null> => {
  const response = await get(`${API_BASE}/levels/get-by-topic/${topicId}`);
  return handleResponse(response, 200);
};

export const getLevelById = async (levelId: string | number): Promise<Level | null> => {
  const response = await get(`${API_BASE}/levels/get-by-id/${levelId}`);
  return handleResponse(response, 200);
};

const taxonomyService = {
  fetchAllTopics,
  getTopicById,
  fetchAllCategories,
  getCategoryById,
  fetchAllLevels,
  fetchLevelsByTopic,
  getLevelById,
};

export default taxonomyService;
