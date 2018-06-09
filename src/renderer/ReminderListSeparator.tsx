import { lighten } from "polished"
import styled from "react-emotion"
import { themeColor } from "./colors"

export const ReminderListSeparator = styled("li")`
  height: 0;
  border: none;
  border-bottom: 1px solid ${lighten(0.05, themeColor)};
`
