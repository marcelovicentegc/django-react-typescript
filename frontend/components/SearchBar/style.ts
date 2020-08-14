import { styled } from "../../utils/theme";

export const StyledInputWrapper = styled.div<{
  isFocused: boolean;
  isFocusedWidth?: number | string;
}>`
  position: relative;
  transition: 0.2s;
  width: ${({ isFocused, isFocusedWidth }) =>
    isFocused ? (isFocusedWidth ? isFocusedWidth : "434px") : "254px"};
  height: 50px;
`;

export const StyledInput = styled.input<{
  isFocused: boolean;
}>`
  ${({ theme, isFocused }) => `background: ${theme.color.white1};
  border: 1.5px solid ${theme.color.grey5};
  color: ${theme.color.black1};
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  outline: none;
  transition: 0.2s;
  padding: ${isFocused ? "12px 42px" : "12px 26px 12px 64px"};

  :placeholder {
    color: ${theme.color.grey9};
  }
`}
`;
