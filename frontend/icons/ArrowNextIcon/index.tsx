import React from "react";
import { TSvgProps } from "../../utils/types";

export const ArrowNextIcon: React.SFC<TSvgProps> = (props) => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 11L6 6L1 1"
      stroke="#C8C8C8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
