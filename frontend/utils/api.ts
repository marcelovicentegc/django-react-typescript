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

export function getFilteredPublicationsEndoint(
  args: {
    title: string;
    tag: string[];
  } = {
    title: "",
    tag: [],
  }
) {
  const { title, tag } = args;

  return `/api/publications/filter/?title=${title}&tag=${tag}`;
}

export function getPaginatedFilteredPublicationsEndoint(
  args: {
    title: string;
    tag: string[];
  } = {
    title: "",
    tag: [],
  }
) {
  const { title, tag } = args;

  return `/api/publications/p/filter/?title=${title}&tag=${tag ? tag : ""}`;
}

export function getPublicationEndpoint(slug: string) {
  return getPublicationsEndpoint + slug + "/";
}

export const getPublicationsEndpoint = "/api/publications/";
export const getPaginatedPublicationsEndpoint = getPublicationsEndpoint + "p/";
