import React, { PureComponent } from 'react'
import { Trans } from 'react-i18next'
import styled, { css } from 'styled-components'
import BeatLoader from 'react-spinners/BeatLoader'
import { BLACK_COLOR, MAIN_COLOR, WHITE_COLOR } from '../globalStyles'

interface Props {
  title: string
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
  id?: string
}

export default class Button extends PureComponent<Props> {
  render() {
    const { onClick, disabled, type, loading, id } = this.props
    return (
      <Container onClick={onClick} disabled={disabled} type={type} id={id ? id : ''}>
        <Background />
        {loading ? (
          <BeatLoader loading size={13} css={LoaderCSS} color={'#FFFFE4'} />
        ) : (
          <Text>
            <Trans i18nKey={this.props.title} />
          </Text>
        )}
      </Container>
    )
  }
}

const Container = styled.button`
  position: relative;
  width: 100%;
  min-width: 100px;
  outline: none !important;
  box-shadow: none !important;
  padding: 0.6rem 0.5rem;
  border: none;
  border-radius: 50px;
  background-color: ${MAIN_COLOR};
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      &:hover {
        cursor: not-allowed;
      }
    `}
`
const Background = styled.div`
  position: absolute;
  z-index: 1;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  border-radius: 50px;
  background: ${BLACK_COLOR};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s, visibility 0.4s;

  ${Container}:hover & {
    opacity: 1;
    visibility: visible;
  }
`
const Text = styled.span`
  position: relative;
  z-index: 2;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${WHITE_COLOR};
`
const LoaderCSS = { 'z-index': 2, position: 'relative' }
