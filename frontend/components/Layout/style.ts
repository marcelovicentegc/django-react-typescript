import { styled } from "../../utils/theme";

export const LayoutWrapper = styled.div`
  height: calc(100vh - 74px);
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.color.blue4},
    transparent
  );
  display: flex;
`;

export const StyledLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 22px;
  width: 100%;

  @media only screen and (max-width: 650px) {
    flex-direction: column;
  }
`;
