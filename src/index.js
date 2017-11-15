/*import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import apiClient from './helpers/ApiClient';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Navi } from './Navi.js';
import { Nav, NavItem } from 'react-bootstrap';


class Navi extends Component{



handleSelect(selectedKey) {
  
//let res = apiClient('get', 'departments');
var resuG = apiClient('get', 'departments')
  	.then((res) => {
  		console.log(res);
  		return(res: body);})
    .catch(() => {()=>'error';});
  console.log(resuG);
  this.setState({counter: selectedKey});
}

constructor(props) {
        super(props);
        this.state = {counter: 1};
        this.handleSelect = this.handleSelect.bind(this);

    }
render(){
	return(
		
	    <Nav className="Navi" bsStyle="pills" stacked activeKey={this.state.counter} onSelect={this.handleSelect}>
	      <NavItem eventKey={1} href="/departments">NavItem 1 content</NavItem>
	      <NavItem eventKey={2} href="/employees">NavItem 2 content</NavItem>
	      <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
	    </Nav>
    	
    );
}

}

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Navi />, document.getElementById('selRend'));
registerServiceWorker();
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import {
    Departments,
    Department,
    Employees,
    Employee
} from './components';

import configureStore from './store';

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/departments/new" component={Department} isNew />
                <Route path="/departments" component={Departments}>
                    <Route path=":id" component={Department} />
                </Route>

                <Route path="/employees/new" component={Employee} isNew />
                <Route path="/employees" component={Employees}>
                    <Route path=":id" component={Employee} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
