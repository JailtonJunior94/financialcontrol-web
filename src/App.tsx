import { BrowserRouter } from 'react-router-dom';

import { Layout } from './components/Layout';
import Routes from './routes'

import '../src/styles/style.scss';
import AppProvider from './hooks';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}
