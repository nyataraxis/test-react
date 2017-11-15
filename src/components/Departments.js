import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { push as pushState } from 'react-router-redux';

import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class Departments extends Component {
    static propTypes = {
        departments: PropTypes.array,
        pushState: PropTypes.func,

        children: PropTypes.node
    }

    render() {
        const { departments, children } = this.props;

        const items = departments.map(dep => (
            <MenuItem key={dep.id}>
                <Link to={`/departments/${dep.id}`}>
                    {dep.name}
                </Link>
            </MenuItem>
        ));

        return (
            <div>
                {children ||
                    <div>
                        {items}
                        <br />
                        <RaisedButton
                            primary
                            label="New"
                            onTouchTap={() => {
                                this.props.pushState('/departments/new');
                            }}
                        />

                    </div>
                }
            </div>
        );
    }
}


const decorate = compose(
    connect(
        state => ({
            departments: state.departments.items
        }),
        dispatch => bindActionCreators({
            pushState
        }, dispatch)
    )
);

export default decorate(Departments);
