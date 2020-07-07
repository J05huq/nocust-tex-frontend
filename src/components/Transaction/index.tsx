import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, TabList, TabPanel } from 'react-web-tabs'
import styled from 'styled-components'
import { AppState } from '../../state'
import {
  TransactionState,
  TransactionTabs,
  setActiveTab,
  sortTransactionsTable,
  cancelSwap,
  setCancelSwapTxId,
  TransactionStateType,
} from '../../state/transaction'
import Loading from '../../ui/LoadingSpinner'
import TransactionTable from './TransactionTable'
import Modal from '../../../src/components/Common/Modal'
import { toggleCancelSwapModal, ModalState } from '../../../src/state/modal'
import { Trans } from 'react-i18next'
import CancelSwapModal from './CancelSwapModal'

interface Props {
  state: TransactionState
  modalState: ModalState
}

class TransactionContainer extends React.Component<Props & { dispatch }, {}> {
  render() {
    const {
      activeTab,
      transactions,
      transactionsLoading,
      sortField,
      cancelSwapLoading,
    } = this.props.state
    const { dispatch, modalState } = this.props
    return (
      <Container onChange={this.onTabChange}>
        <Modal
          isModalOpen={modalState.isOpenCancelSwapModal}
          title={''}
          toggleModal={() => dispatch(toggleCancelSwapModal(false))}
        >
          <CancelSwapModal
            cancelSwap={() => dispatch(cancelSwap())}
            closeModal={() => dispatch(toggleCancelSwapModal(false))}
            cancelSwapLoading={cancelSwapLoading}
          />
        </Modal>
        <TabHeader>
          <Trans i18nKey={'transaction'} />
          <StyledTabs>
            <TabButton
              tabFor={TransactionTabs.OPEN_TAB}
              className={activeTab === TransactionTabs.OPEN_TAB ? 'active' : ''}
            >
              Open
            </TabButton>
            <TabButton
              tabFor={TransactionTabs.CLOSED_TAB}
              className={activeTab === TransactionTabs.CLOSED_TAB ? 'active' : ''}
            >
              Closed
            </TabButton>
          </StyledTabs>
        </TabHeader>
        <CTabPanel tabId={TransactionTabs.OPEN_TAB}>
          {!transactionsLoading ? (
            <div className={'transaction-container'}>
              <TransactionTable
                transactions={transactions.filter(
                  transaction => transaction.status === TransactionStateType.PENDING,
                )}
                sortTransactions={(field: string) => dispatch(sortTransactionsTable(field))}
                sortField={sortField}
                requestCancelSwap={this.requestCancelSwap}
                type={'open'}
              />
            </div>
          ) : (
            <LoaderContainer>
              <Loading />
            </LoaderContainer>
          )}
        </CTabPanel>
        <CTabPanel tabId={TransactionTabs.CLOSED_TAB}>
          {!transactionsLoading ? (
            <div className={'transaction-container'}>
              <TransactionTable
                transactions={transactions.filter(
                  transaction => transaction.status !== TransactionStateType.PENDING,
                )}
                sortTransactions={(field: string) => dispatch(sortTransactionsTable(field))}
                sortField={sortField}
                requestCancelSwap={this.requestCancelSwap}
                type={'closed'}
              />
            </div>
          ) : (
            <LoaderContainer>
              <Loading />
            </LoaderContainer>
          )}
        </CTabPanel>
      </Container>
    )
  }

  private onTabChange = (tabId: TransactionTabs) => {
    const { dispatch } = this.props
    dispatch(setActiveTab(tabId))
  }

  private requestCancelSwap = (flag: boolean, id: number) => {
    const { dispatch } = this.props
    dispatch(setCancelSwapTxId(id))
    dispatch(toggleCancelSwapModal(flag))
  }
}

const mapStateToProps = (app: AppState): Props => ({
  state: app.transaction,
  modalState: app.modal,
})

export default connect(mapStateToProps)(TransactionContainer)

const Container = styled(Tabs)`
  height: 100%;
  position: relative;
  background-color: #1e1a3a;
`
const CTabPanel = styled(TabPanel)`
  height: calc(100% - 78px);
  position: relative;
`
const StyledTabs = styled(TabList)`
  background: transparent;
  border: none;
  border-image: none !important;
`

const TabButton = styled(Tab)`
  font-size: 13px;
  padding-top: 0px;
  padding-bottom: 10px;
  margin-left: 10px;
  background: transparent;
  color: #525e80 !important;
  border: 0;
  cursor: pointer;
  &.active {
    color: #adbbcd !important;
    border-bottom: solid 3px #9c62e7;
    outline: none;
    box-shadow: none;
  }
`
const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 20px;
`

const LoaderContainer = styled.div`
  position: relative;
  top: 35%;
`
