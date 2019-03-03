import React from 'react';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';

const titleTextStyle =
{
  color: 'rgb(255,255,255)',
  fontSize: '20px',
	marginTop: '-10px',
}


class Logo extends React.Component{
	state = {
		checked: true,
	  };
	
		render(){
		  const { checked } = this.state;
		return(
		
		<center>
		<Grow in={checked} style={{ transitionDelay: checked ? 500 : 0 }}>
		  <Typography component="h2" style={titleTextStyle} variant="display4" gutterBottom>
		  <br />
		  <br />
			<img src= "https://i.imgur.com/9PW1TPq.png" class="center" id="logo"/>
		  </Typography>
		</Grow>
		<Grow in={checked} style={{ transitionDelay: checked ? 1000 : 0 }}>
		  <Typography component="h4" style={titleTextStyle} variant="display1" gutterBottom>
			"The never-ending story"
		  </Typography>
		</Grow>
		<br/>
		</center>
	
		)
		}
	};

export default Logo;
