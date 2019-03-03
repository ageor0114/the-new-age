import React from 'react';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';

const titleTextStyle =
{
  color: 'rgba(46, 49, 49, 1)',
  fontFamily: 'Lora',
  fontSize: '20px',
  marginTop: '-10px',
}

class HomePage extends React.Component{
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
        <img src= "https://i.imgur.com/pybuzme.jpg" class="center" id="logo"/>
      </Typography>
    </Grow>
    <Grow in={checked} style={{ transitionDelay: checked ? 1000 : 0 }}>
      <Typography component="h4" class="frontFont" style={titleTextStyle} variant="display1" gutterBottom>
        "The never-ending story"
      </Typography>
    </Grow>
    <br/>
    </center>

	)
    }
};

export default HomePage
