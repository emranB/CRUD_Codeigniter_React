import React, { Component } from 'react';
import { Container, Grid, Segment, Table, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router'
import Navigation from './navigation'
import '../App.css'

class ViewPlayer extends Component {

	constructor(props) {
    super(props);
    this.tableHeaders = ["NAME", "AGE", "LOCATION", "ACTIONS"];
    this.state = {};
    this.deletePlayer = this.deletePlayer.bind(this);
	}

	componentDidMount = () => {
    var userId = window.location.pathname.split('/').pop();   /* User ID is last segment of URI */
		fetch('http://localhost/files/Kinduct_Code_Challenge/index.php/players_controller/player/' + userId)
      .then(response => response.json())
      .then(result => {
        this.setState({
          Player: result.Player
				});
			});
  }
  
  /**
   * Delete player with specified ID 
   * Redirect to View All Players Page
   **/
	deletePlayer = (id) => {
    if (window.confirm("Are you sure you want to delete this player?"))
    {
      fetch('http://localhost/files/Kinduct_Code_Challenge/index.php/players_controller/delete_player/' + id, 
            {method: 'DELETE'})
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.props.history.push('/view_players');
			});
    }
	}
	
	render = () => {
    if (!this.state.Player)
      return <p> Loading . . . </p>;

		return (
      <Container>
        <Navigation></Navigation>              
          <Grid.Row>           
            <Segment className="segment_header">
              <h1> {this.state.Player.Name} </h1><br/>
              <Table compact celled className='tlbPlayerDets'>
                <tbody>
                  <tr>
                    <td className="collapsing"> AGE: </td>
                    <td> {this.state.Player.Age} </td>
                  </tr>
                  <tr>
                    <td className="collapsing"> CITY: </td>
                    <td> {this.state.Player.Location.City} </td>
                  </tr>
                  <tr>
                    <td className="collapsing"> PROVINCE: </td>
                    <td> {this.state.Player.Location.Province} </td>
                  </tr>
                  <tr>
                    <td className="collapsing"> COUNTRY: </td>
                    <td> {this.state.Player.Location.Country} </td>
                  </tr>
                </tbody>
              </Table>

              <br/>

              <Button negative size="huge" onClick={() => this.deletePlayer(this.state.Player.ID)}> 
                Delete Player 
              </Button>

            </Segment>
          </Grid.Row>
      </Container>
    )
  }

}

export default withRouter(ViewPlayer);