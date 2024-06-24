import React from "react";
import { Button, Checkbox, Label } from "flowbite-react";
import { getSecrets } from "../config";

interface Props {
  siteHasPublications: boolean;
}

export function GettingStartedSection(props: Props) {
  const { siteHasPublications } = props;
  const { authToken, isProd } = getSecrets();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">✨ Getting started</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Welcome to your Django + React project! Here are a few things you need
        to do to get started:
      </p>
      <div className="flex gap-2">
        <div className="flex h-5 items-center">
          <Checkbox checked={Boolean(authToken)} />
        </div>
        <div className="flex flex-col">
          <Label>Set up an Auth Token for the frontend</Label>
          <div className="text-gray-500 dark:text-gray-300">
            <span className="text-xs font-normal">
              Create a token for the default user (admin) and put it on the
              frontend's app .env file. Or, create a new user with the required
              permissions to access the API and use that token instead. This is
              necessary to allow the frontend to access the API. Once you've
              created the token and added it to the .env file, restart the
              frontend server 🤗
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button
          color="gray"
          onClick={() =>
            window.open(
              isProd
                ? "/admin/authtoken/tokenproxy/add/"
                : "http://localhost:8000/admin/authtoken/tokenproxy/add/",
              "_blank"
            )
          }
        >
          {authToken ? "Manage auth tokens" : "Create an auth token"}
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="flex h-5 items-center">
          <Checkbox checked={siteHasPublications} />
        </div>
        <div className="flex flex-col">
          <Label>Make sure the Database and CDN are set up</Label>
          <div className="text-gray-500 dark:text-gray-300">
            <span className="text-xs font-normal">
              Make sure the database is set up and running. Also, make sure the
              CDN is set up and running. This is necessary to start publishing
              blog posts 🤗
            </span>
          </div>
        </div>
      </div>
      <Button.Group>
        <Button
          color="gray"
          onClick={() =>
            window.open(
              "https://github.com/marcelovicentegc/django-react-typescript#setting-up-a-database"
            )
          }
        >
          Read the docs
        </Button>
        <Button
          color="gray"
          onClick={() =>
            window.open(
              isProd
                ? "/admin/backend/publication"
                : "http://localhost:8000/admin/backend/publication",
              "_blank"
            )
          }
        >
          {siteHasPublications ? "Publish more!" : "Start publishing"}
        </Button>
      </Button.Group>
    </div>
  );
}
