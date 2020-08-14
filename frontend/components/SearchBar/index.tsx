import React, { HTMLProps } from "react";
import { StyledInput, StyledInputWrapper } from "./style";
import { SearchIcon } from "../../icons";

interface IProps extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> {
  wrapperProps?: Omit<HTMLProps<HTMLInputElement>, "as" | "ref">;
  isFocusedWidth?: string | number;
}

export const SearchBar: React.FC<IProps> = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <StyledInputWrapper
      isFocused={isFocused}
      isFocusedWidth={props.isFocusedWidth}
      {...props.wrapperProps}
    >
      {!isFocused && (
        <SearchIcon
          style={{
            position: "absolute",
            top:
              props.wrapperProps?.style?.paddingTop !== "unset"
                ? Number(props.wrapperProps?.style?.paddingTop) + 14
                : 14,
            left: 26,
          }}
        />
      )}
      <StyledInput
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isFocused={isFocused}
      />
    </StyledInputWrapper>
  );
};
