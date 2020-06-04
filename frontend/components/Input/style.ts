import { styled } from "../../utils/theme";

export const InputWrapper = styled.div``;

export const StyledInput = styled.input`
  ${({ theme }) => `background: ${theme.color.white3};
  border: 2px solid ${theme.color.grey1};
  color: ${theme.color.grey2};`}
  min-height: 48px;
  text-align: left;
  border-radius: 16px;
  display: block;
  line-height: 24px;
  padding: 5px 10px;
  font-size: 100%;
  outline: none;
`;
