import {
  React, useEffect, useContext, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { AuthorizationContext } from '../../AuthorizationContext';
import {
  fetchData, selectError, selectLoadingStatus,
} from '../../store/channelsSlice';
import Sidebar from './components/Sidebar/Sidebar';
import MessageFeed from './components/MessageFeed/MessageFeed';
import socket from '../../socket';
import Loader from './components/Loader';
import CustomModal from './components/CustomModal/CustomModal';
import { selectModalIsOpened } from '../../store/modalSlice';

function Home() {
  const { authorization } = useContext(AuthorizationContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isOpened = useSelector(selectModalIsOpened);
  const loadingStatus = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);

  const notifyErrorNetwork = useCallback(
    () => toast(t('notifications.errorConnect'), {
      hideProgressBar: true,
      theme: 'dark',
    }),
    [t],
  );

  useEffect(() => {
    dispatch(fetchData());
    filter.add(filter.getDictionary('ru'));
    return () => socket.removeAllListeners();
  }, [dispatch, notifyErrorNetwork, authorization]);

  useEffect(() => {
    if (error) {
      notifyErrorNetwork();
    }
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {loadingStatus ? <Loader /> : (
        <div className="row h-100 bg-white flex-md-row">
          <Sidebar />
          <MessageFeed />
          {isOpened ? <CustomModal /> : null}
        </div>
      )}
    </div>
  );
}

export default Home;
