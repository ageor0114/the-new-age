import React from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: '', style: 'normal', canType:true, first: true, };

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
    this.setState(prevState => {
      let newState = prevState;
      newState.chatInput = '';
      return newState;
    });

    // Call the onSend callback with the chatInput message
    console.log("keyword: " + this.props.keyword);
    console.log("output: " + this.state.chatInput);
    if (this.hasWord(this.props.keyword,this.state.chatInput))
    {
      this.setState(prevState => {
      let newState = prevState;
      newState.style='normal';
      newState.canType=false;
      return newState;
      });
      this.props.changeCanType(false);
      if (this.state.first) this.props.onSend(this.state.chatInput);
      else
      {
        this.setState(prevState => {
          let newState = prevState;
          newState.first = false;
          return newState;
        })
        this.props.onSend("And then" + this.state.chatInput);
      }

    }

    else 
    {
      this.setState(prevState => {
      let newState = prevState;
      newState.style='wrong';
      return newState;
      });
    }
      //alert('Sorry, you forgot to include the word!');
  }

  textChangeHandler(event)  {
    /*if (event != null)
    {
    this.setState(prevState => {
      let newState = prevState;
      newState.chatInput = event.target.value;
      return newState;
    });
    }*/

    this.setState({ chatInput: event.target.value, style: this.state.style });
    console.log("TCH Text: " + this.state.chatInput);
    console.log("TCH Keyword: " + this.props.keyword);
    if (this.hasWord(this.props.keyword,this.state.chatInput))
    {
      this.setState(prevState => {
      let newState = prevState;
      newState.style='right';
      return newState;
      });
    }
    else
    {
      this.setState(prevState => {
      let newState = prevState;
      newState.style='normal';
      return newState;
      });
    }
  }

  render() {
    return (
      <div>
      <form className="chat-input"  onSubmit={this.submitHandler}>
        <input type="text"
          id={this.state.style}
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
