import React from 'react'
import styled from 'styled-components'
import Loader from '../assets/images/liquidity-loader.gif'
import { WHITE_COLOR } from '../globalStyles'

export default class LoadingSpinner extends React.PureComponent {
  render() {
    return (
      <Container>
        <Image src={Loader} />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  color: ${WHITE_COLOR};
`

const Image = styled.img`
  max-width: 85px;
`
