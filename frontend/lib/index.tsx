import React, { Suspense, lazy } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import { FullScreenLoading } from "./components/full-screen-loading";
import { Topbar } from "./components/topbar";
import "./index.css";

const LandingPage = lazy(() => import("./pages/landing"));
const BlogPage = lazy(() => import("./pages/blog"));
const PublicationPage = lazy(() => import("./pages/publication"));

dayjs.extend(LocalizedFormat);

export function Root() {
  return (
    <BrowserRouter>
      <Topbar />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path={ROUTES.LANDING_PAGE}
            element={
              <Suspense fallback={<FullScreenLoading />}>
                <LandingPage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.BLOG}
            element={
              <Suspense fallback={<FullScreenLoading />}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.PUBLICATION_PAGE}
            element={
              <Suspense fallback={<FullScreenLoading />}>
                <PublicationPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
