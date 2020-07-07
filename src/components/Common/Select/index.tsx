import React from 'react'
import { Trans } from 'react-i18next'
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from 'reactstrap'

class SelectContainer extends React.Component<Props> {
  render() {
    const { children, title, icon } = this.props

    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle tag={'span'} nav>
          <span>
            <i className={icon}>
              <span>
                <Trans i18nKey={title} />
              </span>
            </i>
          </span>
        </DropdownToggle>
        <DropdownMenu right>{children}</DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

interface Props {
  children: any
  title: string
  icon: string
}

export default SelectContainer
