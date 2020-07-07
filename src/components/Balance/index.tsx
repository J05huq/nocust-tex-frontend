import React from 'react'
import styled from 'styled-components'
import Block from '../../ui/Block'
import BalanceForm from './Form'
import BalanceList from './Form/BalanceList'
import { connect } from 'react-redux'
import { AppState } from '../../state'
import { ModalState, toggleDepositAndWidthdrawalModal } from '../../state/modal'

interface Props {
  modal: ModalState
}

class BalanceContainer extends React.Component<Props & { dispatch }> {
  render() {
    return (
      <Block title={'balance'}>
        <ContentContainer>
          <BalanceForm keyword={`balance`}>
            <BalanceList />
          </BalanceForm>
        </ContentContainer>
        <BtnContainer>
          <DepositButton onClick={this.openDepositAndWithdrawalModal}>
            <i className="fa fa-wallet" /> Deposit & Withdrawal
          </DepositButton>
        </BtnContainer>
      </Block>
    )
  }

  private openDepositAndWithdrawalModal = () =>
    this.props.dispatch(toggleDepositAndWidthdrawalModal(true))
}

const mapStateToProps = (state: AppState): Props => ({
  modal: state.modal,
})
export default connect(mapStateToProps)(BalanceContainer)

const ContentContainer = styled.div`
  margin-left: 0;
  margin-right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding: 0px 13px;
  height: 100%;
`

const BtnContainer = styled.div`
  text-align: center;
`

const DepositButton = styled.button`
  i {
    color: #9c62e7;
    margin-right: 5px;
  }
  color: #fff;
  background: #161231;
  border: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  padding: 12px 20px;

  margin: 10px 0;
  font-size: 13px;
  cursor: pointer;
  outline: none !important;
  box-shadow: none !important;
  &:hover {
    background: #9c62e7;
    color: #fff;

    i {
      color: #fff;
    }
  }
`
