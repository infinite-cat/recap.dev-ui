import { createGlobalStyle } from 'styled-components/macro'

export const GlobalStyles = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }
  
  input {
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
      transition-property: background-color, color;
      transition-delay: 99999999999s;
    }
  }
`
