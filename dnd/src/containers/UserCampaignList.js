import React, { Component } from 'react';
import firebase from 'firebase';

import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import CreateCampaign from './CreateCampaign';

const styles = {
  toolbar: {
  	display: "flex",
  	height: 45,
  	backgroundColor: '#D17400',
  	alignItems: "center",
  },
  toolbarTitle: {
  	height: 40,
  	fontSize: '18px',
  	textAlign: "center",
  	lineHeight: "42px",
  },

  list:{
  	maxHeight: 360,
  	overflow: 'auto',
  }
};

class UserCampaignList extends Component{
	constructor(props){
		super(props);
		this.state={
			userID: this.props.userID,
      createdCampaign: false,
			loading: false,
			campaignList: [],
		}
		this.onUpdate = this.onUpdate.bind(this);
	}

	chooseCampaign(campaignID){
		this.props.enterExistingCampaign(campaignID);
	}

	chooseCampaignAsDM(campaignID){
		this.props.enterExistingCampaignAsDM(campaignID);
	}

	onUpdate(data){
		this.setState(data);
	}

	render(){
		var campaignList = [];
		if(this.props.campaigns.length === 0){
			campaignList = (<p>There's currently no campaign</p>);
		}

		else{
			campaignList = this.props.campaigns.map((campaign) => {
				if(campaign.Players[this.state.userID] === true){
					return(
						<ListItem 
							fullWidth={true}
							primaryText={campaign.campaignTitle}
							primaryTogglesNestedList={true}
							nestedItems={[
								<FlatButton 
									label="Enter Campaign" 
									fullWidth={true}
									onTouchTap={this.chooseCampaign.bind(this, campaign.campaignID)}/>,
								<FlatButton 
									label="Enter as Dungeon Master" 
									fullWidth={true}
									onTouchTap={this.chooseCampaignAsDM.bind(this, campaign.campaignID)}/>]}>
						</ListItem>
					);
				}

				else{
					return(
						<ListItem 
							fullWidth={true}
							primaryText={campaign.campaignTitle}
							primaryTogglesNestedList={true}
							nestedItems={[
								<FlatButton 
									label="Enter Campaign"
									fullWidth={true} 
									onTouchTap={this.chooseCampaign.bind(this, campaign.campaignID)}/>]}>
						</ListItem>
					);
				}
			});
		}

		if(!this.state.loading){
			return(
				<div className="App-Campaign-List">
					<Toolbar
						style={styles.toolbar}>
						<ToolbarTitle 
							text="Your Campaigns"
							style={styles.toolbarTitle}/>
						<CreateCampaign 
		                  userID={this.state.userID}
		                  creatingCampaign={this.state.createdCampaign}
		                  onUpdate={this.onUpdate}/>
					</Toolbar>
					<List style={styles.list}>
						{campaignList}
					</List>
				</div>
		)}
		else{
			return(
				<div>
				Loading...
				</div>
				)
		}
	}
}
export default UserCampaignList;