import { React } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function TopMessageFeed() {
  const { t } = useTranslation();
  const { currentChannelId: id, channels } = useSelector((state) => state.channelsInfo);
  const messages = useSelector((state) => state.messagesInfo.messages);
  const channelName = channels.filter((item) => item.id === id).map((item) => item.name);
  const numberOfMessages = messages.filter((item) => item.channelId === id).length;

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
