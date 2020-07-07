import * as Yup from 'yup'

export default {
  orderForm: Yup.object().shape({
    limit_price: Yup.number()
      .moreThan(0, 'Limit price should be greater than 0')
      .required('Please enter a limit price'),
    order_amount: Yup.number()
      .moreThan(0, 'Order amount should be greater than 0')
      .required('Please enter an order amount'),
  }),
}
