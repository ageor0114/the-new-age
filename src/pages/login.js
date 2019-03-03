import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  button: {
    borderRadius: 2,
    width: 150,
    height: 50,
    color: 'white',
    background: '#013243',
    '&:hover': {
        color: '#013243',
        background: '#F6F6F6',
    }
  },

  formcontrol: {
    width: 500,
    margin: 20,
  },

  textfield: {
    background: 'white',
    padding: 5,
    border: '1px solid lightgrey',
    borderRadius: 3,
},

  input: {
    color:"#013243",
    border: 'none',
    paddingLeft: 5,
},

  h3: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    lineHeight: 0,
    color: '#013243',
    textAlign: 'left',
},

  h2: {
    color: '#013243',
},

  posth2: {
    color: 'white',
},

  signupcard: {
    background: '#F6F6F6',
    width: '35em',
    padding: 25,
    margin: 'auto',
    marginTop: '3em',
    borderRadius: 3

},

  linktologin: {
    textDecoration: 'none',
    color: '#013243',
    '&:hover': {
        textDecoration: 'underline',
    }
},
};
class LoginPage extends React.Component{
    constructor(props){
	super(props);
	this.state = {
	    email: '',
	    password: ''
	};
    }
    
    handleChange(event, field){
	this.setState({
	    [field]: event.target.value
	});
    }

    handleSubmit(event){
	event.preventDefault();
	this.props.firebase.login(this.state)
	    .then((response) => {
		// do something
	    })
	    .catch((error) => {
		switch(error.code){
                case 'auth/user-not-found':
                alert('It seems like you dont have an account? Create one now!')
                break;
                case 'auth/wrong-password':
                alert('Uh oh! Looks like you put the wrong password.')
                case 'auth/invalid-email':
                alert('That email isnt valid')
                break;
                case 'auth/network-request-failed':
                alert('Something wrong with your network.')
                break;
                default:
                // default error

		}
	    });
    }

    logout(){
	this.props.firebase.logout();
    }
    
    render(){
    console.log(this.props.profile);
	let payload;
	if(!this.props.auth.isLoaded){
	    // auth is not warmed up
	    payload = null;
	}
	if(this.props.auth.isLoaded && this.props.auth.isEmpty){
	    // auth is ready
	    // but user is not logged in
	    payload = <form onSubmit={(event) => {this.handleSubmit(event);}}>
	    <div className={this.props.classes.signupcard}>
        <h2
        className={this.props.classes.h2}>Login!</h2> 
        <FormControl
        	className={this.props.classes.formcontrol}>
            <h3
            className={this.props.classes.h3}
            >Email:</h3>
		    <TextField
		    className={this.props.classes.textfield}
		    InputProps={{
                className: this.props.classes.input,
            }}
			value={this.state.email}
			onChange={(event) => {this.handleChange(event, 'email');}}
			margin="normal"
			id="required"
		    />
		</FormControl>
		<FormControl className={this.props.classes.formcontrol}>
            <h3 className={this.props.classes.h3}>Password:</h3>
            <TextField
            className={this.props.classes.textfield}
            InputProps={{
                className: this.props.classes.input,
            }}
			type="password"
			value={this.state.password}
			onChange={(event) => {this.handleChange(event, 'password');}}
			margin="normal"
			id="required"
		    />
		</FormControl>
		<Button type="submit"
			className={this.props.classes.button}>
		    Login
		</Button>
		<br/>
        <p><a href="/signup"
        className={this.props.classes.linktologin}
        >Dont have an account yet? Signup here!</a></p>
        </div>
	    </form>;
	}
	if(this.props.auth.isLoaded && !this.props.auth.isEmpty){
	    // auth is warmed up
	    // and user is not logged in
	    console.log(this.props);
	    payload = <div>
		<div>
		    Welcome {this.props.auth.email}
		</div>
		<div>
		    <Button variant="contained"
			    color="secondary"
			    onClick={() => {this.props.firebase.logout();}}>
			Logout
		    </Button>
		    
		</div>
	    </div>;
	}
	return(
	    <div>
		{payload}
	    </div>
	)
    }
};

//export default LoginPage
export default withStyles(styles)(compose(
    firebaseConnect(),
    connect(({firebase: {auth}}) => ({auth})),
)(LoginPage));
