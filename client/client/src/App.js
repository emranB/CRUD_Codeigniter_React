import React, { PureComponent } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ViewPlayers from './components/view_players'
import ViewPlayer from './components/view_player'
import UploadPlayers from './components/upload_players'


class App extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ViewPlayers} />
          <Route exact path='/view_players' component={ViewPlayers} />
          <Route exact path='/view_player/:id' component={ViewPlayer} />
          <Route path='/upload_players' component={UploadPlayers} />
        </div>
      </Router>
    );
  }
}

export default App;
