import {
  IGetPaginatedPublicationsResponse,
  IPublication,
  getPaginatedPublicationsEndpoint,
  getPublicationsEndpoint,
  getPublicationEndpoint,
  getFilteredPublicationsEndoint,
  getPaginatedFilteredPublicationsEndoint,
} from "../utils/api";
import { getSecrets } from "../config";

const { NODE_ENV, AUTH_TOKEN } = getSecrets();

const PRODUCTION_MODE = NODE_ENV === "production";
const LOCAL_API_URL = "http://localhost:8000";

export function useApi() {
  const getHeaders = new Headers({
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    Authorization: "Token " + AUTH_TOKEN,
  });

  async function getPublications(
    args: {
      title: string;
      tag: string[];
    } = {
      title: "",
      tag: [],
    }
  ): Promise<IPublication[]> {
    const endpoint = (() => {
      const shouldFilter = args.tag && args.title;

      if (PRODUCTION_MODE) {
        if (shouldFilter) {
          return getFilteredPublicationsEndoint(args);
        }

        return getPublicationsEndpoint;
      }

      if (shouldFilter) {
        return LOCAL_API_URL + getFilteredPublicationsEndoint(args);
      }

      return LOCAL_API_URL + getPublicationsEndpoint;
    })();

    return fetch(endpoint, {
      cache: "default",
      method: "GET",
      headers: getHeaders,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  async function getPaginatedPublications(args?: {
    page?: number;
    querystring?: string;
    filter?: {
      title?: string;
      tags?: string[];
    };
  }): Promise<IGetPaginatedPublicationsResponse> {
    const endpoint = (() => {
      if (!args) {
        if (PRODUCTION_MODE) {
          return getPaginatedPublicationsEndpoint;
        }

        return LOCAL_API_URL + getPaginatedPublicationsEndpoint;
      }

      if (args.querystring) {
        return args.querystring;
      }

      if (args.page && !args.filter) {
        if (PRODUCTION_MODE) {
          return getPaginatedPublicationsEndpoint + `?page=${args.page}`;
        }

        return (
          LOCAL_API_URL +
          getPaginatedPublicationsEndpoint +
          `?page=${args.page}`
        );
      } else if (args.filter) {
        if (PRODUCTION_MODE) {
          return getPaginatedFilteredPublicationsEndoint({
            title: args.filter.title,
            tag: args.filter.tags,
          });
        }

        return (
          LOCAL_API_URL +
          getPaginatedFilteredPublicationsEndoint({
            title: args.filter.title,
            tag: args.filter.tags,
          })
        );
      }
    })();

    return fetch(endpoint, {
      cache: "default",
      method: "GET",
      headers: getHeaders,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  async function getPublication(slug: string): Promise<IPublication> {
    return fetch(
      PRODUCTION_MODE
        ? getPublicationEndpoint(slug)
        : LOCAL_API_URL + getPublicationEndpoint(slug),
      {
        cache: "default",
        method: "GET",
        headers: getHeaders,
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  return {
    getPublications,
    getPaginatedPublications,
    getPublication,
  };
}
