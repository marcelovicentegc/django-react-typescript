interface ITextBlock {
  title: string;
  body: string;
  description?: string;
}

export interface IPublication extends ITextBlock {
  slug: string;
  created_at: string;
  tag: string[];
  image: string;
  image_description: string;
}

export interface IGetPaginatedPublicationsResponse {
  count: number;
  current_page: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: IPublication[];
}
