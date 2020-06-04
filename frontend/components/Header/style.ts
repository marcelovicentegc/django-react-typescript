import { styled } from "../../utils/theme";

const SideBase = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  z-index: 1;
`;

export const HeaderWrapper = styled.div``;

export const StyledHeader = styled.header`
  width: calc(100% - 44px);
  height: 30px;
  background: ${({ theme }) => theme.color.blue4};
  padding: 22px;
  display: flex;
  flex-direction: row;
`;

export const LeftSide = styled(SideBase)`
  justify-content: flex-start;
`;

export const RightSide = styled(SideBase)`
  justify-content: flex-end;
`;

export const AppTitle = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.white1};

  &::after {
    content: "🍰 react-typescript-client";
  }

  @media only screen and (max-width: 570px) {
    &::after {
      content: "🍰 rtc";
    }
  }

  @media only screen and (max-width: 450px) {
    &::after {
      content: "🍰";
    }
  }
`;
