import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { push as pushState } from 'react-router-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { editDepartment, addDepartment } from '../store/departments';

class Department extends Component {
    static propTypes = {
        department: PropTypes.object,
        handleSubmit: PropTypes.func,
        editDepartment: PropTypes.func,
        addDepartment: PropTypes.func,
        pushState: PropTypes.func,
        params: PropTypes.object,
        isNew: PropTypes.bool,
    }

    submitAction = (data) => {
        const { params: { id }, isNew } = this.props;

        if (isNew) {
            this.props.addDepartment(data);
        } else {
            this.props.editDepartment(id, data);
        }

        setTimeout(() => {
            this.props.pushState('/departments');
        }, 10);
    }

    render() {
        const { department, handleSubmit, isNew } = this.props;
        const delButton = <RaisedButton
                                primary
                                label="Delete"
                                type="submit"
                            />;
        return (
            <div>
                {(department || isNew) ?
                    <div>
                        <h1>{department && 'Edit'} {isNew && 'Add'} Department</h1>

                        <form onSubmit={handleSubmit(data => this.submitAction(data))}>
                            <Field name="name" component={TextField} hintText="Name" />

                            <br />
                            <RaisedButton
                                primary
                                label="Save"
                                type="submit"
                            />

                            {department && delButton};
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

            const department = !isNew
                ? state.departments.items.find(dep => dep.id === Number(id))
                : null;

            const initialValues = department || {};

            return {
                isNew,
                department,
                initialValues
            };
        },
        dispatch => bindActionCreators({
            editDepartment, addDepartment,
            pushState
        }, dispatch)
    ),
    reduxForm({
        form: 'departmentsForm'
    })
);

export default decorate(Department);
