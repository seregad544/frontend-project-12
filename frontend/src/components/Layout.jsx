import { React } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from './CustomModal';
import Head from './Head';

function Layout() {
  const isOpened = useSelector((state) => state.modalInfo.isOpened);

  return (
    <div className="d-flex flex-column h-100">
      <Head />
      <Outlet />
      {isOpened ? <CustomModal /> : null}
      <ToastContainer />
    </div>
  );
}

export default Layout;
