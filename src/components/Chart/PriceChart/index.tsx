import React from 'react'
import { connect } from 'react-redux'
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
} from 'charting_library/charting_library/charting_library.min'

import hubs from '../../../services/hubs'
import { AppState } from '../../../state'
import { HubState } from '../../../state/hub'

export interface ChartConfig {
  symbol: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']
  datafeedUrl: string
  libraryPath: ChartingLibraryWidgetOptions['library_path']
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']
  clientId: ChartingLibraryWidgetOptions['client_id']
  userId: ChartingLibraryWidgetOptions['user_id']
  fullscreen: ChartingLibraryWidgetOptions['fullscreen']
  autosize: ChartingLibraryWidgetOptions['autosize']
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides']
  containerId: ChartingLibraryWidgetOptions['container_id']
  overrides: ChartingLibraryWidgetOptions['overrides']
  customCssUrl: ChartingLibraryWidgetOptions['custom_css_url']
}

export interface Props {}
class PriceChartContainer extends React.Component<IProps> {
  private config: ChartConfig = {
    symbol: 'LQD/ETH',
    interval: '1D',
    containerId: 'tv_chart_container',
    datafeedUrl: hubs[this.props.hub.currentHub].tradingDataUrl,
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
    overrides: {
      'paneProperties.background': '#1E1A3A',
      'scalesProperties.backgroundColor': '#181436',
      'paneProperties.vertGridProperties.color': '#181436',
      'paneProperties.horzGridProperties.color': '#181436',
      'scalesProperties.textColor': '#525e80',
      'scalesProperties.lineColor': '#525e80',
      'drawingToolbar.background': 'red',
    },
    customCssUrl: '/static/css/chart.css',
  }

  private tvWidget: IChartingLibraryWidget | null = null
  private widgetOptions: ChartingLibraryWidgetOptions = {
    toolbar_bg: '#181436',
    symbol: this.config.symbol as string,
    datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this.config.datafeedUrl || ''),
    interval: this.config.interval as ChartingLibraryWidgetOptions['interval'],
    container_id: this.config.containerId as ChartingLibraryWidgetOptions['container_id'],
    library_path: this.config.libraryPath as string,
    locale: 'en',
    disabled_features: [
      'use_localstorage_for_settings',
      'header_symbol_search',
      'header_chart_type',
      'header_settings',
      'save_chart_properties_to_local_storage',
      'header_saveload',
      'display_market_status',
      'header_indicators',
      'header_compare',
      'header_resolutions',
      'go_to_date',
      'timeframes_toolbar',
      'volume_force_overlay',
    ],
    enabled_features: [
      'header_fullscreen_button',
      'side_toolbar_in_fullscreen_mode',
      'hide_left_toolbar_by_default',
    ],
    charts_storage_url: this.config.chartsStorageUrl,
    charts_storage_api_version: this.config.chartsStorageApiVersion,
    client_id: this.config.clientId,
    user_id: this.config.userId,
    fullscreen: this.config.fullscreen,
    autosize: this.config.autosize,
    studies_overrides: this.config.studiesOverrides,
    custom_css_url: this.config.customCssUrl,
    overrides: this.config.overrides,
  }
  componentDidMount() {
    // eslint-disable-next-line new-cap
    const tvWidget = new widget(this.widgetOptions)
    this.tvWidget = tvWidget
  }
  componentWillUnmount(): void {
    if (this.tvWidget !== null) {
      this.tvWidget.remove()
      this.tvWidget = null
    }
  }

  componentDidUpdate(prevProps, PrevState) {
    if (prevProps.hub.currentHub !== this.props.hub.currentHub) {
      if (this.tvWidget !== null) {
        this.tvWidget.remove()
        this.tvWidget = null
      }
      this.config.datafeedUrl = hubs[this.props.hub.currentHub].tradingDataUrl
      this.widgetOptions.datafeed = new (window as any).Datafeeds.UDFCompatibleDatafeed(
        this.config.datafeedUrl || '',
      )
      const tvWidget = new widget(this.widgetOptions)
      this.tvWidget = tvWidget
    }
  }
  render() {
    return (
      <div id={this.config.containerId} className={'TVChartContainer'} style={{ height: '100%' }} />
    )
  }
}

interface StateProps {
  hub: HubState
}
const mapStateToProps = (app: AppState): StateProps => ({
  hub: app.hub,
})

type IProps = Props & StateProps

export default connect(mapStateToProps)(PriceChartContainer)
