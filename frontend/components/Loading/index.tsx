import React from "react";
import { theme } from "../../utils/theme";
import { Box } from "../../base";
import "./style.css";

interface IProps {
  height?: number | string;
  width?: number | string;
  onButton?: boolean;
  secondary?: boolean;
}

export const Loading: React.FC<IProps> = ({
  height,
  width,
  onButton,
  secondary,
}) => {
  const circleStyle = [
    ".sk-fading-circle .sk-circle:before {",
    `background-color: ${secondary ? theme.color.green2 : theme.color.green1};`,
    "}",
  ].join("\n");

  return (
    <Box
      style={{
        height,
        width,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="sk-fading-circle"
        style={{
          height: onButton ? 20 : 40,
          width: onButton ? 20 : 40,
          margin: onButton ? 0 : "100px auto",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: circleStyle,
          }}
        />
        <div className="sk-circle1 sk-circle"></div>
        <div className="sk-circle2 sk-circle"></div>
        <div className="sk-circle3 sk-circle"></div>
        <div className="sk-circle4 sk-circle"></div>
        <div className="sk-circle5 sk-circle"></div>
        <div className="sk-circle6 sk-circle"></div>
        <div className="sk-circle7 sk-circle"></div>
        <div className="sk-circle8 sk-circle"></div>
        <div className="sk-circle9 sk-circle"></div>
        <div className="sk-circle10 sk-circle"></div>
        <div className="sk-circle11 sk-circle"></div>
        <div className="sk-circle12 sk-circle"></div>
      </div>
    </Box>
  );
};
