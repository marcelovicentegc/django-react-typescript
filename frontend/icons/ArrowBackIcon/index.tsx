import React from "react";
import { TSvgProps } from "../../utils/types";

export const ArrowBackIcon: React.SFC<TSvgProps> = (props) => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 1L0.999999 6L6 11"
      stroke={props.color ? props.color : "#C8C8C8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
