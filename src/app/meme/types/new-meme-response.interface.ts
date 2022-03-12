export interface NewMemeResponse {
  success: boolean;
  data:    Data;
}

export interface Data {
  url: string;
  page_url: string;
}