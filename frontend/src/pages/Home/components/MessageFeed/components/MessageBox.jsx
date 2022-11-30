import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

function MessageBox() {
  const messages = useSelector((state) => state.messagesInfo.messages);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  useEffect(() => {
    const messagesBox = document.getElementById('messages-box');
    messagesBox.scrollTop = document.body.scrollHeight;
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 pt-2">
      {messages.filter((item) => item.channelId === currentChannelId).map((item) => (
        <Message key={item.id} username={item.username}>
          {item.body}
        </Message>
      ))}
    </div>
  );
}

export default MessageBox;
