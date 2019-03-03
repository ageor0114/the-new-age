import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	signupcard: {
	    background: '#F6F6F6',
	    width: '35em',
	    padding: 25,
	    margin: 'auto',
	    marginTop: '3em',
	    borderRadius: 3
	},
	h2: {
    	color: '#013243',
    	fontFamily: 'Helvetica',
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
	    fontFamily: 'Helvetica',
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
	linktologin: {
	    textDecoration: 'none',
	    color: '#013243',
	    '&:hover': {
	        textDecoration: 'underline',
	    }
	},
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
};
class SignupPage extends React.Component{
    constructor(props){
	super(props);
	this.state = {
	    email: '',
	    password: '',
	};
    }
    
    handleChange(event, field){
	this.setState({
	    [field]: event.target.value
	});
    }

    handleSubmit(event){
	event.preventDefault();
	this.props.firebase.createUser(this.state)
	    .then((response) => {
		//do something
	    })
	    .catch((error) => {
		switch(error.code){
		    case 'auth/email-already-in-use':
			alert('Sorry, that email is already in use.');
			break;
		    case 'auth/invalid-email':
		    alert('Please type in a valid email.');
			break;
		    case 'auth/operation-not-allowed':
			alert('Sorry, that is not a valid input.');
			break;
		    case 'auth/weak-password':
			alert('Sorry, your password is too weak. Try to make it a bit stronger!');
			break;
		    default:
			alert('Sorry, something went wrong.');
		}
	    });
    }
    
    render(){
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
	    <center><h2 className={this.props.classes.h2}>Create your account!</h2></center>
		<FormControl className={this.props.classes.formcontrol}>
			<h3 classname={this.props.classes.h3}>Username:</h3>
		    <TextField
		    className={this.props.classes.textfield}
			InputProps={{
                className: this.props.classes.input,
            }}
            id="required"
            value={this.state.email}
            onChange={(event) => {this.handleChange(event, 'email');}}
            margin="normal"
            />
		</FormControl>
		<br/>
		<FormControl className={this.props.classes.formcontrol}>
			<h3 classname={this.props.classes.h3}>Password:</h3>
		    <TextField
		    className={this.props.classes.textfield}
			InputProps={{
                className: this.props.classes.input,
            }}
            type="password"
            value={this.state.password}
            onChange={(event) => {this.handleChange(event, 'password');}}
            margin="normal"
            />
		</FormControl>
		<center><Button type="submit" className={this.props.classes.button}>Signup</Button>
		 <br/>
        <p><a href="/login"
        className={this.props.classes.linktologin}
        >Already have an account? Login here!</a></p></center>
        </div>
	    </form>;
	}
	if(this.props.auth.isLoaded && !this.props.auth.isEmpty){

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

export default withStyles(styles)(compose(
    firebaseConnect(),
    connect(({firebase: {auth}}) => ({auth})),
)(SignupPage));
