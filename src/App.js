/*
import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import { Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Col md={12} id="selRend" />
       
      </div>
    );
  }
}

export default App;

*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { getDepartments } from './store/departments';
import { getEmployees } from './store/employees';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Col, Nav, NavItem } from 'react-bootstrap';

import './App.css';

injectTapEventPlugin();

class App extends Component {
    static propTypes = {
        getDepartments: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,

        children: PropTypes.node
    }

    constructor(props) {
        super(props);

        this.props.getDepartments();
        this.props.getEmployees();
    }

    render() {
        const { children } = this.props;

        const isOpen = true;

        return (
          
          
          <MuiThemeProvider>
                <div>
                    <AppBar />
                    <div className="content">
                        {children ||
                            <h1>
                                Feel free to choose any you like.
                            </h1>
                        }
                    </div>
                    <Drawer open={isOpen}>
                        <AppBar
                            title="React App"
                            showMenuIconButton={false}
                        />
                        <MenuItem>
                            <Link to="/departments" activeClassName="route--active">
                                Departments
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/employees" activeClassName="route--active">
                                Employees
                            </Link>
                        </MenuItem>
                    </Drawer>
                </div>
            </MuiThemeProvider>
    
     
          
        );
    }
}

const decorate = compose(
    connect(
        null,
        dispatch => bindActionCreators({
            getDepartments, getEmployees
        }, dispatch)
    )
);

export default decorate(App);
