import { combineReducers, Action as ReduxAction } from 'redux'
import headerReducer, { HeaderState } from './header'
import BalanceReducer, { BalanceState } from './balance'
import OrderReducer, { OrderState } from './order'
import OrderBookReducer, { OrderBookState } from './orderBook'
import TransactionReducer, { TransactionState } from './transaction'
import HistoryReducer, { HistoryState } from './history'
import HubReducer, { HubState } from './hub'
import DashboardReducer, { DashboardState } from './dashboard'
import DetailWalletReducer, { DetailWalletState } from './detailWallet'
import WalletReducer, { WalletState } from './wallet'
import ModalReducer, { ModalState } from './modal'
import TradeHistoryReduced, { TradeHistoryState } from './tradeHistory'

export interface AppState {
  hub: HubState
  header: HeaderState
  balance: BalanceState
  order: OrderState
  orderBook: OrderBookState
  transaction: TransactionState
  history: HistoryState
  dashboard: DashboardState
  detailWallet: DetailWalletState
  wallet: WalletState
  modal: ModalState
  tradeHistory: TradeHistoryState
}

export type GetState = () => AppState

export interface Action extends ReduxAction {
  type: string
  context?: number | string
  payload?: any
}

export default combineReducers<AppState>({
  hub: HubReducer,
  header: headerReducer,
  balance: BalanceReducer,
  order: OrderReducer,
  orderBook: OrderBookReducer,
  transaction: TransactionReducer,
  history: HistoryReducer,
  dashboard: DashboardReducer,
  detailWallet: DetailWalletReducer,
  wallet: WalletReducer,
  modal: ModalReducer,
  tradeHistory: TradeHistoryReduced,
})
