import React, { PureComponent } from 'react'

import Select from '../Common/Select'

export default class HelpSelect extends PureComponent {
  render() {
    return (
      <Select title={'Help'} icon={'far fa-life-ring'}>
        {helpSelectData.map(item => (
          <i key={item.value} className={`${item.icon} dropdown-item`}>
            <span>{item.name}</span>
          </i>
        ))}
      </Select>
    )
  }
}

const helpSelectData = [
  {
    value: 'chat',
    name: 'Chat',
    icon: 'far fa-comment',
  },
  {
    value: 'reddit',
    name: 'Reddit',
    icon: 'fab fa-reddit-alien',
  },
  {
    value: 'youtube',
    name: 'YouTube',
    icon: 'fab fa-youtube',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'fab fa-twitter',
  },
  {
    value: 'mailing_list',
    name: 'Mailing list',
    icon: 'fas fa-envelope',
  },
  {
    value: 'fees',
    name: 'Fees',
    icon: 'far fa-money-bill-alt',
  },
  {
    value: 'guides',
    name: 'Guides',
    icon: 'far fa-question-circle',
  },
  {
    value: 'ethereum',
    name: 'Connect to Ethereum Screencast',
    icon: 'fas fa-desktop',
  },
  {
    value: 'deposit',
    name: 'Deposit Screencast',
    icon: 'fas fa-desktop',
  },
  {
    value: 'withdraw',
    name: 'Withdraw Screencast',
    icon: 'fas fa-desktop',
  },
  {
    value: 'order',
    name: 'Order Screencast',
    icon: 'fas fa-desktop',
  },
  {
    value: 'cancel',
    name: 'Cancel Screencast',
    icon: 'fas fa-desktop',
  },
  {
    value: 'trade',
    name: 'Trade Screencast',
    icon: 'fas fa-desktop',
  },
]
