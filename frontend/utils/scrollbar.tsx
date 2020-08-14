import React from "react";
import { MenuListComponentProps } from "react-select";
import SimpleBar from "simplebar-react";

export const renderScrollbar = (
  props: React.PropsWithChildren<
    MenuListComponentProps<{
      value: string;
      label: string;
    }>
  >
) => {
  return (
    <SimpleBar autoHide={false} style={{ maxHeight: 200 }}>
      {props.children}
    </SimpleBar>
  );
};
