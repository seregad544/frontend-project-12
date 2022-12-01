import { React } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectNumberOfMessages } from '../../../../../store/messagesInfoSlice';
import { selectCurrentChannelName } from '../../../../../store/channelsSlice';

function TopMessageFeed() {
  const { t } = useTranslation();
  const channelName = useSelector(selectCurrentChannelName);
  const numberOfMessages = useSelector(selectNumberOfMessages);

  return (
    <div className="black p-3 small">
      <p className="m-0 text-light">
        <b>
          #
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        {t('home.title.messages', { count: numberOfMessages })}
      </span>
    </div>
  );
}

export default TopMessageFeed;
