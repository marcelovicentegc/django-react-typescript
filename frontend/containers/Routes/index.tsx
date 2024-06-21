import React, { Suspense, lazy } from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { ROUTES } from "../../routes";

const LandingPage = lazy(() => import("../LandingPage"));
const BlogPage = lazy(() => import("../BlogPage"));
const PublicationPage = lazy(() => import("../PublicationPage"));

export function Routes() {
  return (
    <ReactRouterRoutes>
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
    </ReactRouterRoutes>
  );
}
