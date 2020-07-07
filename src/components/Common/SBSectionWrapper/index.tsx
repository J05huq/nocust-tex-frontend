import React from 'react'
import styled from 'styled-components'

interface Props {
  width?: string
  height?: string
  shadow?: string
}

const SBSectionWrapper: React.FunctionComponent<Props> = props => {
  return (
    <Container shadow={props.shadow} width={props.width} height={props.height}>
      {props.children}
    </Container>
  )
}

const Container = styled.div<Props>`
  max-width: ${props => (props.width ? props.width : '600px')};
  height: ${props => (props.height ? props.height : 'auto')};
  box-shadow: ${props => (props.shadow ? props.shadow : 'none')};
  padding: ${props => (props.shadow ? '25px' : 'none')};
  margin: 5em auto;
`
export default SBSectionWrapper
