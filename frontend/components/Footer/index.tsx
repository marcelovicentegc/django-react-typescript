import React from "react";
import { Row } from "../../base";
import { FacebookIcon, LinkedinIcon } from "../../icons";
import { theme } from "../../utils/theme";
import { facebookUrl, linkedinUrl, twitterUrl } from "../../utils/links";
import { TSvgProps } from "../../utils/types";
import { BASE } from "../../utils/strings";
import { Text } from "../../typography";
import { useViewport } from "../../hooks";
import { TwitterIcon } from "../../icons/TwitterIcon";

export const Footer: React.FC = () => {
  const [isHovering, setIsHovering] = React.useState<number | null>(null);
  const { width } = useViewport();
  const BREAKPOINT = 1024;

  const iconProps: TSvgProps = {
    style: {
      cursor: "pointer",
      margin: "0px 5px",
    },
    role: "button",
  };

  const commonRowStyle: React.CSSProperties = {
    alignItems: "center",
  };

  return (
    <Row
      style={{
        position: "relative",
        padding: width > BREAKPOINT ? "26px 120px" : "26px 22px",
        backgroundColor: theme.color.green1,
        justifyContent: "space-between",
        flexDirection: width < BREAKPOINT ? "column" : "row",
        ...commonRowStyle,
      }}
    >
      <Row
        style={{
          ...commonRowStyle,
          position: width > BREAKPOINT ? "absolute" : "relative",
          paddingTop: width > BREAKPOINT ? 0 : 60,
          paddingBottom: width > BREAKPOINT ? 0 : 55,
          left: 0,
          right: 0,
          width: 293,
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Text
          fontWeight={"bold"}
          fontSize={18}
          lineHeight={25}
          color={theme.color.white1}
          style={{
            width: 78,
            paddingRight: 15,
          }}
        >
          {BASE.FOLLOW_ME}
        </Text>
        <FacebookIcon
          onClick={() => window.open(facebookUrl, "_blank")}
          onMouseEnter={() => setIsHovering(1)}
          onMouseLeave={() => setIsHovering(null)}
          color={isHovering === 1 ? theme.color.blue6 : theme.color.white1}
          {...iconProps}
        />
        <LinkedinIcon
          onClick={() => window.open(linkedinUrl, "_blank")}
          onMouseEnter={() => setIsHovering(3)}
          onMouseLeave={() => setIsHovering(null)}
          color={isHovering === 2 ? theme.color.blue6 : theme.color.white1}
          {...iconProps}
        />
        <TwitterIcon
          onClick={() => window.open(twitterUrl, "_blank")}
          onMouseEnter={() => setIsHovering(3)}
          onMouseLeave={() => setIsHovering(null)}
          color={isHovering === 3 ? theme.color.blue6 : theme.color.white1}
          {...iconProps}
        />
      </Row>
    </Row>
  );
};
