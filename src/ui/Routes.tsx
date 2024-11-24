import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { About } from './pages/about';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
);

export default AppRoutes;
