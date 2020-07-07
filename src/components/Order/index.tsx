import React from 'react'
import { connect } from 'react-redux'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import { Formik, ErrorMessage } from 'formik'
import { ErrorMsg, MAIN_COLOR } from '../../globalStyles'
import { AppState } from '../../state'
import { HeaderState } from '../../state/header'
import {
  changeOrderTab,
  OrderState,
  OrderType,
  sendSwap,
  setIncomingOrder,
  setFiatAmount,
  setFiatPrice,
} from '../../state/order'
import Block from '../../ui/Block'
import Tabs from '../Common/Tabs'
import Form from '../Common/Form'
import Input from '../Common/Input'
import Button from '../../ui/Button'
import { roundBN, pairToTokens, fiatAmount } from '../../utils'
import BigNumber from 'bignumber.js'
import Validation from './validation'
import 'react-toastify/dist/ReactToastify.css'
import { BalanceState } from '../../state/balance'
import { HubState } from '../../state/hub'

interface Props {
  state: OrderState
  headerState: HeaderState
  hubState: HubState
  balanceState: BalanceState
}

interface State {
  tooltipOpen: boolean
}

class OrderContainer extends React.Component<Props & { dispatch }, State> {
  state: State = {
    tooltipOpen: false,
  }

  render() {
    return (
      <Block title={'order'}>
        <ContentContainer>
          <Tabs
            currentTabId={this.props.state.currentTabId}
            onChangeTab={this.onChangeTab}
            tabs={orderTab}
            renderTabContent={this.renderTabContent}
            suffixTab={this.primaryToken()}
          />
        </ContentContainer>
      </Block>
    )
  }

  private onChangeTab = (tabId): void => {
    this.props.dispatch(changeOrderTab(tabId))
  }

  private primaryToken = (): string => {
    return pairToTokens(this.props.headerState.token)[0]
  }

  private secondToken = (): string => {
    return pairToTokens(this.props.headerState.token)[1]
  }

  private renderTabContent = (tabId: string): any => {
    const { leftOffChainBalance, rightOffChainBalance } = this.props.balanceState

    return (
      <Formik
        initialValues={{
          limit_price: this.props.state.incomingOrder.price,
          order_amount: this.props.state.incomingOrder.amount,
        }}
        enableReinitialize={true}
        onSubmit={this.onSubmit}
        validationSchema={Validation.orderForm}
        validate={values => {
          let errors = {}
          const orderAmount = new BigNumber(values.order_amount)
          if (tabId === 'sell_order') {
            const balance = new BigNumber(leftOffChainBalance)
            if (orderAmount.gt(balance)) {
              errors = { ...errors, order_amount: 'Insufficient Balance!' }
            }
          } else {
            const balance = new BigNumber(rightOffChainBalance)
            const limitPrice = new BigNumber(values.limit_price)
            const total = limitPrice.times(orderAmount)
            if (total.gt(balance)) {
              errors = { ...errors, order_amount: 'Insufficient Balance!' }
            }
          }
          return errors
        }}
      >
        {props => {
          const { handleChange, values, handleSubmit, handleBlur } = props
          const orderAmountBN = new BigNumber(values.order_amount)
          const limitPriceBN = new BigNumber(values.limit_price)
          const totalPrice = orderAmountBN.times(limitPriceBN)
          const baseToken = this.secondToken().slice(1)
          const summaryFiatPrice = fiatAmount(
            String(totalPrice),
            baseToken,
            this.props.hubState.tokensMetaData,
          )

          return (
            <Form onSubmit={handleSubmit}>
              <Input
                id={`limit_price`}
                title={'order_limit_price'}
                tip={this.props.state.fiatPrice}
                unit={this.secondToken()}
                value={values.limit_price}
                placeholder={'0.0000'}
                onBlur={handleBlur}
                onChange={e => {
                  handleChange(e)
                  this.setFiatAmount(e.target.value, this.secondToken())
                }}
                maxFun={e => this.setMaxAmount(e, this.secondToken())}
              />
              <ErrorMessage name={'limit_price'} render={msg => <ErrorMsg>{msg}</ErrorMsg>} />
              <Input
                id={`order_amount`}
                title={'order_amount'}
                tip={this.props.state.fiatAmount}
                unit={this.primaryToken()}
                value={values.order_amount}
                placeholder={'0.0000'}
                onBlur={handleBlur}
                onChange={e => {
                  handleChange(e)
                  this.setFiatAmount(e.target.value, this.primaryToken())
                }}
                maxFun={e => this.setMaxAmount(e, this.primaryToken())}
              />
              <ErrorMessage name={'order_amount'} render={msg => <ErrorMsg>{msg}</ErrorMsg>} />

              <TextContainer>
                <LabelText>
                  <Trans i18nKey={'order_summary'} />
                </LabelText>
                <SideText>{`$${summaryFiatPrice}`}</SideText>
              </TextContainer>
              <BorderedContainer>
                <TextContainer>
                  <TextBlock>
                    <Trans i18nKey={'order_sub_total'} />
                  </TextBlock>
                  <TextBlock>
                    {roundBN(totalPrice.isNaN() ? new BigNumber(0) : totalPrice, 10)}{' '}
                  </TextBlock>
                </TextContainer>

                <TextContainer>
                  <TextBlock>
                    <Trans i18nKey={'order_fee'} />
                  </TextBlock>
                  <TextBlock>0</TextBlock>
                </TextContainer>
                <HR />
                <TextContainer>
                  <TextNoMargin>
                    <Trans i18nKey={'order_total'} />
                  </TextNoMargin>
                  <TextNoMargin>
                    {roundBN(totalPrice.isNaN() ? new BigNumber(0) : totalPrice, 10)}{' '}
                    {this.secondToken()}
                  </TextNoMargin>
                </TextContainer>
              </BorderedContainer>
              <Button title={`${tabId}_button_title`} id={`order_button`} type={'submit'} />
            </Form>
          )
        }}
      </Formik>
    )
  }

  private setFiatAmount = (amount, token: string) => {
    const baseToken = token.slice(1)
    const tokenData = this.props.hubState.tokensMetaData
    if (token === this.secondToken()) {
      this.props.dispatch(setFiatPrice(fiatAmount(amount, baseToken, tokenData)))
    } else {
      this.props.dispatch(setFiatAmount(fiatAmount(amount, baseToken, tokenData)))
    }
  }
  private setMaxAmount = (e: Event, token: String) => {
    e.preventDefault()
    const basetoken = token.slice(1)
    const tokenData = this.props.hubState.tokensMetaData
    if (token === this.secondToken()) {
      this.props.dispatch(
        setIncomingOrder({
          price: this.props.balanceState.leftOffChainBalance,
          amount: this.props.state.incomingOrder.amount,
        }),
      )
      this.props.dispatch(
        setFiatPrice(fiatAmount(this.props.balanceState.leftOffChainBalance, basetoken, tokenData)),
      )
    } else {
      this.props.dispatch(
        setIncomingOrder({
          price: this.props.state.incomingOrder.price,
          amount: this.props.balanceState.rightOffChainBalance,
        }),
      )

      this.props.dispatch(
        setFiatAmount(
          fiatAmount(this.props.balanceState.rightOffChainBalance, basetoken, tokenData),
        ),
      )
    }
  }

  private onSubmit = async (values, { setSubmitting }) => {
    const orderAmount = new BigNumber(values.order_amount)
    const limitPrice = new BigNumber(values.limit_price)
    const type = this.props.state.currentTabId === OrderType.BUY ? 'BUY' : 'SELL'
    try {
      this.addSwap(orderAmount, limitPrice, type)
      setSubmitting(false)
    } catch (err) {
      console.log(err)
    }
  }

  private addSwap = (amount, price, type) => {
    const { dispatch } = this.props
    dispatch(sendSwap(amount, price, type))
  }
}

const mapStateToProps = (app: AppState): Props => ({
  state: app.order,
  headerState: app.header,
  hubState: app.hub,
  balanceState: app.balance,
})

export default connect(mapStateToProps)(OrderContainer)

const orderTab = [
  {
    id: OrderType.BUY,
    label: `${OrderType.BUY}_button_title`,
    icon: 'fa fa-arrow-circle-right',
    color: '#02a177',
  },
  {
    id: OrderType.SELL,
    label: `${OrderType.SELL}_button_title`,
    icon: 'fa fa-arrow-circle-left',
    color: '#B1363F',
  },
]

const ContentContainer = styled.div`
  margin-left: 0;
  margin-right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding: 12px 13px;
  height: 100%;
`

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
`

const TextBlock = styled.p`
  line-height: 1;
  font-size: 13px;
  &:first-child {
    color: #afb9ca;
  }
`

const LabelText = styled(TextBlock)`
  margin-bottom: 10px;
`

const HR = styled.hr`
  background-color: ${MAIN_COLOR};
  margin-top: 0;
`

const BorderedContainer = styled.div`
  border-radius: 10px;
  border: 1px solid ${MAIN_COLOR};
  padding: 12px 15px;
  margin-bottom: 10px;
`

const TextNoMargin = styled(TextBlock)`
  margin-bottom: 0;
`

const SideText = styled.span`
  color: #adbbcd;
`
