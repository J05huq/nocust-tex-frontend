import React from 'react'
import { OrderBookState } from '../../../state/orderBook'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import { SwapTransactionType } from '../../../state/history'
import { OrderType } from '../../../state/order'
import BigNumber from 'bignumber.js'
import { AppState } from '../../../state'
import { connect } from 'react-redux'

class CumulativeChartContainer extends React.Component<Props & { dispatch }> {
  private chart: am4charts.XYChart

  componentDidMount() {
    this.initChart()
    this.buildChartData()
  }

  private initChart = () => {
    this.chart = am4core.create('chartdiv', am4charts.XYChart)
    this.chart.numberFormatter.numberFormat = '#,###.####'
    this.chart.cursor = new am4charts.XYCursor()
    this.chart.cursor.lineX.stroke = am4core.color('#FCF8E3')
    this.chart.cursor.lineY.stroke = am4core.color('#FCF8E3')
    this.initAxes()
    this.initSeries()
  }

  private initAxes = () => {
    let xAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'price'
    xAxis.renderer.minGridDistance = 50
    xAxis.title.text = 'Price (LQD/ETH)'
    xAxis.title.fontSize = '13px'
    xAxis.title.fill = am4core.color('#B0B9CA')
    xAxis.renderer.labels.template.fill = am4core.color('#B0B9CA')
    xAxis.renderer.labels.template.fontSize = '12px'
    xAxis.title.fontWeight = 'bold'
    let yAxis = this.chart.yAxes.push(new am4charts.ValueAxis())
    yAxis.title.text = 'Amount'
    yAxis.title.fontSize = '13px'
    yAxis.title.fill = am4core.color('#B0B9CA')
    yAxis.renderer.labels.template.fill = am4core.color('#B0B9CA')
    yAxis.renderer.labels.template.fontSize = '12px'
    yAxis.title.fontWeight = 'bold'
  }

  private initSeries = () => {
    let series = this.chart.series.push(new am4charts.StepLineSeries())
    series.dataFields.categoryX = 'price'
    series.dataFields.valueY = 'buyCumulativeAmount'
    series.strokeWidth = 2
    series.stroke = am4core.color('#28863C')
    series.fill = series.stroke
    series.fillOpacity = 0.1
    series.tooltipText =
      'Buy: [bold]{categoryX}[/]\nTotal amount: [bold]{valueY}[/]\nAmount: [bold]{buyAmount}[/]'
    if (series.tooltip) {
      series.tooltip.label.fontSize = '13px'
    }
    let series2 = this.chart.series.push(new am4charts.StepLineSeries())
    series2.dataFields.categoryX = 'price'
    series2.dataFields.valueY = 'sellCumulativeAmount'
    series2.strokeWidth = 2
    series2.stroke = am4core.color('#902F3D')
    series2.fill = series2.stroke
    series2.fillOpacity = 0.1
    series2.tooltipText =
      'Sell: [bold]{categoryX}[/]\nTotal amount: [bold]{valueY}[/]\nAmount: [bold]{sellAmount}[/]'
    if (series2.tooltip) {
      series2.tooltip.label.fontSize = '13px'
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
  }

  componentDidUpdate() {
    this.buildChartData()
  }

  private buildChartData = () => {
    const { orderBookData } = this.props.orderBookState

    if (Object.keys(orderBookData).length !== 0) {
      const { buyOrders, sellOrders } = orderBookData
      this.chart.data = [
        ...this.processOrders(buyOrders, OrderType.BUY),
        ...this.processOrders(sellOrders, OrderType.SELL),
      ]
    }
  }

  private processOrders = (orders: SwapTransactionType[], type: OrderType) => {
    const processedOrders = orders
      .map(order => {
        return { price: order.price, amount: order.totalAmount, cumulativeAmount: new BigNumber(0) }
      })
      .reverse()

    const cumulativeOrders: GraphData[] = []

    if (type === OrderType.SELL) {
      for (let i = 0; i < processedOrders.length; i++) {
        const order = processedOrders[i]
        if (i === 0) {
          order.cumulativeAmount = order.amount
        } else {
          const prevOrder = processedOrders[i - 1]
          order.cumulativeAmount = prevOrder.cumulativeAmount.plus(order.amount)
        }

        cumulativeOrders.push({
          price: order.price.toNumber(),
          sellAmount: order.amount.toNumber(),
          sellCumulativeAmount: order.cumulativeAmount.toNumber(),
        })
      }
    } else {
      for (let i = processedOrders.length - 1; i >= 0; i--) {
        const order = processedOrders[i]
        if (i === processedOrders.length - 1) {
          order.cumulativeAmount = order.amount
        } else {
          const prevOrder = processedOrders[i + 1]
          order.cumulativeAmount = prevOrder.cumulativeAmount.plus(order.amount)
        }
        cumulativeOrders.unshift({
          price: order.price.toNumber(),
          buyAmount: order.amount.toNumber(),
          buyCumulativeAmount: order.cumulativeAmount.toNumber(),
        })
      }
    }
    return cumulativeOrders
  }
}

export interface Props {
  orderBookState: OrderBookState
}

export interface GraphData {
  price: number
  sellAmount?: number
  sellCumulativeAmount?: number
  buyAmount?: number
  buyCumulativeAmount?: number
}

const mapStateToProps = (app: AppState): Props => ({
  orderBookState: app.orderBook,
})

export default connect(mapStateToProps)(CumulativeChartContainer)
