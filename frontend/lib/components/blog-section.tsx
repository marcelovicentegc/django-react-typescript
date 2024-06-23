import React, { useState, useEffect } from "react";
import { getSecrets } from "../config";
import { type IPublication, useApi } from "../api";
import { useDebounce } from "../hooks";
import { ROUTES, useRouter } from "../routes";

interface IProps {
  data: IPublication[] | undefined;
}

export const BlogSection: React.FC<IProps> = ({ data: blogCarouselData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [data, setData] = useState<IPublication[]>(blogCarouselData);
  const { getPublications } = useApi();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { NODE_ENV } = getSecrets();

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

    return preview.slice(0, 50);
  };

  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          paddingTop: 38,
          maxWidth: 1124,
        }}
      >
        <div>Blog</div>
        {data && data.length > 0 && (
          <input
            placeholder={"Search"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        )}
      </div>
      {data && data.length > 0 ? (
        <>
          <div
            style={{
              height: 540,
              width: "100%",
              paddingTop: 44,
            }}
          >
            {data.map((blogPost, i) => {
              return (
                <>
                  {" "}
                  <div
                    style={{
                      position: "relative",
                      width: 323,
                      height: 223,
                      top: -32,
                      left: -33,
                    }}
                  >
                    <img
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
                  <div>
                    <div
                      key={i}
                      style={{
                        marginBottom: 4,
                        position: "relative",
                        top: -15,
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: blogPost.title.slice(0, 40),
                        }}
                      />
                    </div>
                  </div>
                  <div
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
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 36,
                      justifyContent: "space-between",
                      width: 258,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => push(ROUTES.BLOG + "/" + blogPost.slug)}
                    >
                      Read more
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div
            style={{
              maxWidth: 1124,
              paddingTop: 26,
              width: "100%",
              zIndex: 1200,
            }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => push(ROUTES.BLOG)}
            >
              Bottom tag???
            </div>
          </div>
        </>
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
  );
};
