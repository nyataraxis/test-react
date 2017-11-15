import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { push as pushState } from 'react-router-redux';

import { TextField, SelectField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { editEmployee, addEmployee } from '../store/employees';

const required = value => (value == null ? 'Required' : undefined);

class Employee extends Component {
    static propTypes = {
        employee: PropTypes.object,
        departments: PropTypes.array,
        handleSubmit: PropTypes.func,
        editEmployee: PropTypes.func,
        addEmployee: PropTypes.func,
        pushState: PropTypes.func,
        params: PropTypes.object,
        isNew: PropTypes.bool
    }

    submitAction = (data) => {
        const { params: { id }, isNew } = this.props;

        if (isNew) {
            this.props.addEmployee(data);
        } else {
            this.props.editEmployee(id, data);
        }

        setTimeout(() => {
            this.props.pushState('/employees');
        }, 10);
    }

    render() {
        const {
            departments, employee,
            handleSubmit, isNew
        } = this.props;

        return (
            <div>
                {(employee || isNew) ?
                    <div>
                        <h1>{employee && 'Edit'} {isNew && 'Add'} Employee</h1>

                        <form onSubmit={handleSubmit(data => this.submitAction(data))}>
                            <Field
                                name="firstName" component={TextField} hintText="First Name"
                                validate={required}
                            />
                            <br />
                            <Field
                                name="lastName" component={TextField} hintText="Last Name"
                                validate={required}
                            />
                            <br />
                            <Field
                                name="departmentId"
                                hintText="Department"
                                component={SelectField}
                                validate={required}
                            >
                                {departments.map(dep =>
                                    <MenuItem
                                        key={dep.id}
                                        value={dep.id}
                                        primaryText={dep.name}
                                    />
                                )}
                            </Field>

                            <br />
                            <RaisedButton
                                primary
                                label="Save"
                                type="submit"
                            />
                        </form>
                    </div>
                    :
                    <h1>Nothing found...</h1>
                }
            </div>
        );
    }
}

const decorate = compose(
    connect(
        (state, { params, route: { isNew } }) => {
            const { id } = params;


            const employee = !isNew
                ? state.employees.items.find(emp => emp.id === Number(id))
                : null;

            const initialValues = employee || {};

            return {
                isNew,
                employee,
                departments: state.departments.items,
                initialValues
            };
        },
        dispatch => bindActionCreators({
            addEmployee,
            editEmployee,
            pushState
        }, dispatch)
    ),
    reduxForm({
        form: 'employeesForm'
    })
);

export default decorate(Employee);
