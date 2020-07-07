import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, radios } from '@storybook/addon-knobs'
import { withStore } from '../../services/custom-addons/store'
import Order from '.'
import '../../styles/index.scss'
import { GlobalStyles } from '../../globalStyles'
import SBSectionWrapper from '../Common/SBSectionWrapper'

const orderStories = storiesOf('Order Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>
      <GlobalStyles />
      <SBSectionWrapper>{story()}</SBSectionWrapper>
    </StaticRouter>
  ))

const label = 'currentTabId'
const options = {
  Buy: 'buy_order',
  Sell: 'sell_order',
}
const defaultValue = 'buy_order'
const groupId = 'Tabs'

orderStories.add('Order', () => <Order />, {
  state: () => ({
    order: {
      orderLimitPrice: number('orderLimitPrice', '0'),
      currentTabId: radios(label, options, defaultValue, groupId),
    },
  }),
})
