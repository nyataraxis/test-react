import apiClient from '../helpers/ApiClient';

const GET_EMPLOYEES = 'app/employees/GET_EMPLOYEES';
const GET_EMPLOYEES_SUCCESS = 'app/employees/GET_EMPLOYEES_SUCCESS';
const GET_EMPLOYEES_FAIL = 'app/employees/GET_EMPLOYEES_FAIL';

const ADD_EMPLOYEE = 'app/employees/ADD_EMPLOYEE';
const ADD_EMPLOYEE_SUCCESS = 'app/employees/ADD_EMPLOYEE_SUCCESS';
const ADD_EMPLOYEE_FAIL = 'app/employees/ADD_EMPLOYEE_FAIL';

const EDIT_EMPLOYEE = 'app/employees/EDIT_EMPLOYEE';
const EDIT_EMPLOYEE_SUCCESS = 'app/employees/EDIT_EMPLOYEE_SUCCESS';
const EDIT_EMPLOYEE_FAIL = 'app/employees/EDIT_EMPLOYEE_FAIL';

const initialState = {
    loading: false,
    items: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_EMPLOYEES: {
            return {
                ...state,
                loading: true
            };
        }

        case GET_EMPLOYEES_SUCCESS: {
            const { payload } = action;

            const items = payload.map((item, index) => ({
                ...item,
                id: index + 1,
            }));

            return {
                ...state,
                items,
                loading: false
            };
        }

        case GET_EMPLOYEES_FAIL: {
            return {
                ...state,
                loading: false
            };
        }

        case EDIT_EMPLOYEE_SUCCESS: {
            const { payload } = action;

            const items = [...state.items];
            const index = items.findIndex(item => item.id === payload.id);

            if (index > -1) {
                items[index] = payload;
            }

            return {
                ...state,
                items
            };
        }

        case ADD_EMPLOYEE_SUCCESS: {
            const { payload } = action;

            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ]
            };
        }

        case ADD_EMPLOYEE:
        case ADD_EMPLOYEE_FAIL:
        case EDIT_EMPLOYEE:
        case EDIT_EMPLOYEE_FAIL: {
            return state;
        }


        default:
            return state;

    }
}

export function getEmployees() {
    return (dispatch) => {
        dispatch({
            type: GET_EMPLOYEES
        });

        apiClient('get', 'employees')
            .then((res) => {
                dispatch({
                    type: GET_EMPLOYEES_SUCCESS,
                    payload: res
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_EMPLOYEES_FAIL
                });
            });
    };
}

export function editEmployee(id, data) {
    return (dispatch) => {
        dispatch({
            type: EDIT_EMPLOYEE
        });

        apiClient('put', `employees/${id}`, { data })
            .then((res) => {
                dispatch({
                    type: EDIT_EMPLOYEE_SUCCESS,
                    payload: res
                });
            })
            .catch(() => {
                dispatch({
                    type: EDIT_EMPLOYEE_FAIL
                });
            });
    };
}

export function addEmployee(data) {
    return (dispatch) => {
        dispatch({
            type: ADD_EMPLOYEE
        });

        apiClient('post', 'employees', { data })
            .then((res) => {
                dispatch({
                    type: ADD_EMPLOYEE_SUCCESS,
                    payload: res
                });
            })
            .catch(() => {
                dispatch({
                    type: ADD_EMPLOYEE_FAIL
                });
            });
    };
}
