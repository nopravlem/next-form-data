import emotionStyled from "@emotion/styled";
import { Box } from "@mui/material";

export const Flex = emotionStyled(Box)`
  display: flex;
`;

export const Form = emotionStyled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 2rem;
`;

export const ImageUpload = emotionStyled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
`;