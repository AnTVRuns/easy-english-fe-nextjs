export interface TestRequest {
  id?: string;
  sectionId?: string;
  [key: string]: any;
}

export interface TestResponse {
  id: string;
  title: string;
  parts?: any[];
}
