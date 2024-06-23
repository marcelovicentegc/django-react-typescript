import React, { Suspense, lazy } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import "./index.css";

const LandingPage = lazy(() => import(".//pages/landing"));
const BlogPage = lazy(() => import(".//pages/blog"));
const PublicationPage = lazy(() => import(".//pages/publication"));

dayjs.extend(LocalizedFormat);

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.LANDING_PAGE}
          element={
            <Suspense fallback={"Loading..."}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.BLOG}
          element={
            <Suspense fallback={"Loading..."}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.PUBLICATION_PAGE}
          element={
            <Suspense fallback={"Loading..."}>
              <PublicationPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
