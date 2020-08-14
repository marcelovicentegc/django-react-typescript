import React from "react";

export const ArrowRightIcon: React.SFC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      width="27"
      height="16"
      viewBox="0 0 27 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 8H25.5"
        stroke="#B5B5B5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 1L25.5 8L18.5 15"
        stroke="#B5B5B5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
