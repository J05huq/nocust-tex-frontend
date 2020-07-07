import styled, { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

// COLORS
export const BLACK_COLOR = '#140F2C'
export const WHITE_COLOR = '#fff'

export const TEXT_COLOR = '#fcfcfc'

export const INPUT_BACKGROUND = '#191436'
export const MAIN_COLOR = '#9C62E7'

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  
  html {
    box-sizing: border-box;
  }
  
  body {
    background-color: #191534;
    color: ${TEXT_COLOR};
    font-family: 'Poppins';
    font-weight: 100;
  }
  
`
export const ErrorMsg = styled.p`
  color: orange;
  font-size: 11px;
`
