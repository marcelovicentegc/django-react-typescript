import React, { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  type IGetPaginatedPublicationsResponse,
  type IPublication,
  useApi,
} from "../api";
import { useDebounce } from "../hooks";
import { getSecrets } from "../config";
import { ROUTES, useRouter } from "../routes";

const { NODE_ENV } = getSecrets();

interface IProps {
  paginatedPublications?: IGetPaginatedPublicationsResponse;
  blogPost?: IPublication;
}

function BlogPage(props: IProps) {
  const { paginatedPublications, blogPost } = props;
  const [data, setData] = useState<IGetPaginatedPublicationsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const { getPaginatedPublications } = useApi();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { push } = useRouter();
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
    <Fragment>
      <div
        style={{
          maxWidth: 980,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "auto",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: 934,
          }}
        >
          <div
            style={{
              paddingTop: 33,
              paddingBottom: 25,
            }}
          >
            Blog
          </div>
          {data && data.count > 0 ? (
            <input
              placeholder={"Search"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          ) : (
            <button
              onClick={() =>
                window.open(
                  NODE_ENV === "production"
                    ? "/admin/backend/publication"
                    : "http://localhost:8000/admin/backend/publication",
                  "_blank"
                )
              }
            >
              Start publishing in the blog
            </button>
          )}
        </div>
        {isLoading && "Loading..."}
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
                      <div key={i}>
                        <div>
                          <img
                            src={blogPost.image}
                            style={{
                              position: "relative",
                            }}
                          />
                          <div>
                            <div
                              style={{
                                paddingBottom: 18,
                              }}
                            >
                              {blogPost.title}
                            </div>
                            <div>
                              {dayjs(blogPost.created_at)
                                .locale("pt-br")
                                .format("LLLL")}
                            </div>
                            <div
                              style={{
                                position: "absolute",

                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onMouseEnter={() => setIsHovering(i)}
                              onMouseLeave={() => setIsHovering(null)}
                              onClick={() =>
                                push(ROUTES.BLOG + "/" + blogPost.slug)
                              }
                            >
                              <div
                                style={{
                                  paddingRight: isHovering === i ? 17 : 13,
                                  cursor: "pointer",
                                  transition: ".1s",
                                }}
                              >
                                Read more
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }

                return (
                  <div key={i}>
                    <div>
                      <img
                        src={blogPost.image}
                        style={{
                          position: "relative",
                          minWidth: "100%",
                          minHeight: 211,
                        }}
                      />
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <div>
                          {dayjs(blogPost.created_at)
                            .locale("pt-br")
                            .format("LLLL")}
                        </div>
                        <div>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: blogPost.title.slice(0, 40),
                            }}
                          />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 44,
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
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
                            <div
                              style={{
                                paddingRight: isHovering === i ? 17 : 13,
                                cursor: "pointer",
                                transition: ".1s",
                              }}
                            >
                              Read more
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}

export { BlogPage as default };
