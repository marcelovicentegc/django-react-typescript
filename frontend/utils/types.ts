export type TStyled = Omit<React.HTMLProps<HTMLDivElement>, "as" | "ref">;
export type TSvgProps = React.SVGProps<SVGSVGElement> & {
  isHovering?: boolean;
};
