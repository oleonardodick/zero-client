import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import { Home } from '../pages/home';
import { About } from '../pages/about';
import { PaginaRequisicao } from '../pages/requisicao';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/requisicao/cadastrar" element={<PaginaRequisicao />} />
      <Route path="/requisicao/modificar/:id" element={<PaginaRequisicao />} />
    </Route>
  </Routes>
);

export default AppRoutes;
