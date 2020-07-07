import React from 'react'
import { Trans } from 'react-i18next'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import styled from 'styled-components'

class ModalContainer extends React.Component<Props> {
  render() {
    const { title, children, isModalOpen, toggleModal, modalWidth } = this.props

    return (
      <Container
        size={modalWidth}
        isOpen={isModalOpen}
        toggle={toggleModal}
        className={'modal-container'}
      >
        <MHeader toggle={toggleModal}>
          <Trans i18nKey={title} />
        </MHeader>
        <ModalBody>{children}</ModalBody>
      </Container>
    )
  }
}

interface Props {
  title: string
  children: any
  isModalOpen: boolean
  toggleModal: () => void
  buttonTitle?: string
  modalWidth?: string
}

export default ModalContainer

const Container = styled(Modal)`
  max-width: ${props => (props.size ? props.size : '500px')};

  .modal-content {
    background: #1e1a3a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
    padding: 25px;
  }
`

const MHeader = styled(ModalHeader)`
  color: #fff;
  border: 0;
  h5 {
    font-size: 16px;
  }
  button {
    color: #fff;
    border: 0;
    text-shadow: none;
    &:hover {
      color: #9c62e7;
      opacity: 1;
    }
  }
`
