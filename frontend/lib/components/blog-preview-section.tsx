import React, { useState, useEffect } from "react";
import { type Publication, useApi } from "../api";
import { useDebounce } from "../hooks";
import { BlogPostPreview } from "./blog-post-preview";
import { FullScreenLoading } from "./full-screen-loading";
import { BlogHeader } from "./blog-header";

interface IProps {
  data: Publication[] | undefined;
}

export function BlogPreviewSection(props: IProps) {
  const { data: blogData } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Publication[]>(blogData);
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
      <BlogHeader
        title="📝 Blog preview"
        description="This is a preview of the blog. You can search for blog posts by title
          here and latest blog posts will be displayed below."
        setSearchTerm={setSearchTerm}
      />
      {isLoading ? <FullScreenLoading /> : null}
      <div className="grid grid-cols-4 gap-4">
        {data && data.length > 0
          ? data.map((blogPost, index) => {
              return <BlogPostPreview data={blogPost} key={index} />;
            })
          : null}
      </div>
    </div>
  );
}
