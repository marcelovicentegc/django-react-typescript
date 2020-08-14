import React from "react";
import { TSvgProps } from "../../utils/types";

export const CloseIcon: React.SFC<TSvgProps> = (props) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 2L2 15"
      stroke="#294F7C"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 2L15 15"
      stroke="#294F7C"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
