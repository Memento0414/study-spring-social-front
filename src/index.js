import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot, atom } from 'recoil';
import IndexPage from './pages/IndexPage';
import LoginInPage from './pages/LoginInPage';
import SignUpPage from './pages/SignUpPage';


export const jwtState = atom(
     {key:"jwtState", default: null}
  );

const router = createBrowserRouter(
  [
    { path: "/", element: <IndexPage/> },
    { path:"/flow/signup", element: <SignUpPage/> },
    { path: "/flow/login", element: <LoginInPage/> },
    { path: "/flow/kakao/callback", element: <IndexPage/> }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <RouterProvider router={router}/>
  </RecoilRoot>
);


