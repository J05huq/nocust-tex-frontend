import React from 'react'
import { storiesOf } from '@storybook/react'
import { StaticRouter } from 'react-router-dom'
import { withKnobs } from '@storybook/addon-knobs'
import { withStore } from '../../services/custom-addons/store'
import Header from '.'
import '../../styles/index.scss'

const headerStories = storiesOf('Header Section', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(story => (
    <StaticRouter location={'/exchange/trade/fLQD-fETH'}>{story()}</StaticRouter>
  ))

headerStories.add('Header -- Logged Out', () => <Header />, {
  state: () => ({
    modal: {
      isOpenDemoModal: false,
    },
  }),
})

headerStories.add('Header -- Logged In', () => <Header />, {
  state: () => ({
    wallet: {
      walletAddress: '0xbe9B1bA9fA45E2297181fdc531B2788cFA817EE0',
    },
    modal: {
      isOpenDemoModal: false,
    },
  }),
})
