import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomModal } from "./CustomModal";
import { Head } from "./Head";

const Layout = () => {
	const isOpened = useSelector((state) => state.modalInfo.isOpened);
	
	return (
		<div className="d-flex flex-column h-100">
			<Head></Head>
			<div className="container-fluid h-100 black-2">
				<Outlet />
			</div>
			{isOpened ? <CustomModal></CustomModal> : null}
			<ToastContainer />
		</div>
	);
};

export { Layout };
