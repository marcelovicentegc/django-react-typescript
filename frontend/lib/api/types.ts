interface TextBlock {
  title: string;
  body: string;
  description?: string;
}

export interface Publication extends TextBlock {
  slug: string;
  created_at: string;
  tag: string[];
  image: string;
  image_description: string;
}

export interface GetPaginatedPublicationsResponse {
  count: number;
  current_page: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: Publication[];
}
