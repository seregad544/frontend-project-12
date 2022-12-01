import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import { selectCurrentChannelId } from '../../../../../store/channelsSlice';
import { selectAllMessages } from '../../../../../store/messagesInfoSlice';

function MessageBox() {
  const messages = useSelector(selectAllMessages);
  const currentChannelId = useSelector(selectCurrentChannelId);

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
