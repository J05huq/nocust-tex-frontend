import _ from 'lodash'
import React from 'react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import deepmerge from 'deepmerge'
import isPlainObject from 'is-plain-object'
import { initI18n } from '../i18n'
import { initialState as transactionState } from '../../state/transaction/index'
import { initialState as balanceState } from '../../state/balance'
import { initialState as dashboardState } from '../../state/dashboard'
import { initialState as detailWalletState } from '../../state/detailWallet'
import { initialState as headerState } from '../../state/header'
import { initialState as hubState } from '../../state/hub'
import { initialState as modalState } from '../../state/modal'
import { initialState as orderState } from '../../state/order'
import { initialState as orderBookState } from '../../state/orderBook'
import { initialState as tradeHistoryState } from '../../state/tradeHistory'
import { initialState as walletState } from '../../state/wallet'

initI18n('en')

export const createMockStore = initialState => {
  let state = initialState
  const listeners = []

  return {
    dispatch(actionObj) {
      action(actionObj.type)(actionObj)
    },
    getState() {
      return state
    },
    setState(newState) {
      state = newState
      if (listeners.length) {
        listeners.forEach(listener => listener(state))
      }
    },
    subscribe(fn) {
      listeners.push(fn)
      return () => {
        const index = listeners.indexOf(fn)
        if (index) {
          listeners.splice(index, 1)
        }
      }
    },
  }
}

let store = createMockStore({})
let lastStoryInfo = { kind: '', story: '' }

const createInitialState = () => {
  return {
    header: headerState,
    balance: balanceState,
    order: orderState,
    orderBook: orderBookState,
    transaction: transactionState,
    hub: hubState,
    dashboard: dashboardState,
    detailWallet: detailWalletState,
    wallet: walletState,
    modal: modalState,
    tradeHistory: tradeHistoryState,
  }
}

const isSameStory = (s1, s2) => {
  return s1.kind === s2.kind && s1.story === s2.story
}

export const withStore = (storyFn, context) => {
  let state = context.parameters.state || {}
  if (typeof state === 'function') {
    state = state()
  }

  state = deepmerge(createInitialState(), state, {
    isMergeableObject: isPlainObject,
  })
  const storyInfo = _.pick(context, ['kind', 'story'])
  if (isSameStory(lastStoryInfo, context)) {
    store.setState(state)
  } else {
    store = createMockStore(state)
  }

  lastStoryInfo = storyInfo

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>{storyFn()}</I18nextProvider>
    </Provider>
  )
}
