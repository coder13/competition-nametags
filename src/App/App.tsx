import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import CompetitionHome from '../Pages/Competitions/Home';
import { useEffect } from 'react';
import Competitions from 'Pages/Competitions';
import { getToken, setToken, useAppDispatch, useAppSelector } from 'Store';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => getToken(state));

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    const hashParams = new URLSearchParams(hash);

    if (hashParams.has('access_token')) {
      dispatch(setToken(hashParams.get('access_token')!));
    }

    if (hashParams.has('expires_in')) {
      /* Expire the token 15 minutes before it actually does,
         this way it doesn't expire right after the user enters the page. */
      const expiresInSeconds = parseInt(hashParams.get('expires_in'), 10) - 15 * 60;
      console.log(expiresInSeconds);
    }

    /* Clear the hash if there is a token. */
    if (hashParams.has('access_token')) {
      navigate(location.pathname, {
        replace: true,
      });
    }
  }, [dispatch, location, navigate]);

  useEffect(() => {
    console.log(16, token);
  }, [token]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={token ? <Competitions /> : null} />
        <Route path={'/competitions/:competition_id'} element={<CompetitionHome />} />
      </Route>
    </Routes>
  );
}

export default App;
