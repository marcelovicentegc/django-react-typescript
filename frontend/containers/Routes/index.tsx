import React from "react";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Loading } from "../../components/Loading";
import { ViewportProvider } from "../../contexts";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Footer } from "../../components/Footer";
import { Column } from "../../base";
import { Header } from "../../components/Header";
import { useRouter } from "../../hooks";
import { titlefy } from "../../utils/strings";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = loadable(() => import("../LandingPage"), {
  ssr: true,
  fallback: <Loading height={"100vh"} width={"100vw"} />,
});
const BlogPage = loadable(() => import("../BlogPage"), {
  ssr: true,
  fallback: <Loading height={"100vh"} width={"100vw"} />,
});
const PublicationPage = loadable(() => import("../PublicationPage"), {
  ssr: true,
  fallback: <Loading height={"100vh"} width={"100vw"} />,
});

export const Routes = () => {
  const { history } = useRouter();

  return (
    <Switch>
      <ViewportProvider>
        <Column
          style={{
            position: "relative",
            minHeight: "100vh",
          }}
        >
          <ToastContainer />
          <ScrollToTop />
          <Header
            title={`${
              history.location.pathname === ROUTES.LANDING_PAGE
                ? "Home"
                : history.location.pathname === ROUTES.BLOG
                ? "Blog"
                : titlefy(
                    history.location.pathname.replace(ROUTES.BLOG + "/", "")
                  )
            }  | Django-React-Typescript`}
          />
          <Route path={ROUTES.LANDING_PAGE} exact>
            <LandingPage />
          </Route>
          <Route path={ROUTES.BLOG} exact>
            <BlogPage />
          </Route>
          <Route
            path={ROUTES.PUBLICATION_PAGE}
            exact
            component={PublicationPage}
          />
          <div
            style={{
              bottom: 0,
              marginTop: "auto",
            }}
          >
            <Footer />
          </div>
        </Column>
      </ViewportProvider>
    </Switch>
  );
};
