import React from 'react'
import { Trans } from 'react-i18next'
import { INPUT_BACKGROUND, MAIN_COLOR } from '../../../globalStyles'
import styled from 'styled-components'

class InputContainer extends React.Component<Props> {
  static defaultProps = {
    title: '',
    type: 'text',
  }

  private readonly input: React.RefObject<HTMLInputElement> = React.createRef()

  get value() {
    return this.input.current ? this.input.current.value : null
  }

  render() {
    const { title, unit, value, id, onBlur, placeholder, onChange, maxFun, tip } = this.props

    return (
      <Container>
        <div>
          <Label>
            <Trans i18nKey={title} /> (${tip ? `${tip}` : '0'})
          </Label>
          <MaxBtn onClick={maxFun}>Max</MaxBtn>
          <div className="clearfix"></div>
        </div>
        <InputGroup>
          <Input
            id={id}
            type={'number'}
            step={'any'}
            placeholder={placeholder}
            value={value}
            ref={this.input}
            onChange={onChange}
            onBlur={onBlur}
          />
          <UnitText>{unit}</UnitText>
        </InputGroup>
      </Container>
    )
  }
}

interface Props {
  title: string
  unit?: string
  placeholder?: string
  type?: string
  tip?: string
  value?: string
  id: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  maxFun: (e?: any) => void
}

export default InputContainer

const Container = styled.div`
  margin-bottom: 1rem;
`

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  height: 36px;
  background-color: ${INPUT_BACKGROUND};
  border: 1px solid ${MAIN_COLOR};
  border-radius: 50px;
`

const Label = styled.p`
  font-size: 13px;
  color: #adbbcd;
  margin-bottom: 7px;
  line-height: 1.5;
  float: left;
`
const Input = styled.input`
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  font-size: 0.875rem;
  margin-bottom: 0;
  padding: 0.25rem 0.9rem;
  border-radius: 3.2px 0 0 3.2px;
  background: transparent;
  border: 0;
  color: #fff;
  &:focus {
    outline: 0;
  }
`

const UnitText = styled.p`
  margin-left: -1px;
  margin-bottom: 0;
  padding: 0.5rem 0.75rem;
  border-radius: 0 3.2px 3.2px 0;
  border-left: none;
  font-size: 0.8rem;
  color: #adbbcd;
`

const MaxBtn = styled.button`
  background: ${MAIN_COLOR};
  box-shadow: none;
  padding: 2px 10px;
  border-radius: 25px;
  border: 0;
  text-shadow: none;
  font-size: 13px;
  color: #fff;
  float: right;
  cursor: pointer;
  outline: none !important;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`
