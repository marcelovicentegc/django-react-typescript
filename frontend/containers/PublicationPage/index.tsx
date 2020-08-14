import React from "react";
import dayjs from "dayjs";
import { RouteComponentProps } from "react-router-dom";
import { useApi, useRouter, useViewport } from "../../hooks";
import { Loading } from "../../components/Loading";
import { IPublication } from "../../utils/api";
import { Image, Column, Row, Box } from "../../base";
import { Card } from "../../components/Card";
import { Text } from "../../typography";
import { theme } from "../../utils/theme";
import { ScrollToTop } from "../../components/ScrollToTop";
import { BackButton } from "../../components/BackButton";

interface IProps extends Omit<RouteComponentProps, "match"> {
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
  const { history } = useRouter();
  const { width } = useViewport();
  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    setDistanceToTop(
      -(window.pageYOffset + columnRef.current?.getBoundingClientRect().top) +
        532
    );
  }, [data]);
  const BREAKPOINT = 950;
  const SECONDARY_BREAKPOINT = 750;
  const TERTIARY_BREAKPOINT = 550;

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
    <>
      <ScrollToTop />
      {isLoading && <Loading />}
      {data && (
        <>
          <Image
            src={data.image}
            alt={data.image_description}
            style={{
              objectFit: "cover",
              minHeight: "100%",
              maxHeight: 689,
            }}
          />
          <Column
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
                  maxWidth:
                    width > BREAKPOINT
                      ? 909
                      : width < TERTIARY_BREAKPOINT
                      ? 309
                      : width < SECONDARY_BREAKPOINT
                      ? 509
                      : 709,
                  width: "100%",
                  margin: "auto",
                }}
              >
                <BackButton onClick={() => history.goBack()} />
              </div>
            </div>
            <Card
              style={{
                alignItems: "center",
                paddingTop: 69,
                paddingBottom: 81,
                width:
                  width > BREAKPOINT
                    ? 845
                    : width < TERTIARY_BREAKPOINT
                    ? 245
                    : width < SECONDARY_BREAKPOINT
                    ? 445
                    : 645,
              }}
            >
              <Column
                style={{
                  maxWidth: 719,
                  width: "100%",
                }}
              >
                <Row
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 25,
                  }}
                >
                  <Text
                    fontSize={20}
                    lineHeight={26}
                    fontWeight={500}
                    color={theme.color.grey11}
                  >
                    {dayjs(data.created_at).locale("pt-br").format("LLLL")}
                  </Text>
                </Row>
                <Text
                  fontSize={32}
                  lineHeight={42}
                  fontWeight={500}
                  style={{
                    maxWidth: 509,
                    paddingBottom: 25,
                  }}
                >
                  {data.title}
                </Text>
                <Text
                  fontSize={16}
                  lineHeight={23}
                  style={{
                    whiteSpace: "pre-line",
                  }}
                  dangerouslySetInnerHTML={{ __html: data.body }}
                />
              </Column>
            </Card>
          </Column>
        </>
      )}
    </>
  );
};

export { PublicationPage as default };
