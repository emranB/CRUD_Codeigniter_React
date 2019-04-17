import React, { PureComponent } from 'react';
import '../App.css';
import { Grid, Icon, Menu } from 'semantic-ui-react'



class Navigation extends PureComponent {
  render() {
    return (
      <Grid.Row>
        <Grid.Column>
          <Menu className='navbar'>
            <Menu.Item as='a' href='/view_players'>
              <Icon name='user' /> View All Players
            </Menu.Item>
            <Menu.Item as='a' href='/upload_players'>
              <Icon name='users' /> Upload a list of Players
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Navigation;
