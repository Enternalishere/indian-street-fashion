import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Pacifico&family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.dark};
    background-color: ${props => props.theme.colors.light};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h1 {
    font-size: 2.5rem;
    
    @media (min-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: 3rem;
    }
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    transition: color ${props => props.theme.transitions.short};
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.fonts.body};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  main {
    min-height: 80vh;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }

  .section {
    padding: ${props => props.theme.spacing.xl} 0;
  }
`;

export default GlobalStyles;