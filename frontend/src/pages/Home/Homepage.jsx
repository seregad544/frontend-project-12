import {
  React, useEffect, useContext, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AuthorizationContext } from '../../AuthorizationContext';
import {
  clearError,
  fetchData, selectError, selectLoadingStatus,
} from '../../store/channelsSlice';
import Sidebar from './components/Sidebar/Sidebar';
import MessageFeed from './components/MessageFeed/MessageFeed';
import Loader from './components/Loader';
import CustomModal from './components/CustomModal/CustomModal';
import UseErrorHandler from '../../hoc/UseErrorHandler';

function Home() {
  const { authorization } = useContext(AuthorizationContext);
  const dispatch = useDispatch();
  const errorHandler = UseErrorHandler();
  const loadingStatus = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);

  const notifyError = useCallback(
    (text) => toast(text, {
      hideProgressBar: true,
      theme: 'dark',
    }),
    [],
  );

  useEffect(() => {
    dispatch(fetchData());
    return () => dispatch(clearError());
  }, [dispatch, notifyError, authorization]);

  useEffect(() => {
    if (error) {
      const message = errorHandler(error.message);
      notifyError(message);
    }
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {loadingStatus ? <Loader /> : (
        <div className="row h-100 bg-white flex-md-row">
          <Sidebar />
          <MessageFeed />
          <CustomModal />
        </div>
      )}
    </div>
  );
}

export default Home;
