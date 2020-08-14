import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Layout } from "../../../components/Layout";
import { Column, Row, Box } from "../../../base";
import { LANDING_PAGE, truncate } from "../../../utils/strings";
import { SearchBar } from "../../../components/SearchBar";
import { IPublication } from "../../../utils/api";
import { Text } from "../../../typography";
import { theme } from "../../../utils/theme";
import { useRouter } from "../../../hooks/useRouter";
import { ROUTES } from "../../../routes";
import { Card } from "../../../components/Card";
import { landingPageLayoutStyle } from "../../../utils/styles";
import { Image } from "./style";
import { useDebounce, useApi, useViewport } from "../../../hooks";
import { Button } from "../../../components/Button";
import { getSecrets } from "../../../config";
import "./carousel.css";

interface IProps {
  data: IPublication[] | undefined;
}

export const BlogSection: React.FC<IProps> = ({ data: blogCarouselData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [share, setShare] = React.useState<number | null>(null);
  const { push } = useRouter();
  const [data, setData] = useState<IPublication[]>(blogCarouselData);
  const { getPublications } = useApi();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { width } = useViewport();
  const { NODE_ENV } = getSecrets();
  const SEARCH_BAR_BREAKPOINT = 480;

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        getData();
      } else {
        setData(blogCarouselData);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const getData = async () => {
    setIsLoading(true);
    setData(await getPublications({ title: debouncedSearchTerm, tag: [] }));
    setIsLoading(false);
  };

  const getPreview = (blogPost: IPublication) => {
    const preview = blogPost.description ? blogPost.description : blogPost.body;

    return truncate(preview, 150, true);
  };

  const { TITLE, BOTTOM_TAG, SEARCH, READ_MORE } = LANDING_PAGE.BLOG_SECTION;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1480 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    bigTablet: {
      breakpoint: { max: 1480, min: 1124 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1124, min: 1024 },
      items: 3,
    },
    mediumTablet: {
      breakpoint: { max: 1024, min: 1000 },
      items: 2,
      partialVisibilityGutter: 60,
    },
    smallTablet: {
      breakpoint: { max: 1000, min: 770 },
      items: 2,
      partialVisibilityGutter: 50,
    },
    bigMobile: {
      breakpoint: { max: 770, min: 650 },
      items: 2,
    },
    mediumMobile: {
      breakpoint: { max: 650, min: 550 },
      items: 1,
      partialVisibilityGutter: 80,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <Layout
      height={width > 562 ? 778 : 842}
      style={{
        ...landingPageLayoutStyle,
        position: "relative",
        zIndex: 101,
      }}
    >
      <Column
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            paddingTop: 38,
            maxWidth: 1124,
            paddingRight: width > 1124 ? 0 : 22,
            paddingLeft: width > 1124 ? 0 : 22,
            width: width > 1124 ? "100%" : "calc(100vw - 44px)",
            justifyContent: "space-between",
            flexDirection: width > 562 ? "row" : "column",
          }}
        >
          <Text fontSize={32} lineHeight={44}>
            {TITLE}
          </Text>
          {data && data.length > 0 && (
            <SearchBar
              placeholder={SEARCH}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              wrapperProps={{
                style: {
                  paddingTop: width > 562 ? "unset" : 20,
                },
              }}
              isFocusedWidth={
                width > SEARCH_BAR_BREAKPOINT ? undefined : "unset"
              }
            />
          )}
        </Row>
        {data && data.length > 0 ? (
          <>
            <div
              style={{
                height: 540,
                width: "100%",
                paddingTop: 44,
              }}
            >
              <Carousel
                responsive={responsive}
                partialVisbile
                draggable
                arrows
                keyBoardControl
              >
                {data.map((blogPost, i) => {
                  return (
                    <Card
                      withOutline
                      width={258}
                      height={443}
                      key={i}
                      wrapperProps={{
                        style: {
                          display: "flex",
                          justifyContent: "flex-end",
                        },
                      }}
                      style={{
                        marginLeft: i === 0 ? "auto" : 18,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: 323,
                          height: 223,
                          top: -32,
                          left: -33,
                        }}
                      >
                        <Image
                          src={blogPost.image}
                          alt={blogPost.image_description}
                          style={{
                            objectFit: "cover",
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            MozBorderRadiusTopright: 10,
                            MozBorderRadiusTopleft: 10,
                          }}
                        />
                      </div>
                      <Box>
                        <Text
                          key={i}
                          fontSize={28}
                          lineHeight={36}
                          fontWeight={500}
                          style={{
                            marginBottom: 4,
                            position: "relative",
                            top: -15,
                          }}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: truncate(blogPost.title, 40, true),
                            }}
                          />
                        </Text>
                      </Box>
                      <Text
                        fontSize={16}
                        lineHeight={22}
                        color={theme.color.grey10}
                        style={{
                          position: "relative",
                          top: -15,
                        }}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: getPreview(blogPost),
                          }}
                        />
                      </Text>
                      <Row
                        style={{
                          position: "absolute",
                          bottom: 36,
                          justifyContent: "space-between",
                          width: 258,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          fontWeight={500}
                          fontSize={16}
                          lineHeight={22}
                          style={{
                            cursor: "pointer",
                          }}
                          hoverColor={theme.color.green2}
                          onClick={() =>
                            push(ROUTES.BLOG + "/" + blogPost.slug)
                          }
                        >
                          {READ_MORE}
                        </Text>
                      </Row>
                    </Card>
                  );
                })}
              </Carousel>
            </div>
            <Row
              style={{
                maxWidth: 1124,
                paddingTop: 26,
                width: "100%",
                zIndex: 1200,
                paddingLeft: width > 1124 ? 0 : 22,
              }}
            >
              <Text
                fontSize={18}
                fontWeight={500}
                lineHeight={25}
                color={theme.color.grey7}
                style={{
                  cursor: "pointer",
                }}
                hoverColor={theme.color.green2}
                onClick={() => push(ROUTES.BLOG)}
              >
                {BOTTOM_TAG}
              </Text>
            </Row>
          </>
        ) : (
          <Button
            label={"Start publishing in the blog"}
            onClick={() =>
              window.open(
                NODE_ENV === "production"
                  ? "/admin/backend/publication"
                  : "http://localhost:8000/admin/backend/publication",
                "_blank"
              )
            }
            wrapperProps={{
              style: { display: "flex", height: "100%" },
            }}
          />
        )}
      </Column>
    </Layout>
  );
};
