import React from "react";
import dayjs from "dayjs";
import {
  IGetPaginatedPublicationsResponse,
  IPublication,
} from "../../utils/api";
import { useApi, useRouter, useDebounce, useViewport } from "../../hooks";
import { Loading } from "../../components/Loading";
import { Text } from "../../typography";
import { BLOG_PAGE, truncate } from "../../utils/strings";
import { Card } from "../../components/Card";
import { Column, Row, Separator, Box } from "../../base";
import { Image } from "../LandingPage/style";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
import { theme } from "../../utils/theme";
import { PaginationBox } from "../../components/PaginationBox";
import { SearchBar } from "../../components/SearchBar";
import { ROUTES } from "../../routes";
import { getSecrets } from "../../config";
import { Button } from "../../components/Button";

const { NODE_ENV } = getSecrets();
const PRODUCTION_MODE = NODE_ENV === "production";

interface IProps {
  paginatedPublications?: IGetPaginatedPublicationsResponse;
  blogPost?: IPublication;
}

const BlogPage: React.FC<IProps> = ({ paginatedPublications, blogPost }) => {
  const [data, setData] = React.useState<IGetPaginatedPublicationsResponse>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isHovering, setIsHovering] = React.useState<number | null>(null);
  const { getPaginatedPublications } = useApi();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { push } = useRouter();
  const { width } = useViewport();
  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(
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

  const { TITLE, READ_MORE, SEARCH } = BLOG_PAGE;
  const SEARCH_BAR_BREAKPOINT = 480;
  const SEARCH_BOX_BREAKPOINT = 1124;
  const FIRST_PUBLICATION_BREAKPOINT = 995;
  const FIRST_PUBLICATION_SECONDARY_BREAKPOINT = 870;
  const FIRST_PUBLICATION_TERTIARY_BREAKPOINT = 500;
  const COMMON_PUBLICATION_BREAKPOINT = 530;

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
    <>
      <Row
        style={{
          maxWidth: 980,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "auto",
          width: "100%",
        }}
      >
        <Box
          style={{
            maxWidth: 934,
            paddingRight: width > SEARCH_BOX_BREAKPOINT ? 0 : 22,
            paddingLeft: width > SEARCH_BOX_BREAKPOINT ? 0 : 22,
            width:
              width > SEARCH_BOX_BREAKPOINT ? "100%" : "calc(100vw - 44px)",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: width > 562 ? "row" : "column",
          }}
        >
          <Text
            fontSize={26}
            lineHeight={35}
            style={{
              paddingTop: 33,
              paddingBottom: 25,
            }}
          >
            {TITLE}
          </Text>
          {data && data.count > 0 ? (
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
            />
          )}
        </Box>
        {isLoading && <Loading height={"100vh"} width={"100vw"} />}
        {!isLoading && data && (
          <>
            {typeof data === "string" ? (
              <h1>{data}</h1>
            ) : (
              data.count > 0 &&
              data.results.map((blogPost, i) => {
                if (i === 0) {
                  return (
                    <>
                      <Card
                        key={i}
                        style={{
                          width:
                            width < FIRST_PUBLICATION_TERTIARY_BREAKPOINT
                              ? "70vw"
                              : width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                              ? "80vw"
                              : width < FIRST_PUBLICATION_BREAKPOINT
                              ? 750
                              : 870,
                          height:
                            width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                              ? "auto"
                              : 350,
                          padding:
                            width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                              ? 28
                              : 32,
                        }}
                      >
                        <Row
                          style={{
                            width:
                              width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                ? "auto"
                                : 429,
                            height:
                              width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                ? "auto"
                                : 414,
                            flexDirection:
                              width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                ? "column"
                                : "row",
                          }}
                        >
                          <Image
                            src={blogPost.image}
                            style={{
                              position: "relative",
                              minWidth:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? "calc(100% + 56px)"
                                  : "100%",
                              maxWidth:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? "calc(100% + 56px)"
                                  : "100%",
                              minHeight:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 350
                                  : 414,
                              maxHeight:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 350
                                  : 414,
                              top:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? -28
                                  : -32,
                              left:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? -28
                                  : -32,
                              right:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? -28
                                  : 0,
                              paddingBottom:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 0
                                  : 32,
                              paddingRight:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 0
                                  : 32,
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 0
                                  : 10,
                              borderTopRightRadius:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 10
                                  : 0,
                            }}
                          />
                          <Column
                            style={{
                              minWidth:
                                width < FIRST_PUBLICATION_BREAKPOINT
                                  ? 318
                                  : width <
                                    FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? "auto"
                                  : "calc(100% + 32px)",
                              minHeight:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 285
                                  : 414,
                              marginLeft:
                                width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                  ? 0
                                  : -26,
                              position: "relative",
                            }}
                          >
                            <Separator
                              invisible
                              paddingTop={0}
                              paddingBottom={56}
                            />
                            <Text
                              fontSize={24}
                              fontWeight={500}
                              lineHeight={31}
                              style={{
                                paddingBottom: 18,
                              }}
                            >
                              {blogPost.title}
                            </Text>
                            <Text
                              fontSize={14}
                              fontWeight={500}
                              lineHeight={18}
                              color={theme.color.grey11}
                            >
                              {dayjs(blogPost.created_at)
                                .locale("pt-br")
                                .format("LLLL")}
                            </Text>
                            <Row
                              style={{
                                position: "absolute",
                                bottom:
                                  width > FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                                    ? 72
                                    : 0,
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onMouseEnter={() => setIsHovering(i)}
                              onMouseLeave={() => setIsHovering(null)}
                              onClick={() =>
                                push(ROUTES.BLOG + "/" + blogPost.slug)
                              }
                            >
                              <Text
                                fontSize={16}
                                lineHeight={21}
                                fontWeight={500}
                                color={theme.color.grey7}
                                style={{
                                  paddingRight: isHovering === i ? 17 : 13,
                                  cursor: "pointer",
                                  transition: ".1s",
                                }}
                              >
                                {READ_MORE}
                              </Text>
                              <ArrowRightIcon />
                            </Row>
                          </Column>
                        </Row>
                      </Card>
                      <Separator
                        paddingTop={50}
                        paddingBottom={50}
                        size={"100vw"}
                      />
                    </>
                  );
                }

                return (
                  <Card
                    key={i}
                    style={{
                      height: width > COMMON_PUBLICATION_BREAKPOINT ? 146 : 400,
                      width: width > COMMON_PUBLICATION_BREAKPOINT ? 382 : 228,
                      padding: width > COMMON_PUBLICATION_BREAKPOINT ? 32 : 16,
                    }}
                  >
                    <Row
                      style={{
                        width:
                          width > COMMON_PUBLICATION_BREAKPOINT ? 182 : 260,
                        height: 211,
                        flexDirection:
                          width > COMMON_PUBLICATION_BREAKPOINT
                            ? "row"
                            : "column",
                      }}
                    >
                      <Image
                        src={blogPost.image}
                        style={{
                          position: "relative",
                          minWidth: "100%",
                          minHeight: 211,
                          top:
                            width > COMMON_PUBLICATION_BREAKPOINT ? -32 : -16,
                          left:
                            width > COMMON_PUBLICATION_BREAKPOINT ? -32 : -16,
                          right:
                            width > COMMON_PUBLICATION_BREAKPOINT ? 0 : -16,
                          paddingBottom:
                            width > COMMON_PUBLICATION_BREAKPOINT ? 32 : 20,
                          paddingRight:
                            width > COMMON_PUBLICATION_BREAKPOINT ? 32 : 0,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius:
                            width > COMMON_PUBLICATION_BREAKPOINT ? 0 : 10,
                          borderBottomLeftRadius:
                            width > COMMON_PUBLICATION_BREAKPOINT ? 10 : 0,
                        }}
                      />
                      <Column
                        style={{
                          position: "relative",
                          minWidth:
                            width > COMMON_PUBLICATION_BREAKPOINT
                              ? "calc(100% + 32px)"
                              : "unset",
                          width:
                            width > COMMON_PUBLICATION_BREAKPOINT
                              ? "unset"
                              : "calc(100% - 32px)",
                          minHeight: 211,
                          marginLeft:
                            width > COMMON_PUBLICATION_BREAKPOINT ? -40 : 0,
                        }}
                      >
                        {width > COMMON_PUBLICATION_BREAKPOINT && (
                          <Separator
                            invisible
                            paddingTop={0}
                            paddingBottom={6}
                          />
                        )}
                        <Text
                          fontSize={
                            width > COMMON_PUBLICATION_BREAKPOINT ? 14 : 10
                          }
                          fontWeight={500}
                          lineHeight={
                            width > COMMON_PUBLICATION_BREAKPOINT ? 18 : 13
                          }
                          color={theme.color.grey11}
                          style={{
                            paddingBottom:
                              width > COMMON_PUBLICATION_BREAKPOINT ? 6 : 16,
                          }}
                        >
                          {dayjs(blogPost.created_at)
                            .locale("pt-br")
                            .format("LLLL")}
                        </Text>
                        <Text fontSize={24} fontWeight={500} lineHeight={31}>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: truncate(blogPost.title, 30, true),
                            }}
                          />
                        </Text>
                        <Row
                          style={{
                            position: "absolute",
                            bottom: 44,
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Row
                            style={{
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            onMouseEnter={() => setIsHovering(i)}
                            onMouseLeave={() => setIsHovering(null)}
                            onClick={() =>
                              push(ROUTES.BLOG + "/" + blogPost.slug)
                            }
                          >
                            <Text
                              fontSize={16}
                              lineHeight={21}
                              fontWeight={500}
                              color={theme.color.grey7}
                              style={{
                                paddingRight: isHovering === i ? 17 : 13,
                                cursor: "pointer",
                                transition: ".1s",
                              }}
                            >
                              {READ_MORE}
                            </Text>
                            <ArrowRightIcon />
                          </Row>
                        </Row>
                      </Column>
                    </Row>
                  </Card>
                );
              })
            )}
          </>
        )}
      </Row>
      {data && data.count > 0 && (
        <Row
          style={{
            justifyContent: "center",
            paddingTop: 66,
            paddingBottom: 80,
          }}
        >
          {data.previous && (
            <PaginationBox
              onClick={() =>
                getData({
                  querystring: PRODUCTION_MODE
                    ? data.previous.replace("http://", "https://")
                    : data.previous,
                })
              }
              page={"back"}
            />
          )}
          {Array.from(new Array(data.total_pages)).map((_, i) => (
            <>
              <PaginationBox
                key={i}
                onClick={() => getData({ page: i + 1 })}
                page={i + 1}
                isSelected={data.current_page === i + 1}
              />
            </>
          ))}
          {data.next && (
            <PaginationBox
              onClick={() =>
                getData({
                  querystring: PRODUCTION_MODE
                    ? data.next.replace("http://", "https://")
                    : data.next,
                })
              }
              page={"next"}
            />
          )}
        </Row>
      )}
    </>
  );
};

export { BlogPage as default };
