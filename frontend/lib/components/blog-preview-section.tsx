import React, { useState, useEffect } from "react";
import { type IPublication, useApi } from "../api";
import { useDebounce } from "../hooks";
import { BlogPostPreview } from "./blog-post-preview";
import { FullScreenLoading } from "./full-screen-loading";
import { Label, TextInput } from "flowbite-react";

interface IProps {
  data: IPublication[] | undefined;
}

export function BlogPreviewSection(props: IProps) {
  const { data: blogData } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IPublication[]>(blogData);
  const { getPublications } = useApi();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        getData();
      } else {
        setData(blogData);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const getData = async () => {
    setIsLoading(true);
    setData(await getPublications({ title: debouncedSearchTerm, tag: [] }));
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">📝 Blog preview</h2>
        <p className="text-gray-500 dark:text-gray-400">
          This is a preview of the blog. You can search for blog posts by title
          here and latest blog posts will be displayed below.
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
      {isLoading ? <FullScreenLoading /> : null}
      {data && data.length > 0
        ? data.map((blogPost, index) => {
            return <BlogPostPreview data={blogPost} key={index} />;
          })
        : null}
    </div>
  );
}
