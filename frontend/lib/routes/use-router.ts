import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import queryString from "query-string";
import { useMemo } from "react";

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const match = useMatch({
    end: true,
    path: location.pathname,
  });

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: navigate,
      replace: (to: string) =>
        navigate(to, {
          replace: true,
        }),
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, navigate]);
}
