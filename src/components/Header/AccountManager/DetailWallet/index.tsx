import React from 'react'
import { Trans } from 'react-i18next'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { HubStateType } from '../../../../state/hub'
import { DetailWalletState } from '../../../../state/detailWallet'
import { AppState } from '../../../../state'
import { HeaderState } from '../../../../state/header'
import { WalletState } from '../../../../state/wallet'

class DetailWalletContainer extends React.Component<Props & { dispatch }> {
  public render = () => {
    return (
      <Container>
        {this.props.walletAddress ? (
          <div>
            <InputField>
              <CTitle>
                <Trans i18nKey={'create_wallet_step4_title'} />
              </CTitle>
              <CInput type={'text'} value={this.props.walletAddress} disabled />
            </InputField>
            {this.getWalletStatusIcon()}
          </div>
        ) : (
          'Disconnected'
        )}
      </Container>
    )
  }

  private getWalletStatusIcon = () => {
    let icon = ''
    let color = ''
    if (this.props.walletStatus === HubStateType.SAFE) {
      icon = 'fa-check-circle'
      color = '#02a177'
    } else if (this.props.walletStatus === HubStateType.UNSAFE) {
      icon = 'fa-exclamation-circle'
      color = '#b1363f'
    } else {
      icon = 'fa-sync-alt'
      color = 'orange'
    }
    return (
      <StatusContainer>
        <StatusIcon className={`fas ${icon}`} color={color} />
        <StatusTitle className={'font-capitalize'}>{this.props.walletStatus}</StatusTitle>
      </StatusContainer>
    )
  }
}

interface Props {
  walletAddress: string
  walletStatus: HubStateType
  detailWallet: DetailWalletState
  headerState: HeaderState
  wallet: WalletState
}

const mapStateToProps = (app: AppState): Props => ({
  detailWallet: app.detailWallet,
  walletAddress: app.wallet.walletAddress,
  wallet: app.wallet,
  walletStatus: app.hub.safe,
  headerState: app.header,
})

export default connect(mapStateToProps)(DetailWalletContainer)

const Container = styled.div`
  margin-top: 30px;
`

const InputField = styled.div`
  text-align: left;
`

const CTitle = styled.p`
  font-size: 13px;
`

const StatusTitle = styled.p`
  font-size: 20px;
  text-transform: capitalize;
`

const CInput = styled.input`
  width: 100%;
  height: 34px;
  color: #fff;
  background: #191436;
  border: 1px solid #9c62e7;
  border-radius: 50px;
  padding: 18px;
  margin-bottom: 20px;
  box-shadow: none;
  outline: none;
`

const StatusContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`

const StatusIcon = styled.i`
  color: ${props => props.color};
  display: block;
  font-size: 30px;
`
