import React, { Component } from 'react';
import { Container, Grid, Segment, Form, Message, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router'
import Navigation from './navigation'
import '../App.css'

let reader;

class ViewPlayers extends Component {
	
	constructor(props) {
    super(props);
    this.state = {};
	}
	

	componentDidMount = () => {
		
	}
	
	handleFile = (e) => {
		var text = reader.result.replace(/\s/g, '');
		text = JSON.parse(text);
		
		if (window.confirm("Are you sure you want to upload this file?"))
    {
      fetch('http://localhost/files/Kinduct_Code_Challenge/index.php/players_controller/upload_players', 
			{
				method: 'POST',
				body: JSON.stringify(text),
				headers: {
								"Content-type": "application/json; charset=UTF-8"
				}
			})
			.then(response => console.log(response))
      .then(() => {
				window.location.reload();
			})
		}
	}
	
	uploadFile = (event) => {
		var file = event.target.files[0];
		reader = new FileReader();
		reader.onloadend = this.handleFile;
		reader.readAsBinaryString(file);


    // if (window.confirm("Are you sure you want to upload this file?"))
    // {
    //   fetch('http://localhost/files/Kinduct_Code_Challenge/index.php/players_controller/upload_players', 
		// 	{
		// 		method: 'POST',
		// 		body: JSON.stringify({
		// 						file: file
		// 		}),
		// 		headers: {
		// 						"Content-type": "application/json; charset=UTF-8"
		// 		}
		// 	})
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result);
		// 	});
		// }
		
	};
	
	render = () => {
		return (
      <Container>
        <Navigation></Navigation>               {/* Nav-bar */}
        <Grid.Row>                              {/* Body */}
            <Segment className="segment_header">

              <h1> Upload file with player details </h1><br/>
							
							<div class="ui action input">
								<input type="file" onChange={this.uploadFile} />
							</div>

            </Segment>
        </Grid.Row>
      </Container>
    )
  }

}

export default withRouter(ViewPlayers);