import React, { PureComponent } from 'react'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import { Tooltip } from 'reactstrap'

import { HubStateType } from '../../state/hub'

interface Props {
  title: string
  search?: boolean
  onChange?: (searchValue: any) => void
  searchValue?: string
  walletStatus?: string
  className?: string
}

interface State {
  tooltipOpen: boolean
}

export default class Block extends PureComponent<Props, State> {
  state: State = {
    tooltipOpen: false,
  }

  render() {
    const { title, children, search, searchValue, onChange, walletStatus, className } = this.props

    return (
      <Container className={className ? className : ''}>
        <Header>
          <Trans i18nKey={title} />

          {search ? (
            <div className={'search-wrapper'}>
              <i className="fas fa-search" />

              <input
                type={'text'}
                className={'search-input'}
                placeholder={'Search'}
                value={searchValue}
                onChange={onChange}
              />
            </div>
          ) : null}

          {walletStatus ? (
            <>
              <div id={'wallet_status'} className={`status ${walletStatus}`} />

              <Tooltip
                placement={'left'}
                isOpen={this.state.tooltipOpen}
                autohide={false}
                target={'wallet_status'}
                toggle={this.toggleTooltip}
              >
                {this.tooltipText()}
              </Tooltip>
            </>
          ) : null}
        </Header>

        {children}
      </Container>
    )
  }

  private toggleTooltip = () => this.setState({ tooltipOpen: !this.state.tooltipOpen })

  private tooltipText = (): any => {
    const { walletStatus } = this.props
    if (walletStatus === HubStateType.SAFE) {
      return 'online'
    } else if (walletStatus === HubStateType.LOADING) {
      return 'syncing'
    } else if (walletStatus === HubStateType.UNSAFE) {
      return 'offline'
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: nowrap;
  font-size: 0.875rem;
  background-color: #1e1a3a;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 16%);
  &.orderBook_Block {
    position: relative;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: none;
  font-size: 16px;
  font-family: $font-family-normal;
  padding: 10px 12px 0px;
  font-weight: 400;
`
