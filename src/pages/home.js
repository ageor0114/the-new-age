import React from 'react';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';

const titleTextStyle =
{
  color: 'rgba(46, 49, 49, 1)',
  fontFamily: 'Lora',
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
        And After . . .
      </Typography>
    </Grow>
    <Grow in={checked} style={{ transitionDelay: checked ? 1000 : 0 }}>
      <Typography component="h4" style={titleTextStyle} variant="display1" gutterBottom>
        "Never ending story"
      </Typography>
    </Grow>
    <br/>
    </center>

	)
    }
};

export default HomePage
