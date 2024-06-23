import React, { Fragment } from "react";
import dayjs from "dayjs";
import { type IPublication, useApi } from "../api";

interface IProps {
  match?: {
    params: {
      publication: string;
    };
  };
  data?: IPublication;
}

const PublicationPage: React.FC<IProps> = ({
  match,
  data: publicationData,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<IPublication>();
  const [distanceToTop, setDistanceToTop] = React.useState(0);
  const columnRef = React.useRef<HTMLDivElement>();
  const { getPublication } = useApi();
  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    setDistanceToTop(
      -(window.pageYOffset + columnRef.current?.getBoundingClientRect().top) +
        532
    );
  }, [data]);

  const getData = async () => {
    if (match) {
      setIsLoading(true);
      setData(await getPublication(match.params.publication));
      setIsLoading(false);
    } else {
      setData(publicationData);
    }
  };

  return (
    <Fragment>
      {data && (
        <>
          <img
            src={data.image}
            alt={data.image_description}
            style={{
              objectFit: "cover",
              minHeight: "100%",
              maxHeight: 689,
            }}
          />
          <div
            ref={columnRef}
            style={{
              alignItems: "center",
              position: "relative",
              right: 0,
              left: 0,
              top: distanceToTop,
              marginBottom: distanceToTop + 80,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -50,
                right: 0,
                left: 0,
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "100%",
                  margin: "auto",
                }}
              ></div>
            </div>

            {dayjs(data.created_at).locale("pt-br").format("LLLL")}

            <div
              style={{
                maxWidth: 509,
                paddingBottom: 25,
              }}
            >
              {data.title}
            </div>
            <div
              style={{
                whiteSpace: "pre-line",
              }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          </div>
        </>
      )}
    </Fragment>
  );
};

export { PublicationPage as default };
