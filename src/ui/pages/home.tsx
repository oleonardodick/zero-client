import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Página Home</h1>
      <Link to="/about">About</Link>
    </div>
  );
};
