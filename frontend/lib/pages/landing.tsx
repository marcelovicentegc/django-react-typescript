import React, { Fragment, useEffect, useState } from "react";
import { HR, Spinner } from "flowbite-react";
import { type Publication, useApi } from "../api";
import { BlogPreviewSection } from "../components/blog-preview-section";
import { GettingStartedSection } from "../components/getting-started-section";

function LandingPage() {
  const [blogData, setBlogData] = useState<Publication[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { getPublications } = useApi();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    setBlogData(await getPublications());
    setIsLoading(false);
  };

  return (
    <Fragment>
      <GettingStartedSection siteHasPublications={Boolean(blogData)} />
      <HR />
      {isLoading ? <Spinner /> : <BlogPreviewSection data={blogData} />}
    </Fragment>
  );
}

export { LandingPage as default };
