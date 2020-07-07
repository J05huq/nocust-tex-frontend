import React from 'react'
import { Trans } from 'react-i18next'
import Button from '../../../ui/Button'
import styled from 'styled-components'

interface Props {
  close: () => void
  dontShowAgain: () => void
}

const DemoModal = (props: Props) => {
  return (
    <>
      <WarningText>
        <IconContainer>
          <i className="fa fa-exclamation-circle warning"></i>
        </IconContainer>
        <Trans i18nKey={'demo_modal_text'} />
      </WarningText>
      <ButtonGroup>
        <Button title={'ok'} onClick={props.close} />
        <Button title={'dont_show_again'} onClick={props.dontShowAgain} />
      </ButtonGroup>
    </>
  )
}

export default DemoModal

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
const WarningText = styled.div`
  margin-top: 0;
  text-align: center;
  margin-bottom: 60px;
  font-size: 15px;
`

const IconContainer = styled.div`
  text-align: center;
  i {
    color: orange;
    font-size: 50px;
    margin-bottom: 20px;
  }
`
