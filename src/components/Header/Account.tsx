import React from 'react'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class AccountSelect extends React.Component<Props, State> {
  state: State = { dropDownOpen: false }

  render() {
    const { accountType, changeSelectedValue } = this.props
    const walletString = localStorage.getItem('wallet_address')

    return (
      <div className={'select-container'}>
        <Dropdown
          isOpen={this.state.dropDownOpen}
          toggle={this.toggle}
          className={'account-select-dropdown'}
        >
          <DropDownBtn caret disabled={this.props.disabled}>
            <Trans i18nKey={accountType} />
          </DropDownBtn>
          <DropDownMenu className={'account-select-menu'}>
            <DNavItem onClick={() => changeSelectedValue('create_wallet')}>
              <Trans i18nKey={'create_wallet_account_title'} />
            </DNavItem>
            <DNavItem onClick={() => changeSelectedValue('import_wallet')}>
              <Trans i18nKey={'import_wallet_account_title'} />
            </DNavItem>
            {walletString ? (
              <DNavItem onClick={() => changeSelectedValue('details_wallet')}>
                <Trans i18nKey={'details_wallet_account_title'} />
              </DNavItem>
            ) : (
              ''
            )}
          </DropDownMenu>
        </Dropdown>
      </div>
    )
  }

  private toggle = () => this.setState({ dropDownOpen: !this.state.dropDownOpen })
}

interface State {
  dropDownOpen: boolean
}

interface Props {
  accountType: string
  changeSelectedValue: (value: string) => void
  disabled: boolean
}

export default AccountSelect

const DropDownBtn = styled(DropdownToggle)`
  width: 100%;
  border-radius: 50px;
  border: 1px solid #9c62e7;
  color: #fff;
  text-align: left;
  background: #191436;
  position: relative;
  &:after {
    color: #9c62e7;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  &:hover,
  &:focus,
  &:disabled {
    background: #9c62e7 !important;
    border-color: #9c62e7 !important;
    box-shadow: none !important;
    &:after {
      color: #fff;
    }
  }
`

const DropDownMenu = styled(DropdownMenu)`
  background-color: #13102b !important;
  right: 0;
`

const DNavItem = styled(DropdownItem)`
  color: #fff;
  padding: 10px 15px;
  &:hover {
    background: #9c62e7 !important;
    cursor: pointer;
    color: #fff;
  }
  &:focus {
    outline: 0;
  }
`
