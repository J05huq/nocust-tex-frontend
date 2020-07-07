import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { AppState } from '../../state'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { OrderBookState, setNumberOfDecimals } from '../../state/orderBook'
import Block from '../../ui/Block'
import Loading from '../../ui/LoadingSpinner'
import OrderBookChart from './OrderBookChart'
import { HeaderState } from '../../state/header'
import { Trans } from 'react-i18next'

interface Props {
  state: OrderBookState
  headerState: HeaderState
}

class OrderBookContainer extends Component<Props & { dispatch }, State> {
  state: State = { dropDownOpen: false, decimals: [2, 5, 8] }
  render() {
    const { isLoading, orderBookData } = this.props.state
    const { token } = this.props.headerState

    return (
      <Block title={'order_book'} className="orderBook_Block">
        <SelectContainer>
          <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
            <DropDownBtn caret>
              <Trans i18nKey={'decimal_scale'} /> : {this.props.state.decimals - 1}
            </DropDownBtn>
            <DropDownMenu>
              {this.state.decimals.map((decimal: number) => {
                return (
                  <DNavItem
                    key={decimal}
                    onClick={(e: any) =>
                      this.props.dispatch(setNumberOfDecimals(Number(decimal + 1)))
                    }
                  >
                    {decimal}
                  </DNavItem>
                )
              })}
            </DropDownMenu>
          </Dropdown>
        </SelectContainer>
        {!isLoading || Object.keys(orderBookData).length !== 0 ? (
          <div className={'order-book-container'}>
            <OrderBookChart orderBookData={orderBookData} token={token} />
          </div>
        ) : (
          <Loading />
        )}
      </Block>
    )
  }

  private toggle = () => this.setState({ dropDownOpen: !this.state.dropDownOpen })
}
interface State {
  dropDownOpen: boolean
  decimals: Array<number>
}

const mapStateToProps = (app: AppState): Props => ({
  state: app.orderBook,
  headerState: app.header,
})

export default connect(mapStateToProps)(OrderBookContainer)

const SelectContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 130px;
`

const DropDownBtn = styled(DropdownToggle)`
  width: 100%;
  border-radius: 50px;
  border: 0.5px solid #9c62e7;
  color: #fff;
  text-align: left;
  font-size: 11px;
  background: #191436;
  position: relative;
  padding-top: 4px;
  padding-bottom: 4px;
  &:after {
    color: #9c62e7;
    position: absolute;
    right: 11px;
    top: 12px;
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
  left: auto !important;
  min-width: 100%;
`

const DNavItem = styled(DropdownItem)`
  color: #fff;
  padding: 10px 15px;
  font-size: 10px;
  &:hover {
    background: #9c62e7 !important;
    cursor: pointer;
    color: #fff;
  }
  &:focus {
    outline: 0;
  }
`
