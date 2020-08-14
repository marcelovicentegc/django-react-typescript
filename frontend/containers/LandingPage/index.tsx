import React from "react";
import { Layout } from "../../components/Layout";
import { IPublication } from "../../utils/api";
import { useApi, useViewport } from "../../hooks";
import { Loading } from "../../components/Loading";
import { BlogSection } from "./BlogSection";
import { landingPageLayoutStyle } from "../../utils/styles";
import { ROUTES } from "../../routes";
import { Text } from "../../typography";
import { Column, Separator } from "../../base";
import { getSecrets } from "../../config";
import { Button } from "../../components/Button";

const LandingPage: React.FC = () => {
  const [blogCarouselData, setBlogCarouselData] = React.useState<
    IPublication[]
  >();
  const [isLoading, setIsLoading] = React.useState(false);
  const { getPublications } = useApi();
  const { width } = useViewport();
  const { NODE_ENV, AUTH_TOKEN } = getSecrets();
  const PRODUCTION = NODE_ENV === "production";
  React.useEffect(() => {
    getData();
    console.log(AUTH_TOKEN);
  }, []);

  const BREAKPOINT = 1024;

  const getData = async () => {
    setIsLoading(true);
    setBlogCarouselData(await getPublications());
    setIsLoading(false);
  };

  return (
    <>
      <Layout
        style={{
          ...landingPageLayoutStyle,
          height: "auto",
        }}
      >
        <Column
          style={{
            padding: "38px 22px 0px 22px",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          <Text
            fontSize={36}
            lineHeight={30}
            style={{ textAlign: "center", paddingBottom: 38 }}
          >
            You have successfully installed Django-React-Typescript!
          </Text>
          {!AUTH_TOKEN && (
            <>
              <Separator size={"90vw"} paddingBottom={38} paddingTop={0} />
              <Text
                fontSize={36}
                lineHeight={30}
                style={{ textAlign: "center" }}
              >
                Create a token for the default user and put it on the frontend's
                app .env file.
              </Text>
              <Separator
                size={"90vw"}
                paddingBottom={12}
                paddingTop={12}
                invisible
              />
              <Button
                label="Create an AUTH_TOKEN"
                onClick={() =>
                  window.open(
                    PRODUCTION
                      ? "/admin/authtoken/token/add/"
                      : "http://localhost:8000/admin/authtoken/token/add/",
                    "_blank"
                  )
                }
                wrapperProps={{
                  style: {
                    paddingBottom: 38,
                  },
                }}
              />
            </>
          )}
        </Column>
      </Layout>
      {isLoading && <Loading />}
      {!isLoading && <BlogSection data={blogCarouselData} />}
    </>
  );
};

export { LandingPage as default };
