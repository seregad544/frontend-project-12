import { React } from 'react';
import InputMessageFeed from './components/InputMessageFeed';
import MessageBox from './components/MessageBox';
import TopMessageFeed from './components/TopMessageFeed';

function MessageFeed() {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100 black-2">
        <TopMessageFeed />
        <MessageBox />
        <InputMessageFeed />
      </div>
    </div>
  );
}

export default MessageFeed;
