import * as Yup from 'yup'

export default {
  withdrawForm: Yup.object().shape({
    withdrawal_amount: Yup.number()
      .moreThan(0, 'Withdraw amount should be greater than 0')
      .required('Please enter a withdrawal amount'),
  }),
  depositForm: Yup.object().shape({
    deposit_amount: Yup.number()
      .moreThan(0, 'Deposit amount should be greater than 0')
      .required('Please enter a deposit amount'),
  }),
}
