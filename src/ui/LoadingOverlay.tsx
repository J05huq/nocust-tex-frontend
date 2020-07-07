import React, { PureComponent } from 'react'
import styled from 'styled-components'
import RingLoader from 'react-spinners/RingLoader'

import { WHITE_COLOR } from '../globalStyles'

interface Props {
  isActive: Boolean
  text: String
}

export default class LoadingOverlayContainer extends PureComponent<Props> {
  render() {
    return (
      this.props.isActive && (
        <Container>
          <RingLoader loading color={WHITE_COLOR} size={80} />

          <Text>{this.props.text}</Text>
        </Container>
      )
    )
  }
}

const Container = styled.div`
  background-color: rgba(31, 27, 62, 0.7);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Text = styled.p`
  margin-top: 10px;
`
