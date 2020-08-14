import { styled } from "../../utils/theme";

export const H4 = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  color: ${({ theme }) => theme.color.white1};
  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.color.green1} !important;
  }
`;
