import React from 'react'
import { storiesOf } from '@storybook/react'
import { StaticRouter } from 'react-router-dom'
import { withKnobs, number } from '@storybook/addon-knobs'
import { withStore } from '../../services/custom-addons/store'
import Balance from '.'
import '../../styles/index.scss'
import { GlobalStyles } from '../../globalStyles'
import SBSectionWrapper from '../Common/SBSectionWrapper'

const balanceStories = storiesOf('Balance Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>
      <GlobalStyles />
      <SBSectionWrapper>{story()}</SBSectionWrapper>
    </StaticRouter>
  ))

balanceStories.add('Balance', () => <Balance />, {
  state: () => ({
    balance: {
      leftOffChainBalance: number('leftOffChainBalance', '0.0001'),
      rightOffChainBalance: number('rightOffChainBalance', '0.0002'),
    },
  }),
})
