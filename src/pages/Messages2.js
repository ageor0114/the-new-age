import React from 'react';
import Message2 from './Message2';

class Messages2 extends React.Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
        return (

          <Message2
            key={i}
            username={message.username}
            message={message.message}
             />
            
        );
      });

    return (
      <div className='messages2' id='messageList'>
        { messages }
      </div>
    );
  }
}

Messages2.defaultProps = {
  messages: []
};

export default Messages2;
