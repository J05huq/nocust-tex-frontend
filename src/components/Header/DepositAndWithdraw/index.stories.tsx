import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, radios } from '@storybook/addon-knobs'
import { withStore } from '../../../services/custom-addons/store'
import DepositAndWithdraw from '.'
import '../../../styles/index.scss'
import { GlobalStyles } from '../../../globalStyles'
import SBSectionWrapper from '../../Common/SBSectionWrapper'

const orderStories = storiesOf('Deposit And Withdraw Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>
      <GlobalStyles />
      <SBSectionWrapper shadow={'0 0 10px rgba(0,0,0,0.5)'} width={'500px'}>
        {story()}
      </SBSectionWrapper>
    </StaticRouter>
  ))

const label = 'activeTab'
const options = {
  deposit: 'deposit-tab',
  withdraw: 'withdraw-tab',
}
const defaultValue = 'deposit-tab'
const groupId = 'Tabs'

orderStories.add('Deposit And Withdraw', () => <DepositAndWithdraw />, {
  state: () => ({
    detailWallet: {
      tokenSelected: text('tokenSelected', 'fLQD'),
      withdrawalAddress: text('withdrawalAddress', ''),
      activeTab: radios(label, options, defaultValue, groupId),
      withdrawLoading: boolean('withdrawLoading', false),
    },
  }),
})
