import React from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./lib";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Container not found");
}

const root = createRoot(container);
root.render(<Root />);
