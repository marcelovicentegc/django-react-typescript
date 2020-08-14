import { styled } from "../../utils/theme";

export const Image = styled.img<{ responsive?: boolean }>`
  ${({ responsive }) => ` 
  height: 100%;
  max-height: 597px;
  ${!responsive ? "min-width: 100vw;" : "width: 100%; min-height: 597px;"}
  object-fit: cover;
  `}
`;

export const Span = styled.span`
  font-weight: bold;
  font-size: 28px;
  color: ${({ theme }) => theme.color.white1};
`;

export const GreetingsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 22px;
`;
