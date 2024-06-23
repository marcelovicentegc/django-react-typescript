import React, { Fragment, useEffect, useState } from "react";
import { Alert, Button } from "flowbite-react";
import { type IPublication, useApi } from "../api";
import { BlogSection } from "../components/blog-section";
import { getSecrets } from "../config";

function LandingPage() {
  const [blogCarouselData, setBlogCarouselData] = useState<IPublication[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { getPublications } = useApi();
  const { NODE_ENV, AUTH_TOKEN } = getSecrets();
  const PRODUCTION = NODE_ENV === "production";
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    setBlogCarouselData(await getPublications());
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Django + React
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {!AUTH_TOKEN && (
              <Alert
                color="success"
                withBorderAccent
                additionalContent={
                  <Button
                    size="xs"
                    onClick={() =>
                      window.open(
                        PRODUCTION
                          ? "/admin/authtoken/token/add/"
                          : "http://localhost:8000/admin/authtoken/token/add/",
                        "_blank"
                      )
                    }
                  >
                    Create an AUTH_TOKEN
                  </Button>
                }
              >
                <span className="font-medium">
                  Create a token for the default user (admin) and put it on the
                  frontend's app .env file. Or, create a new user with the
                  required permissions to access the API and use that token
                  instead.
                </span>
              </Alert>
            )}
            {isLoading && "Loading...."}
            {!isLoading && <BlogSection data={blogCarouselData} />}{" "}
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export { LandingPage as default };
