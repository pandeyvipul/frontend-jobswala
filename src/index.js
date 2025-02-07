import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Header } from './myComponent/Header';
// import { Sidemenu } from './myComponent/Sidemenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const route = createBrowserRouter([{
//   path: "/",
//   element: <Header/>
// },
// {
//   path: "/signin",
//   element: <Header />
// },
// {
//   path: "/login",
//   element: <Sidemenu />
// }])

root.render(
  // <React.StrictMode>
      // {/* <RouterProvider router={route}/> */}
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
