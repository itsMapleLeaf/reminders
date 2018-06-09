import { darken } from "polished"
import styled, { css } from "react-emotion"
import {
  dangerColor,
  infoColor,
  successColor,
  themeColor,
  warningColor,
} from "./colors"
import { Intent } from "./Intent"

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
      return createButtonStyle(darken(0.1, themeColor))
    case Intent.success:
      return createButtonStyle(successColor)
    case Intent.warning:
      return createButtonStyle(warningColor)
    case Intent.danger:
      return createButtonStyle(dangerColor)
    case Intent.info:
      return createButtonStyle(infoColor)
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
