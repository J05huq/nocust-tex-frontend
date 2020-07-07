import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs, array, boolean } from '@storybook/addon-knobs'
import { withStore } from '../../services/custom-addons/store'
import TradeHistory from '.'
import '../../styles/index.scss'
import { GlobalStyles } from '../../globalStyles'
import SBSectionWrapper from '../Common/SBSectionWrapper'

const orderStories = storiesOf('Trade History Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>
      <GlobalStyles />
      <SBSectionWrapper>{story()}</SBSectionWrapper>
    </StaticRouter>
  ))

orderStories.add('Trade History', () => <TradeHistory />, {
  state: () => ({
    tradeHistory: {
      tradeHistoryTransactions: array('tradeHistoryTransactions', [
        {
          price: 0.001,
          amount: 0.001,
          date: '2019-08-08T23:40:56.776Z',
          orderType: 'buy',
        },
        {
          price: 0.001,
          amount: 0.001,
          date: '2019-08-07T15:57:07.277Z',
          orderType: 'buy',
        },
        {
          price: 0.001,
          amount: 0.001,
          date: '2019-08-07T15:55:06.982Z',
          orderType: 'sell',
        },
        {
          price: 0.001,
          amount: 0.001,
          date: '2019-08-07T15:42:48.830Z',
          orderType: 'sell',
        },
        {
          price: 0.001,
          amount: 0.001,
          date: '2019-08-07T15:42:23.901Z',
          orderType: 'buy',
        },
        {
          price: 0.001,
          amount: 0.001,
          date: '2019-08-07T15:40:35.572Z',
          orderType: 'sell',
        },
      ]),
      isLoading: boolean('isLoading', 'false'),
      dataLoaded: boolean('dataLoaded', 'true'),
    },
  }),
})
