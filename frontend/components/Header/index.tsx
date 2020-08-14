import React from "react";
import { useRouter } from "../../hooks/useRouter";
import { Helmet } from "react-helmet";
import { TAGLINE, WEBSITE_URL, WEBSITE_NAME } from "../../utils/strings";
import { useViewport } from "../../hooks";
import { Nav } from "./Nav";
import { BREAKPOINTS } from "../../utils/responsiveness";

interface IProps {
  title: string;
}

export const Header: React.FC<IProps> = ({ title }) => {
  const { history } = useRouter();
  const { width } = useViewport();
  const { TABLET } = BREAKPOINTS;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={history.location.pathname} />
        <meta name="viewport" content={"width=device-width, initial-scale=1"} />
        <meta name="description" content={TAGLINE} />
        <meta name="og:title" property="og:title" content={title} />
        <meta property="og:url" content={WEBSITE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={TAGLINE} />
        <meta property="og:image" content={WEBSITE_URL + "/static/logo.png"} />
        <meta property="og:site_name" content={WEBSITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:updated_time" content={`${+new Date()}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={TAGLINE} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={WEBSITE_URL} />
        <meta name="twitter:image" content={WEBSITE_URL + "/static/logo.png"} />
      </Helmet>
      <Nav pinned={width < TABLET} />
    </>
  );
};
