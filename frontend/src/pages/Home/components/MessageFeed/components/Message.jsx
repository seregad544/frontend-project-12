import { React } from 'react';

function Message(props) {
  const { username, children } = props;

  return (
    <div className="text-break text-light mb-2">
      <b>{username}</b>
      :
      {children}
    </div>
  );
}

export default Message;
