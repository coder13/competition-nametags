import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import routes from 'Routes';
import Home from '../Pages/Home';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={routes.home} replace />}></Route>
        <Route path={routes.home} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
