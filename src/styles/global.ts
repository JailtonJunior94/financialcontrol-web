import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    } 

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }
`;
