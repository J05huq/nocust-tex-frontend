import React from 'react'
import styled from 'styled-components'
import { Tabs, Tab, TabList, TabPanel } from 'react-web-tabs'
import { ChartTab, setChartTab, DashboardState } from '../../../src/state/dashboard'
import { Trans } from 'react-i18next'
import { AppState } from '../../../src/state'
import { connect } from 'react-redux'
import CumulativeChart from './CumulativeChart'
import PriceChart from './PriceChart'

interface Props {
  dashboardState: DashboardState
}

class ChartContainer extends React.Component<Props & { dispatch }> {
  render() {
    const { chartTab } = this.props.dashboardState
    return (
      <TabsContainer onChange={this.onTabChange}>
        <TabHeader>
          <Trans i18nKey={'charts'} />
          <StyledTabs>
            <TabButton
              tabFor={ChartTab.PRICE_CHART_TAB}
              className={chartTab === ChartTab.PRICE_CHART_TAB ? 'active' : ''}
            >
              Price Chart
            </TabButton>
            <TabButton
              tabFor={ChartTab.DEPTH_CHART_TAB}
              className={chartTab === ChartTab.DEPTH_CHART_TAB ? 'active' : ''}
            >
              Depth Chart
            </TabButton>
          </StyledTabs>
        </TabHeader>
        <CTabPanel tabId={ChartTab.DEPTH_CHART_TAB}>
          <CumulativeChart />
        </CTabPanel>
        <CTabPanel tabId={ChartTab.PRICE_CHART_TAB}>
          <PriceChart />
        </CTabPanel>
      </TabsContainer>
    )
  }
  private onTabChange = (tabId: ChartTab) => {
    const { dispatch } = this.props
    dispatch(setChartTab(tabId))
  }
}

const TabsContainer = styled(Tabs)`
  height: 100%;
  position: relative;
  background-color: #1e1a3a;
`
const CTabPanel = styled(TabPanel)`
  height: calc(100% - 57px);
  position: relative;
`
const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 20px;
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

const mapStateToProps = (app: AppState): Props => ({
  dashboardState: app.dashboard,
})

export default connect(mapStateToProps)(ChartContainer)
