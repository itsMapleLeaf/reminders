import { darken } from "polished";
import styled, { css } from "react-emotion";
import * as colors from "./colors";
import { Intent } from "./Intent";

export interface ButtonProps {
  intent?: Intent
}

const createButtonStyle = (color: string) => css`
  background: ${color};

  &:hover,
  &:focus {
    background: ${darken(0.05, color)};
  }
`

const resolveIntentStyle = ({ intent = Intent.primary }: ButtonProps) => {
  switch (intent) {
    case Intent.primary:
      return createButtonStyle(darken(0.1, colors.themeColor))
    case Intent.success:
      return createButtonStyle(colors.successColor)
    case Intent.warning:
      return createButtonStyle(colors.warningColor)
    case Intent.danger:
      return createButtonStyle(colors.dangerColor)
    case Intent.info:
      return createButtonStyle(colors.infoColor)
  }
}

export const Button = styled("button")`
  padding: 0.3rem 0.6rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${resolveIntentStyle};
`
