import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { push as pushState } from 'react-router-redux';

import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class Employees extends Component {
    static propTypes = {
        employees: PropTypes.array,
        departments: PropTypes.array,
        pushState: PropTypes.func,

        children: PropTypes.node
    }

    render() {
        const { employees, departments, children } = this.props;

        const items = employees.map((employee) => {
            const department = departments.find(dep => dep.id === employee.departmentId);

            return (
                <MenuItem key={employee.id}>
                    <Link to={`/employees/${employee.id}`}>
                        {employee.firstName} {employee.lastName} - {department && department.name}
                    </Link>
                </MenuItem>
            );
        });

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
                            this.props.pushState('/employees/new');
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
            employees: state.employees.items,
            departments: state.departments.items
        }),
        dispatch => bindActionCreators({
            pushState
        }, dispatch)
    )
);

export default decorate(Employees);
