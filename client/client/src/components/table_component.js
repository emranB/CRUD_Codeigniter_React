import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'
import '../App.css'


class TableComponent extends Component {
  
	constructor(props) {
		super(props);
    this.state = {};
    this.deletePlayer = this.deletePlayer.bind(this);
	}

	componentDidMount = () => {
    this.setState({
      TableHeaders: this.props.headers, 
      TableData: this.props.data
    })
  }

  /**
   * Concatenate parts of link together to form compiled link string
   * @input   array
   * @output  string
   */
  getCompiledLink = (paramsArray) => {
    return paramsArray.join('/');
  }

  deletePlayer(id) {
    if (window.confirm("Are you sure you want to delete this player?"))
    {
      console.log(id);		
      fetch('http://localhost/files/Kinduct_Code_Challenge/index.php/players_controller/delete_player/' + id, 
            {method: 'DELETE'})
      .then(response => response.json())
      .then(result => {
        window.location.reload();
			});
    }
	}
  	
	render = () => {
    if (!this.state.TableHeaders)
      return <p> Loading . . . </p>;

		return (
      <Table celled striped>

        <Table.Header>
          <Table.Row>
            {
              this.state.TableHeaders.map((header, i) => {
                return(
                  <Table.HeaderCell key={i}> {header} </Table.HeaderCell>
                )
              })
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/**
            * Glitchy semantic-ui -> Table.row cannot be used in 'return' 
            * Use 'tr' 'td' instead
            */}
            {
              this.state.TableData.map((row, i) => {
                return(
                  <tr key={i}>
                    <td > {row.Name} </td>
                    <td > {row.Age} </td>
                    <td > {Object.values(row.Location).join(', ')} </td>
                    <td > 
                      <Button.Group>
                        <Link className="btnLink" to={this.getCompiledLink(['view_player', row.ID])}>  
                          <Button positive> VIEW </Button>
                        </Link>
                        <Button.Or />
                        <Link className="btnLink">  
                          <Button negative onClick={() => this.deletePlayer(row.ID)}> DELETE </Button>
                        </Link>
                      </Button.Group>
                    </td>
                  </tr>
                )
              })
            }
        </Table.Body>
      </Table>
    )
  }

}

export default TableComponent;