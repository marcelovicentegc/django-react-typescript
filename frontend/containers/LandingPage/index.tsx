import React, { Fragment } from "react";
import { IPublication } from "../../utils/api";
import { useApi } from "../../hooks";
import { BlogSection } from "./BlogSection";
import { getSecrets } from "../../config";

const LandingPage: React.FC = () => {
  const [blogCarouselData, setBlogCarouselData] =
    React.useState<IPublication[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const { getPublications } = useApi();
  const { NODE_ENV, AUTH_TOKEN } = getSecrets();
  const PRODUCTION = NODE_ENV === "production";
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    setBlogCarouselData(await getPublications());
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div
        style={{
          padding: "38px 22px 0px 22px",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", paddingBottom: 38 }}>
          You have successfully installed Django-React-Typescript!
        </div>
        {!AUTH_TOKEN && (
          <>
            <div style={{ textAlign: "center" }}>
              Create a token for the default user and put it on the frontend's
              app .env file.
            </div>
            <button
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
            </button>
          </>
        )}
      </div>
      {isLoading && "Loading...."}
      {!isLoading && <BlogSection data={blogCarouselData} />}
    </Fragment>
  );
};

export { LandingPage as default };
