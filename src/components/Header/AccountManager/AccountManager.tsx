import React from 'react'
import { Trans } from 'react-i18next'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../../state'
import AccountSelect from '../Account'
import { changeSelectedAccountType, HeaderState } from '../../../state/header'
import CreateWallet from './CreateWallet'
import ImportWallet from './ImportWallet'
import DetailWalletContainer from './DetailWallet'

interface Props {
  header: HeaderState
}

class AccountManagerContainer extends React.Component<Props & { dispatch }> {
  render() {
    return (
      <div className={'account-manager'}>
        <PTitle>
          <Trans i18nKey={'wallet_modal_type_select_title'} />
        </PTitle>
        <AccountSelect
          accountType={accountType[this.props.header.selectedAccountType]}
          changeSelectedValue={this.changeSelectedAccountType}
          disabled={this.props.header.disabledMenu}
        />
        {this.renderRelationForm()}
      </div>
    )
  }

  private renderRelationForm = (): any => {
    if (this.props.header.selectedAccountType === 'create_wallet') {
      return <CreateWallet />
    } else if (this.props.header.selectedAccountType === 'import_wallet') {
      return <ImportWallet />
    } else if (this.props.header.selectedAccountType === 'details_wallet') {
      return <DetailWalletContainer />
    }
  }

  private changeSelectedAccountType = (selectedAccountType: string) =>
    this.props.dispatch(changeSelectedAccountType(selectedAccountType))
}

const mapStateToProps = (state: AppState): Props => ({
  header: state.header,
})

export default connect(mapStateToProps)(AccountManagerContainer)

const accountType = {
  create_wallet: 'create_wallet_account_title',
  import_wallet: 'import_wallet_account_title',
  details_wallet: 'details_wallet_account_title',
}

const PTitle = styled.p`
  font-size: 14px;
  width: 100%;
  text-align: left;
`
