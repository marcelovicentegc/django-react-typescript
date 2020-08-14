import React from "react";
import { theme } from "../../utils/theme";
import { TSvgProps } from "../../utils/types";

export const FacebookIcon: React.SFC<TSvgProps> = (props) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.5391 0H2.46094C1.10398 0 0 1.10398 0 2.46094V18.5391C0 19.896 1.10398 21 2.46094 21H18.5391C19.896 21 21 19.896 21 18.5391V2.46094C21 1.10398 19.896 0 18.5391 0ZM19.3594 18.5391C19.3594 18.9914 18.9914 19.3594 18.5391 19.3594H13.8633V12.6738H16.3976L16.8164 10.1309H13.8633V8.36719C13.8633 7.67095 14.3975 7.13672 15.0938 7.13672H16.7754V4.59375H15.0938C13.0051 4.59375 11.3212 6.28564 11.3212 8.37432V10.1309H8.85938V12.6738H11.3212V19.3594H2.46094C2.00862 19.3594 1.64062 18.9914 1.64062 18.5391V2.46094C1.64062 2.00862 2.00862 1.64062 2.46094 1.64062H18.5391C18.9914 1.64062 19.3594 2.00862 19.3594 2.46094V18.5391Z"
        fill={
          props.color
            ? props.color
            : props.isHovering
            ? theme.color.grey4
            : theme.color.black1
        }
      />
    </svg>
  );
};
