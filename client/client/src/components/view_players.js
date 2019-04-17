import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react'
import {withRouter} from 'react-router'
import Navigation from './navigation'
import TableComponent from './table_component'
import '../App.css'

class ViewPlayers extends Component {

	constructor(props) {
    super(props);
    this.tableHeaders = ["NAME", "AGE", "LOCATION", "ACTIONS"];
    this.state = {};
    this.refreshState = this.refreshState.bind(this);
  }
  
  refreshState = () => {
		fetch('http://localhost/files/Kinduct_Code_Challenge/index.php/players_controller/players')
      .then(response => response.json())
      .then(result => {
        this.setState({
          Players: result.Players
				});
			});
  }

	componentDidMount = () => {
    this.refreshState();
  }
	
	render = () => {
    if (!this.state.Players)
      return <p> Loading . . . </p>;

		return (
      <Container>
        <Navigation></Navigation>               {/* Nav-bar */}
        <Grid.Row>                              {/* Body */}
            <Segment className="segment_header">
              <h1>Showing all players </h1><br/>
              <TableComponent 
                headers={this.tableHeaders} data={this.state.Players} refresh={() => this.refreshState()}>
              </TableComponent>
            </Segment>
        </Grid.Row>
      </Container>
    )
  }

}

export default withRouter(ViewPlayers);