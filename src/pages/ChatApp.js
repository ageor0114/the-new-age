import React from 'react';
import io from 'socket.io-client';
import config from '../config';
import Grid from '@material-ui/core/Grid';
import Messages from './Messages';
import ChatInput from './ChatInput';
import Messages2 from './Messages2';
import ChatInput2 from './ChatInput2';
require('../style/ChatApp.css');

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);

    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div>
      <Grid item xs={12}>
      <div className="together">
      <div className="container">
        <h3>Build a Story!</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
       <div className="container2">
         <h3>Group Chat</h3>
         <Messages2 messages={this.state.messages} />
         <ChatInput2 onSend={this.sendHandler} />
       </div>
       </div>
       </Grid>
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
