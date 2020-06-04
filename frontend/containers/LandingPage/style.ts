import { styled } from "../../utils/theme";

export const Image = styled.img`
  height: 100%;
  width: 100%;
  max-width: max-content;
  max-height: max-content;
  object-fit: contain;
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
