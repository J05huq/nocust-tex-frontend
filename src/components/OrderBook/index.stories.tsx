import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withStore } from '../../services/custom-addons/store'
import OrderBook from '.'
import BigNumber from 'bignumber.js'
import '../../styles/index.scss'
import { GlobalStyles } from '../../globalStyles'
import SBSectionWrapper from '../Common/SBSectionWrapper'

const orderStories = storiesOf('Order Book Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>
      <GlobalStyles />
      <SBSectionWrapper>{story()}</SBSectionWrapper>
    </StaticRouter>
  ))

orderStories.add('Order Book', () => <OrderBook />, {
  state: () => ({
    orderBook: {
      isLoading: false,
      orderBookData: {
        buyOrders: [
          {
            amount: new BigNumber(0.00018),
            amountPrimary: new BigNumber(0.009),
            amountSwapped: new BigNumber(0.009),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.00022),
            price: new BigNumber(0.02),
            totalAmount: new BigNumber(0.00018),
          },
          {
            amount: new BigNumber(0.00001),
            amountPrimary: new BigNumber(0.001),
            amountSwapped: new BigNumber(0.001),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.00022),
            price: new BigNumber(0.01),
            totalAmount: new BigNumber(0.00001),
          },
          {
            amount: new BigNumber(0.00003),
            amountPrimary: new BigNumber(0.01),
            amountSwapped: new BigNumber(0.01),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.00022),
            price: new BigNumber(0.003),
            totalAmount: new BigNumber(0.00003),
          },
          {
            amount: new BigNumber(0.00001),
            amountPrimary: new BigNumber(0.001),
            amountSwapped: new BigNumber(0.001),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.00022),
            price: new BigNumber(0.01),
            totalAmount: new BigNumber(0.00001),
          },
          {
            amount: new BigNumber(0.00003),
            amountPrimary: new BigNumber(0.01),
            amountSwapped: new BigNumber(0.01),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.00022),
            price: new BigNumber(0.003),
            totalAmount: new BigNumber(0.00003),
          },
        ],
        sellOrders: [
          {
            amount: new BigNumber(0.002),
            amountPrimary: new BigNumber(0.002),
            amountSwapped: new BigNumber(0.000066),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.033),
            totalAmount: new BigNumber(0.000066),
          },
          {
            amount: new BigNumber(0.001),
            amountPrimary: new BigNumber(0.001),
            amountSwapped: new BigNumber(0.00003),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.03),
            totalAmount: new BigNumber(0.00003),
          },
          {
            amount: new BigNumber(0.002),
            amountPrimary: new BigNumber(0.002),
            amountSwapped: new BigNumber(0.000066),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.033),
            totalAmount: new BigNumber(0.000066),
          },
          {
            amount: new BigNumber(0.001),
            amountPrimary: new BigNumber(0.001),
            amountSwapped: new BigNumber(0.00003),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.03),
            totalAmount: new BigNumber(0.00003),
          },
          {
            amount: new BigNumber(0.002),
            amountPrimary: new BigNumber(0.002),
            amountSwapped: new BigNumber(0.000066),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.033),
            totalAmount: new BigNumber(0.000066),
          },
          {
            amount: new BigNumber(0.001),
            amountPrimary: new BigNumber(0.001),
            amountSwapped: new BigNumber(0.00003),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.03),
            totalAmount: new BigNumber(0.00003),
          },
          {
            amount: new BigNumber(0.002),
            amountPrimary: new BigNumber(0.002),
            amountSwapped: new BigNumber(0.000066),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.033),
            totalAmount: new BigNumber(0.000066),
          },
          {
            amount: new BigNumber(0.001),
            amountPrimary: new BigNumber(0.001),
            amountSwapped: new BigNumber(0.00003),
            chance: new BigNumber(0),
            ordersTotalAmountSum: new BigNumber(0.000096),
            price: new BigNumber(0.03),
            totalAmount: new BigNumber(0.00003),
          },
        ],
      },
      error: '',
    },
  }),
})
