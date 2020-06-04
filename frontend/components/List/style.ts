import { styled } from "../../utils/theme";

export const UnorderedList = styled.ul`
  list-style: none;
  margin: 0 -24px -24px;
  padding: 0;
`;

export const ListItem = styled.li<{ withExtraFunctionalities: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ withExtraFunctionalities }) =>
    withExtraFunctionalities ? "space-between" : "center"};
  border-top: 2px solid ${({ theme }) => theme.color.grey1};
  line-height: 1.6;
  padding: 18px 22px;
  cursor: default;
`;

export const Container = styled.div`
  display: felx;
  flex-direction: row;
  padding: 0px 8px;

  span {
    cursor: pointer;
    margin: 0px 4px;
  }
`;
