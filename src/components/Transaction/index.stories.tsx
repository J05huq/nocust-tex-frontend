import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, array, radios } from '@storybook/addon-knobs'
import { withStore } from '../../services/custom-addons/store'
import Transaction from '.'
import '../../styles/index.scss'
import { GlobalStyles } from '../../globalStyles'
import SBSectionWrapper from '../Common/SBSectionWrapper'

const transactionStories = storiesOf('Transaction Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>
      <GlobalStyles />
      <SBSectionWrapper width={'900px'}>{story()}</SBSectionWrapper>
    </StaticRouter>
  ))

const label = 'activeTab'
const options = {
  Open: 'OPEN_TAB',
  Closed: 'CLOSED_TAB',
}
const defaultValue = 'OPEN_TAB'
const groupId = 'Tabs'

transactionStories.add('Transaction', () => <Transaction />, {
  state: () => ({
    transaction: {
      transactionsLoading: boolean('transactionsLoading', false),
      transactions: array('transactions', [
        {
          type: 'sell',
          state: 'pending',
          date: '2019/07/31, 1:59:20 PM',
          amount: 2,
          price: 2,
          id: '7693',
          filled: 0,
          isPending: true,
          leftToken: 'LQD',
          rightToken: 'ETH',
        },
        {
          type: 'buy',
          state: 'pending',
          date: '2019/07/30, 2:34:50 PM',
          amount: 0.1,
          price: 0.0001,
          id: '7647',
          filled: 0,
          isPending: true,
          leftToken: 'LQD',
          rightToken: 'ETH',
        },

        {
          type: 'sell',
          state: 'expired',
          date: '2019/07/31, 1:59:20 PM',
          amount: 2,
          price: 2,
          id: '7693',
          filled: 0,
          isPending: false,
          leftToken: 'LQD',
          rightToken: 'ETH',
        },
        {
          type: 'buy',
          state: 'matched',
          date: '2019/07/30, 2:34:50 PM',
          amount: 0.1,
          price: 0.0001,
          id: '7647',
          filled: 0,
          isPending: false,
          leftToken: 'LQD',
          rightToken: 'ETH',
        },
      ]),
      error: text('error', ''),
      fetchPendingTransactionsRunning: boolean('fetchPendingTransactionsRunning', false),
      fetchTransactionsRunning: boolean('fetchTransactionsRunning', false),
      activeTab: radios(label, options, defaultValue, groupId),
      sortField: text('sortField', 'date'),
      isSortAsc: boolean('transactionsLoading', false),
    },
  }),
})
