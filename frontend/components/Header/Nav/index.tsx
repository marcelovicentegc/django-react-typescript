import React from "react";
import {
  HeaderWrapper,
  HeaderLayer,
  LeftSide,
  StyledHeader,
  RightSide,
} from "./style";
import { theme } from "../../../utils/theme";
import { ROUTES } from "../../../routes";
import { useRouter, useViewport, useScrollPosition } from "../../../hooks";
import { LogoIcon } from "../../../icons";
import { Text } from "../../../typography";
import { BREAKPOINTS } from "../../../utils/responsiveness";

interface IProps {
  pinned: boolean;
}

export const Nav: React.FC<IProps> = ({ pinned }) => {
  const { push, history } = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const { width } = useViewport();
  const { TABLET, BIG_MOBILE } = BREAKPOINTS;
  const { currentPosition } = useScrollPosition();

  return (
    <>
      <HeaderWrapper
        data-testid="headerWrapper"
        brightTheme={pinned && width > TABLET}
        shouldPin={pinned}
        style={{
          boxShadow:
            (width < TABLET && !isOpen && currentPosition.y > 5) ||
            (width > TABLET && pinned)
              ? "0px 4px 20px rgba(0, 0, 0, 0.2)"
              : "unset",
        }}
      >
        <HeaderLayer>
          <StyledHeader
            data-testid="styledHeader"
            brightTheme={pinned && width > TABLET}
            style={{
              padding: width <= BIG_MOBILE ? "22px 40px" : "22px 120px",
              width:
                width <= BIG_MOBILE
                  ? "calc(100% - 80px)"
                  : "calc(100% - 240px)",
            }}
          >
            <LeftSide data-testid="leftSide">
              <LogoIcon
                style={{
                  position: "relative",
                  top: -75,
                  width: 162,
                  height: 160,
                }}
              />
            </LeftSide>
            <RightSide data-testid="rightSide ">
              <>
                <Text
                  fontSize={18}
                  lineHeight={25}
                  style={{
                    cursor: "pointer",
                    margin: "0px 16px",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    color: theme.color.white1,
                    fontWeight:
                      history.location.pathname === ROUTES.LANDING_PAGE
                        ? "bold"
                        : "normal",
                  }}
                  onClick={() => {
                    setIsOpen(false);
                    push(ROUTES.LANDING_PAGE);
                  }}
                >
                  Home
                </Text>
                <Text
                  fontSize={18}
                  lineHeight={25}
                  style={{
                    cursor: "pointer",
                    margin: "0px 16px",
                    display: "flex",
                    alignItems: "center",
                    color: theme.color.white1,
                    whiteSpace: "nowrap",
                    fontWeight:
                      history.location.pathname === ROUTES.BLOG
                        ? "bold"
                        : "normal",
                  }}
                  onClick={() => {
                    setIsOpen(false);
                    push(ROUTES.BLOG);
                  }}
                >
                  Blog
                </Text>
              </>
            </RightSide>
          </StyledHeader>
        </HeaderLayer>
      </HeaderWrapper>
      {width < TABLET && (
        <div
          style={{
            height: 113,
            width: "100%",
          }}
        />
      )}
    </>
  );
};
