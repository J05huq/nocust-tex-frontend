export const mapOrders = orders => {
  let mappedOrders = []
  if (orders.length > 0) {
    let totalSum = 0
    mappedOrders = orders.map(order => {
      const totalAmount = order.price.times(order.amount)
      return {
        ...order,
        totalAmount,
        ordersTotalAmountSum: totalSum + totalAmount,
      }
    })
  }
  return mappedOrders
}
