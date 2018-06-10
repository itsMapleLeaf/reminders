import React from "react"
import { css } from "react-emotion"

const iconStyle = css`
  vertical-align: text-bottom;
`

export interface IconProps {
  name: string
}

export class Icon extends React.Component<IconProps> {
  render() {
    return <i className={`mdi mdi-${this.props.name} ${iconStyle}`} />
  }
}
