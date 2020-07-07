import React from 'react'
import { Trans } from 'react-i18next'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import styled from 'styled-components'

import { fSymbolToMainSymbol } from '../../../utils'

export default class TabsContainer extends React.Component<Props> {
  render() {
    const { currentTabId, onChangeTab, tabs, renderTabContent, suffixTab } = this.props

    return (
      <Tabs defaultTab={currentTabId} onChange={onChangeTab}>
        <StyledTabs>
          {tabs.map((tab, i) => {
            return (
              <TabButton
                key={i}
                className={currentTabId === tab.id ? 'active' : ''}
                tabFor={tab.id}
              >
                {tab.icon ? <i className={tab.icon} style={{ color: tab.color }} /> : ''}
                <Trans i18nKey={tab.label} />
                {suffixTab && tab.id !== 'transfer' ? ` ${fSymbolToMainSymbol(suffixTab)}` : ''}
              </TabButton>
            )
          })}
        </StyledTabs>
        {tabs.map((tab, index) => {
          return (
            <TabPanel key={index} className={'tab-content'} tabId={tab.id}>
              {renderTabContent(tab.id)}
            </TabPanel>
          )
        })}
      </Tabs>
    )
  }
}

export interface Props {
  currentTabId: string
  onChangeTab: (tabId: string) => void
  tabs: Array<{
    id: string
    label: string
    icon?: string
    color?: string
  }>
  renderTabContent: (tabId: string) => any
  suffixTab?: string
}

const StyledTabs = styled(TabList)`
  margin-bottom: 10px;
  background-color: #161231;
  border-radius: 50px;
  padding: 4px;
  display: flex;
  flex-direction: row;
`

const TabButton = styled(Tab)`
  border-radius: 50px;
  padding: 0.5rem 0;
  flex: 0 0 50%;
  background: transparent;
  color: #525e80;
  border: 0;
  cursor: pointer;
  i {
    margin-right: 6px;
    opacity: 0.5;
  }
  &.active {
    background-color: #251e4c;
    i {
      opacity: 1;
    }
    color: #fff;
    border: 0;
    border-radius: 50px;
    outline: none;
    box-shadow: none;
  }
`
