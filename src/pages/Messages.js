import React from 'react';
import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component

    const messages = <div>
    <Message message={"Once upon a time, in the land of HackTrin..."}
    key="10000"
    username={" "}
    fromMe={true}/>
     {this.props.messages.map((message, i) => {
        return (
          <div className ='pls'>
          <div className ='bubble'>
          {message.username[0].toUpperCase()}
          </div>
          <Message

            key={i}
            message={message.message}
            username={message.username}
            fromMe={message.fromMe}
             />
          </div>

        );
      })}
     </div>;

    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
