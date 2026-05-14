export interface Topic {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

export interface Category {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

export interface Level {
  id: string | number;
  name: string;
  topicId?: string | number;
  [key: string]: unknown;
}

export interface FilterState {
  searchQuery?: string;
  categoryIds?: Array<string | number>;
  topicId?: string | number | null;
  levelId?: string | number | null;
  rating?: number | null;
  sortBy?: 'newest' | 'popularity' | 'rating' | 'price' | null;
  pageNumber?: number;
  size?: number;
}
