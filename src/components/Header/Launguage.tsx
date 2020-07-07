import React, { PureComponent } from 'react'
import Select from '../Common/Select'

import enFlag from '../../assets/images/en_flag.png'
import zhFlag from '../../assets/images/ch_flag.png'

interface Props {
  selectLanguage: (language: string) => void
}

export default class LanguageSelect extends PureComponent<Props> {
  render() {
    return (
      <Select title={'language_select_title'} icon={'fa fa-language'}>
        {languageSelectData.map(item => (
          <div
            key={item.value}
            className={'dropdown-item'}
            onClick={() => this.props.selectLanguage(item.value)}
          >
            <img src={item.flag} alt={''} />
            <span>{item.name}</span>
          </div>
        ))}
      </Select>
    )
  }
}

const languageSelectData = [
  {
    value: 'en',
    name: 'English',
    flag: enFlag,
  },
  {
    value: 'zh',
    name: '中文',
    flag: zhFlag,
  },
]
