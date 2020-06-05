import React from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "../LandingPage";
import { BiographyPage } from "../BiographyPage";
import { ROUTES } from "../../routes";
import { PublicationPage } from "../PublicationPage";

export const Routes = () => {
  return (
    <Switch>
      <Route path={ROUTES.LANDING_PAGE} exact>
        <LandingPage />
      </Route>
      <Route path={ROUTES.BIOGRAPHY_PAGE} exact>
        <BiographyPage />
      </Route>
      <Route path={ROUTES.PUBLICATION_PAGE} exact>
        <PublicationPage />
      </Route>
    </Switch>
  );
};
