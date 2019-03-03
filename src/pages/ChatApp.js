

import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';
require('../style/ChatApp.css');
class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [],
      keywords: [
        'dog',
        'cat',
        'animal',
        'sprite',
        'bottle',
        'dragon',
        'goldfish'
      ]};
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

getNewKeyword(){
    let num = Math.floor(Math.random() * this.state.keywords.length);
    
    return num;
  }
  render() {
    let keyIndex = this.getNewKeyword();
    return (
      <div className="container">
        <h3>React Chat App</h3>
        <b><p>Keyword: {this.state.keywords[keyIndex]}</p></b>
        <Messages messages={this.state.messages} />
        <ChatInput keyword={this.state.keywords[keyIndex]} onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
