import { useSelector } from "react-redux";
import { Message } from "./Message";

const MessageBox = () => {
	const messages = useSelector((state) => state.messagesInfo.messages);
	const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
	
	return (
		<div id="messages-box" className="chat-messages overflow-auto px-5 ">
           {messages.filter((item) => item.channelId === currentChannelId).map((item) => <Message key={item.id} username={item.username}>{item.body}</Message>)}
        </div>
	);
};

export { MessageBox };
