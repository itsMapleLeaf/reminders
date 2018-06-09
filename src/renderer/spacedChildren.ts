import { css } from "react-emotion"

export const spacedChildren = css`
  padding: 0.5rem;

  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`
