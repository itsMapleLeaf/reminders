import { lighten } from "polished"
import styled from "react-emotion"
import { themeColor } from "../ui/colors"

export const ReminderList = styled("ul")`
  padding: 0.5rem;

  > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`

export const ReminderListSeparator = styled("li")`
  height: 0;
  border: none;
  border-bottom: 1px solid ${lighten(0.05, themeColor)};
`
