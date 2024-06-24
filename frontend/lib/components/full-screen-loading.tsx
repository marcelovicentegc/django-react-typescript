import React from "react";
import { Spinner } from "flowbite-react";

export function FullScreenLoading() {
  return (
    <div className="text-center">
      <div role="status">
        <Spinner />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
