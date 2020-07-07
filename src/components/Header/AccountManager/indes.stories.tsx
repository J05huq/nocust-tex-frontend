import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, text } from '@storybook/addon-knobs'
import { withStore } from '../../../services/custom-addons/store'
import AccountManagerContainer from './AccountManager'
import '../../../styles/index.scss'
import { GlobalStyles } from '../../../globalStyles'
import SBSectionWrapper from '../../Common/SBSectionWrapper'

const accountManagerStories = storiesOf('Account Manager Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>
      <GlobalStyles />
      <SBSectionWrapper>{story()}</SBSectionWrapper>
    </StaticRouter>
  ))

const label = 'Select Option'
const options = {
  create_wallet: 'create_wallet',
  import_wallet: 'import_wallet',
  details_wallet: 'details_wallet',
}
const defaultValue = 'create_wallet'
const groupId = 'Tabs'

accountManagerStories.add('Account Manager', () => <AccountManagerContainer />, {
  state: () => ({
    header: {
      selectedAccountType: radios(label, options, defaultValue, groupId),
    },
    hub: {
      safe: text('safe', 'safe'),
    },
    wallet: {
      walletAddress: text('walletAddress', '0x43695022751197421d04bf8e819f346bf1917ad4'),
    },
  }),
})
