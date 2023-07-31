import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot, atom } from 'recoil';
import IndexPage from './pages/IndexPage';
import LoginInPage from './pages/LoginInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import KakaoCallBackPage from './pages/KakaoCallBackPage'
import DeactivatePage from './pages/settings/DeactivatePage';
import ProfilePage from './pages/settings/ProfilePage';
import Logout from './pages/settings/Logout';


export const jwtState = atom(
     {key:"jwtState", default: null}
  );

export const userEmailState = atom(
  { key: "userEmailState", default: null}
);

const router = createBrowserRouter(
  [
    { path: "/", element: <IndexPage/> },
    { path:"/flow/signup", element: <SignUpPage/> },
    { path: "/flow/login", element: <LoginInPage/> },
    { path: "/flow/kakao/callback", element: <KakaoCallBackPage/> },
    { path: "/home", element: <HomePage/> },
    { path: "/settings/deactivate", element: <DeactivatePage/> },
    { path: "/settings/profile", element: <ProfilePage/> },
    { path: "/flow/logout" , element: <Logout/>}
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <RouterProvider router={router}/>
  </RecoilRoot>
);


