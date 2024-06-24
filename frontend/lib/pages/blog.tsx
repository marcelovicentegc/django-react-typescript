import React, { useEffect, useState } from "react";
import {
  type GetPaginatedPublicationsResponse,
  type Publication,
  useApi,
} from "../api";
import { useDebounce } from "../hooks";
import { BlogPostPreview } from "../components/blog-post-preview";
import { FullScreenLoading } from "../components/full-screen-loading";
import { Label, TextInput } from "flowbite-react";
import { BlogHeader } from "../components/blog-header";

interface IProps {
  paginatedPublications?: GetPaginatedPublicationsResponse;
  blogPost?: Publication;
}

function BlogPage(props: IProps) {
  const { paginatedPublications, blogPost } = props;
  const [data, setData] = useState<GetPaginatedPublicationsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { getPaginatedPublications } = useApi();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    getData();
  }, []);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        getData({ filter: { title: debouncedSearchTerm } });
      } else {
        if (paginatedPublications) {
          setData(paginatedPublications);
        } else {
          getData();
        }
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const getData = async (args?: {
    querystring?: string;
    page?: number;
    filter?: { title?: string; tags?: string[] };
  }) => {
    setIsLoading(true);
    setData(await getPaginatedPublications(args));
    setIsLoading(false);
  };

  return (
    <div>
      <BlogHeader setSearchTerm={setSearchTerm} />
      {isLoading && <FullScreenLoading />}
      {!isLoading && data && (
        <div className="grid grid-cols-4 gap-4">
          {data.count > 0 &&
            data.results.map((blogPost, index) => {
              return <BlogPostPreview data={blogPost} key={index} />;
            })}
        </div>
      )}
    </div>
  );
}

export { BlogPage as default };
