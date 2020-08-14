import { Styles } from "react-select";
import { theme } from "./theme";

export function selectInputStyles(width?: number | string): Partial<Styles> {
  return {
    option: (provided, state) => ({
      ...provided,
      padding: 10,
    }),
    control: (provided, state) => ({
      width: width ? width : 320,
      display: "flex",
      border: `1.5px solid ${theme.color.grey8}`,
      borderRadius: 10,
      padding: "8px 13px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
}

export const landingPageLayoutStyle: React.CSSProperties = {
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
};
