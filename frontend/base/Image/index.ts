import { styled } from "../../utils/theme";

export const Image = styled.img<{ responsive?: boolean }>`
  ${({ responsive }) =>
    responsive
      ? `height: 100%;
width: 100%;
max-width: max-content;
max-height: max-content;`
      : `min-height: 100%;
min-width: 100%;
min-width: max-content;
min-height: max-content;`}
  object-fit: contain;
`;
