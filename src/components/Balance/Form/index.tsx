import React from 'react'
import { Trans } from 'react-i18next'
import { Table, Tooltip } from 'reactstrap'

class BalanceForm extends React.Component<Props, State> {
  state: State = {
    walletTooltipOpen: false,
    etherTooltipOpen: false,
    buttonTooltipOpen: false,
  }

  render() {
    return (
      <div className={'form-content'}>
        <Table className={'table table-borderless table-balances'}>
          <thead>
            <tr>
              <th className={'trn'} data-trn-key={'token'}>
                <Trans i18nKey={'balance_form_token_title'} />
              </th>
              <th className={'trn'} id={'ether'}>
                <Trans i18nKey={'balance_form_liquidity_title'} />
                <Tooltip
                  placement={'top'}
                  isOpen={this.state.etherTooltipOpen}
                  autohide={false}
                  target={'ether'}
                  toggle={this.toggleEther}
                >
                  <Trans i18nKey={'balance_hint'} />
                </Tooltip>
              </th>
            </tr>
          </thead>
          {this.props.children}
        </Table>
      </div>
    )
  }

  private toggleEther = () => this.setState({ etherTooltipOpen: !this.state.etherTooltipOpen })
}

interface State {
  walletTooltipOpen: boolean
  etherTooltipOpen: boolean
  buttonTooltipOpen: boolean
}

interface Props {
  keyword: string
  children: any
}

export default BalanceForm
