import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, selectAllChannels, selectCurrentChannelId } from '../../../../../store/channelsSlice';
import Chanel from './Chanel';
import DefaultChanel from './DefaultChanel';

function ChanelList() {
  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const dispatch = useDispatch();
  const setDefaultChanel = (id) => dispatch(change(id));
  const isActive = (id) => id === currentChannelId;

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.filter((item) => item.removable === false).map((item) => (
        <DefaultChanel
          key={item.id}
          id={item.id}
          onClick={() => setDefaultChanel({ id: item.id })}
          active={isActive(item.id)}
        >
          {item.name}
        </DefaultChanel>
      ))}
      {channels.filter((item) => item.removable).map((item) => (
        <Chanel
          key={item.id}
          id={item.id}
          onClick={() => setDefaultChanel({ id: item.id })}
          active={isActive(item.id)}
        >
          {item.name}
        </Chanel>
      ))}
    </ul>
  );
}

export default ChanelList;
