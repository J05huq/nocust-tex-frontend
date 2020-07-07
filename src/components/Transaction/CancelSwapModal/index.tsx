import React from 'react'
import { Trans } from 'react-i18next'
import Button from '../../../../src/ui/Button'
import styled from 'styled-components'

interface Props {
  cancelSwap: () => void
  closeModal: () => void
  cancelSwapLoading: boolean
}

class CancelSwapModalContainer extends React.Component<Props> {
  render() {
    const { cancelSwap, cancelSwapLoading, closeModal } = this.props
    return (
      <>
        <ConfirmationText>
          <Trans i18nKey={'cancel_swap_confirmation'} />
        </ConfirmationText>
        <ButtonGroup>
          <Button title={'yes'} onClick={cancelSwap} loading={cancelSwapLoading} />
          <Button title={'no'} onClick={closeModal} />
        </ButtonGroup>
      </>
    )
  }
}

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;
  button:last-child {
    margin-left: 10px;
    background-color: #191436;
    border: 1px solid #9c62e7;
    color: #fff !important;

    &:hover {
      background-color: #9c62e7 !important;
      border-color: #9c62e7 !important;
      div {
        background: #9c62e7;
      }
    }
  }

  button:first-child {
    margin-right: 10px;
  }
`
const ConfirmationText = styled.div`
  margin-top: 0;
  text-align: center;
  margin-bottom: 60px;
  font-size: 20px;
`

export default CancelSwapModalContainer
