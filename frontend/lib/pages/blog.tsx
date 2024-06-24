import React, { useEffect, useState } from "react";
import {
  type IGetPaginatedPublicationsResponse,
  type IPublication,
  useApi,
} from "../api";
import { useDebounce } from "../hooks";
import { BlogPostPreview } from "../components/blog-post-preview";
import { FullScreenLoading } from "../components/full-screen-loading";
import { Label, TextInput } from "flowbite-react";

interface IProps {
  paginatedPublications?: IGetPaginatedPublicationsResponse;
  blogPost?: IPublication;
}

function BlogPage(props: IProps) {
  const { paginatedPublications, blogPost } = props;
  const [data, setData] = useState<IGetPaginatedPublicationsResponse>();
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
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">📝 Blog</h2>
        <p className="text-gray-500 dark:text-gray-400">
          This is the blog page. You can search for blog posts here or navigate
          through blog posts using pagination.
        </p>
        <div className="mt-4">
          <div className="mb-2 block">
            <Label htmlFor="base" value="Search the blog" />
          </div>
          <TextInput
            id="base"
            type="text"
            sizing="md"
            placeholder={"Search"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
      </div>
      {isLoading && <FullScreenLoading />}
      {!isLoading && data && (
        <>
          {typeof data === "string" ? (
            <h1>{data}</h1>
          ) : (
            data.count > 0 &&
            data.results.map((blogPost, index) => {
              return <BlogPostPreview data={blogPost} key={index} />;
            })
          )}
        </>
      )}
    </div>
  );
}

export { BlogPage as default };
