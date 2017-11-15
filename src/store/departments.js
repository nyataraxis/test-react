import apiClient from '../helpers/ApiClient';

const GET_DEPARTMENTS = 'app/departments/GET_DEPARTMENTS';
const GET_DEPARTMENTS_SUCCESS = 'app/departments/GET_DEPARTMENTS_SUCCESS';
const GET_DEPARTMENTS_FAIL = 'app/departments/GET_DEPARTMENTS_FAIL';

const ADD_DEPARTMENT = 'app/departments/ADD_DEPARTMENT';
const ADD_DEPARTMENT_SUCCESS = 'app/departments/ADD_DEPARTMENT_SUCCESS';
const ADD_DEPARTMENT_FAIL = 'app/departments/ADD_DEPARTMENT_FAIL';

const EDIT_DEPARTMENT = 'app/departments/EDIT_DEPARTMENT';
const EDIT_DEPARTMENT_SUCCESS = 'app/departments/EDIT_DEPARTMENT_SUCCESS';
const EDIT_DEPARTMENT_FAIL = 'app/departments/EDIT_DEPARTMENT_FAIL';

const initialState = {
    loading: false,
    items: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_DEPARTMENTS: {
            return {
                ...state,
                loading: true
            };
        }

        case GET_DEPARTMENTS_SUCCESS: {
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

        case GET_DEPARTMENTS_FAIL: {
            return {
                ...state,
                loading: false
            };
        }

        case EDIT_DEPARTMENT_SUCCESS: {
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

        case ADD_DEPARTMENT_SUCCESS: {
            const { payload } = action;

            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ]
            };
        }

        case ADD_DEPARTMENT:
        case ADD_DEPARTMENT_FAIL:
        case EDIT_DEPARTMENT:
        case EDIT_DEPARTMENT_FAIL: {
            return state;
        }


        default:
            return state;

    }
}

export function getDepartments() {
    return (dispatch) => {
        dispatch({
            type: GET_DEPARTMENTS
        });

        apiClient('get', 'departments')
            .then((res) => {
                dispatch({
                    type: GET_DEPARTMENTS_SUCCESS,
                    payload: res
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_DEPARTMENTS_FAIL
                });
            });
    };
}

export function editDepartment(id, data) {
    return (dispatch) => {
        dispatch({
            type: EDIT_DEPARTMENT
        });

        apiClient('put', `departments/${id}`, { data })
            .then((res) => {
                dispatch({
                    type: EDIT_DEPARTMENT_SUCCESS,
                    payload: res
                });
            })
            .catch(() => {
                dispatch({
                    type: EDIT_DEPARTMENT_FAIL
                });
            });
    };
}

export function addDepartment(data) {
    return (dispatch) => {
        dispatch({
            type: ADD_DEPARTMENT
        });

        apiClient('post', 'departments', { data })
            .then((res) => {
                dispatch({
                    type: ADD_DEPARTMENT_SUCCESS,
                    payload: res
                });
            })
            .catch(() => {
                dispatch({
                    type: ADD_DEPARTMENT_FAIL
                });
            });
    };
}
