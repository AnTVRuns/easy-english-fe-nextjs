export interface LessonRequest {
  id?: string;
  sectionId?: string;
  [key: string]: any;
}

export interface LessonResponse {
  id: string;
  title: string;
  content?: any;
}
