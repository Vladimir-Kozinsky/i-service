import React, { createRef, ReactNode, RefObject } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from "react-router-dom";
import Auth from './components/Auth/Auth';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import App from './App';
import s from './index.module.scss';
import Aircrafts from './components/Aircrafts/Aircrafts';
import Engines from './components/Engines/Engines';
import Apus from './components/Apus/Apus';
import Main from './components/Main/Main';

interface IRoutes {
  path: string;
  name: string;
  element: ReactNode;
  nodeRef: RefObject<any>
}

const routes: IRoutes[] = [
  { path: '/', name: 'Main', element: <Main />, nodeRef: createRef() },
  { path: '/auth', name: 'Auth', element: <Auth />, nodeRef: createRef() },
  { path: '/signup', name: 'SignUp', element: <SignUp />, nodeRef: createRef() },
  { path: '/dashboard/*', name: 'Dashboard', element: <Dashboard />, nodeRef: createRef() },
  { path: '/dashboard/aircrafts', name: 'Aircrafts', element: <Aircrafts />, nodeRef: createRef() },
  { path: '/dashboard/engines', name: 'Engines', element: <Engines />, nodeRef: createRef() },
  { path: '/dashboard/apus', name: 'Apus', element: <Apus />, nodeRef: createRef() },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

function Example() {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}
  return (
    <div className={s.container}>
      <div className={s.background__circle}></div>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames={{
            enter: s.enter,
            enterActive: s.enterActive,
            enterDone: s.enterDone,
            exit: s.exit,
            exitActive: s.exitActive,
            exitDone: s.exitDone,
          }}
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className={s.page}>
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div >
  )
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
