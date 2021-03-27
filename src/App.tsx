import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'
import AppProvider from './hooks';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}
