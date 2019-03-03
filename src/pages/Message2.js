import React from 'react';

class Message2 extends React.Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'from-me2' : '';

    return (
      <div className={`message2 ${fromMe}`}>
        <div className='username'>
          { this.props.username }
        </div>
        <div className='message-body2'>
          { this.props.message }
        </div>
      </div>
    );
  }
}

Message2.defaultProps = {
  message: '',
  username: '',
  fromMe: false
};

export default Message2;
