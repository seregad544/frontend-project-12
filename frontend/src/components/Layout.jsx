import { React } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from './Head';

function Layout() {
  return (
    <div className="d-flex flex-column h-100">
      <Head />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default Layout;
