import React from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: '' };

    // React ES6 does not bind 'this' to event handlers by default
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  hasWord(word, input)
  {
    let num = input.search(word);
    if (num >= 0) return true;
    else return false;
  }

  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    //console.log("Submit Handler: " + this.props.keyword);

    // Clear the input box
    this.setState({ chatInput: '' });

    // Call the onSend callback with the chatInput message
    console.log("keyword: " + this.props.keyword);
    console.log("output: " + this.state.chatInput);
    if (this.hasWord(this.props.keyword,this.state.chatInput))this.props.onSend(this.state.chatInput);
    else alert('Sorry, you forgot to include the word!');
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
    console.log("TCH Text: " + this.state.chatInput);
    console.log("TCH Keyword: " + this.props.keyword);
  }

  render() {
    return (
      <div>
      <form className="chat-input" onSubmit={this.submitHandler}>
        <input type="text"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
      </form>
      </div>
    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;
