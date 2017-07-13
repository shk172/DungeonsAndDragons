import React, { Component } from 'react';
import '../App.css';
import Dies from './Dies';
import Note from './Note';
import Stats from './Stats';

class CharacterHub extends Component {
   constructor(props){
    super(props);
    this.state={
      character: this.props.character,
      campaignID: this.props.campaignID,
      diceResult: {
        4: 1,
        6: 1,
        8: 1,
        10: 1,
        12: 1,
        20: 1,
        100: 1,
      },
    };
    this.onUpdate = this.onUpdate.bind(this);
  } 
  
  onUpdate(data){
    this.setState(data);
  }

  render() {
    if(this.state.loading){
      return(
        <p>Loading...</p>
        )
    }
    if(this.state.error){
    	return(
    		<p>{this.state.errorMessage}</p>
    	)
    }
    else{
      if(this.props.tab === "Dice"){
        return(
          <div className="App">
            <div className="App-modules">
              <Dies userID={this.state.userID} campaignID={this.state.campaignID} characterName={this.state.character.name}/>
          </div>
        </div> 
        )
        
      }
      else{
        return(
          <div className="App">
            <Stats character={this.state.character} />
          </div> 
        );      
      }
    }
  }
}

export default CharacterHub;