import React, { Fragment } from "react";
import dayjs from "dayjs";
import {
  IGetPaginatedPublicationsResponse,
  IPublication,
} from "../../utils/api";
import { useApi, useRouter, useDebounce } from "../../hooks";
import { ROUTES } from "../../routes";
import { getSecrets } from "../../config";

const { NODE_ENV } = getSecrets();

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
            Title
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
};

export { BlogPage as default };
