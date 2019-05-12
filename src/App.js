import React, { Component } from 'react';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar'
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends React.Component {
  state = {
    value: 'one',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
              
            </IconButton>
            <Typography variant="h6" color="inherit">
              Personal Trainer App
            </Typography>
          </Toolbar>
        </AppBar>
        <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab value='one'label="Customers" />
          <Tab value='two'label="Trainings" />
          <Tab value='three'label="Calendar" />
        </Tabs>
        {this.state.value === 'one' && <CustomerList />}
        {this.state.value === 'two' && <TrainingList />}
        {this.state.value === 'three' && <Calendar />}
      </div>
    );
  }
}

export default App;
