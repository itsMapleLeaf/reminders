import React from "react"
import styled from "react-emotion"
import { themeColor } from "./colors"

const Shade = styled("div")`
  background: rgba(0, 0, 0, 0.5);

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;

  > * {
    margin: auto;
  }
`

const Panel = styled("div")`
  background: ${themeColor};
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5);

  width: 20rem;
  max-width: calc(100vw - 4rem);
`

export interface ModalProps {
  onShadeClick?: () => void
}

export class Modal extends React.Component<ModalProps> {
  render() {
    return (
      <Shade onClick={this.handleShadeClick}>
        <Panel>{this.props.children}</Panel>
      </Shade>
    )
  }

  private handleShadeClick = (event: React.MouseEvent) => {
    const { onShadeClick } = this.props
    if (event.target === event.currentTarget && onShadeClick) {
      onShadeClick()
    }
  }
}
