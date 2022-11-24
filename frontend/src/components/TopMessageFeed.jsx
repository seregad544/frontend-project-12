import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const TopMessageFeed = (props) => {	
    const { t } = useTranslation();
    const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
    const channelName = useSelector((state) => state.channelsInfo.channels).filter((item) => item.id === channelId).map((item) => item.name);
    const numberOfMessages = useSelector((state) => state.messagesInfo.messages).filter((item) => item.channelId === channelId).length;


    return (
        <div className="black mb-4 p-3 shadow-sm small">
            <p className="m-0 text-light">
                <b># {channelName}</b>
            </p>
            <span className="text-muted">
                {t('home.title.messages', { count: numberOfMessages })}
            </span>
        </div>
	);
};

export { TopMessageFeed };
