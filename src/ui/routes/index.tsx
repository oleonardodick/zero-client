import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import { Home } from '../pages/home';
import { About } from '../pages/about';
import { Requisicao } from '../pages/requisicao';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/requisicao" element={<Requisicao />} />
    </Route>
  </Routes>
);

export default AppRoutes;
