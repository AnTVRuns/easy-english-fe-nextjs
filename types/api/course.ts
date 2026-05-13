export interface CourseFilterRequest {
  pageNumber?: number;
  size?: number;
  title?: string | null;
  categoryIds?: Array<string | number> | null;
  rating?: number | null;
  topicId?: string | number | null;
  levelId?: string | number | null;
  status?: string | null;
  [key: string]: any;
}

export interface CoursePrice {
  price?: number;
  salePrice?: number;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}

export interface CourseSummary {
  id: string | number;
  title?: string;
  imagePreview?: string;
  imageUrl?: string;
  descriptionPreview?: string;
  countStudent?: number;
  countSection?: number;
  rating?: number;
  duration?: number | string;
  topic?: {
    id?: string | number;
    name?: string;
    [key: string]: any;
  };
  level?: {
    id?: string | number;
    name?: string;
    [key: string]: any;
  };
  owner?: {
    id?: string | number;
    fullName?: string;
    [key: string]: any;
  };
  price?: CoursePrice;
  [key: string]: any;
}

export interface CourseDetailResponse extends CourseSummary {
  description?: string;
  content?: any;
  sections?: any[];
  prerequisites?: any[];
  reviews?: any[];
  relatedCourses?: CourseSummary[];
  relatedBundles?: any[];
  notice?: string;
}

export interface CoursePageResponse<T = CourseSummary> {
  content?: T[];
  totalPages?: number;
  totalElements?: number;
  pageNumber?: number;
  size?: number;
  [key: string]: any;
}