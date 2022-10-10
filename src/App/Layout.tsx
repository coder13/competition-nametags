import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import routes from 'Routes';
import { getToken, setToken, useAppDispatch, useAppSelector } from 'Store';
import { useGetMeQuery } from 'Store/api';

const loginUrl = () => {
  const params = new URLSearchParams({
    client_id: 'example-application-id',
    response_type: 'token',
    redirect_uri: window.location.href,
    scope: 'public manage_competitions',
    state: 'foobar',
  });
  return `https://staging.worldcubeassociation.org/oauth/authorize?${params.toString()}`;
};

// function AuthGetter() {
//   const { data, error, isLoading } = useGetMeQuery();

//   useEffect(() => {
//     console.log(20, error, isLoading);
//   }, [error, isLoading]);

//   if (error) {
//     return (
//       <div className="flex bg-red-100 border-red-300">
//         <span>{error.toString()}</span>
//       </div>
//     );
//   }

//   return null;
// }

function LayoutComponent() {
  const token = useAppSelector((state) => getToken(state));
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    console.log(20, error, isLoading);
  }, [error, isLoading]);

  const logout = () => {
    dispatch(setToken(null));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="shadow-md flex bg-blue-700 border border-blue-800 p-0 text-white">
        <ul className="flex flex-row w-full py-0 px-1">
          <li className="p-2 mr-4 font-bold">Nametag Generator</li>
          <li className="hover:bg-blue-600 p-2 shadow-lg">
            <Link to={routes.home}>Competitions</Link>
          </li>
          <span className="flex flex-grow" />
          <li className="hover:bg-blue-600 p-2 shadow-lg">
            {token ? <button onClick={logout}>Logout</button> : <a href={loginUrl()}>Login</a>}
          </li>
        </ul>
      </header>
      <div className="p-2 print:p-0 flex flex-1 flex-grow w-full">
        <Outlet />
      </div>
      <div>
        {token && data && (
          <div className="p-2 border border-slate-200 bg-slate-100">
            <span>Logged in as {data.me.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LayoutComponent;
