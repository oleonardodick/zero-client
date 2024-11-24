import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import Layout from './components/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
