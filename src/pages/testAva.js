import React from 'react';
import Avatars from '../components/avatars';

class testAva extends React.Component{
  state = {
    checked: true,
  };

    render(){
      const { checked } = this.state;
	return(
    <Avatars id="logo"/>
	)
    }
};

export default testAva
