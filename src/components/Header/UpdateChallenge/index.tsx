import React from 'react'
import { connect } from 'react-redux'
import { Trans } from 'react-i18next'
import Button from '../../../ui/Button'
import styled from 'styled-components'
import BeatLoader from 'react-spinners/BeatLoader'
import { HubState } from '../../../state/hub'
import { AppState } from '../../../state'

interface Props {
  close: () => void
  hub: HubState
}
interface State {
  steps: number
}
export class UpdateChallenge extends React.Component<IProps & { dispatch }, State> {
  state: State = { steps: 0 }

  renderSteps() {
    if (this.state.steps === 0) {
      return (
        <>
          <WarningText>
            <IconContainer>
              <i className="fa fa-exclamation-circle warning"></i>
            </IconContainer>
            <Trans i18nKey={'update_challenge_modal_text'} />
          </WarningText>
          <ButtonGroup>
            <Button title={'proceed'} onClick={() => this.initiateUpdateStateChallenge()} />
            <Button title={'cancel'} onClick={this.props.close} />
          </ButtonGroup>
        </>
      )
    } else if (this.state.steps === 1) {
      return (
        <Container>
          <BeatLoader loading size={13} css={LoaderCSS} color={'#FFFFE4'} />
          <ChallengeText>
            <Trans i18nKey={'update_challenge_revoke_text'} />
          </ChallengeText>
        </Container>
      )
    }
  }

  initiateUpdateStateChallenge() {
    this.setState({ steps: this.state.steps + 1 })
    // this.props.dispatch(stateUpdateChallenge())
  }
  render() {
    return this.renderSteps()
  }
}

const mapStateToProps = (state: AppState) => ({
  hub: state.hub,
})

type IProps = Props & typeof mapStateToProps

export default connect(mapStateToProps)(UpdateChallenge)

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;
  button:last-child {
    margin-left: 10px;
    background-color: #191436;
    border: 1px solid #9c62e7;
    color: #fff !important;

    &:hover {
      background-color: #9c62e7 !important;
      border-color: #9c62e7 !important;
      div {
        background: #9c62e7;
      }
    }
  }

  button:first-child {
    margin-right: 10px;
  }
`
const WarningText = styled.div`
  margin-top: 0;
  text-align: center;
  margin-bottom: 60px;
  font-size: 15px;
`

const IconContainer = styled.div`
  text-align: center;
  i {
    color: orange;
    font-size: 50px;
    margin-bottom: 20px;
  }
`

const LoaderCSS = { 'z-index': 2, position: 'relative', marginBottom: '10px' }

const ChallengeText = styled.div`
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
`

const Container = styled.div`
  text-align: center;
`
