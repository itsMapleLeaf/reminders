import { lighten } from "polished"
import styled, { css } from "react-emotion"
import { themeColor } from "./colors"

const resolveReminderActiveStyle = ({ active }: { active?: boolean }) =>
  active && reminderActiveStyle

const reminderActiveStyle = css`
  opacity: 1;
`

export const Reminder = styled("li")`
  background: ${lighten(0.1, themeColor)};
  padding: 0.5rem;

  opacity: 0.7;

  ${resolveReminderActiveStyle};
`
