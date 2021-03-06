import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'
import AppProvider from './hooks';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
