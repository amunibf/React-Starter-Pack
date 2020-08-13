import axios from 'axios';
import { returnErrors } from "./errorActions";

import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
 } from "../actions/types";
 
//  .check token and load user
export const loadUser = () => (dispatch, getState)=>{
    //user loading{}
    dispatch({ type : USER_LOADING})

    axios
    .get('http://localhost:5000/api/auth/user', tokenConfig(getState))
    .then(res=>dispatch({ type : USER_LOADED, payload : res.data}))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({ type : AUTH_ERROR})
    }
    )
}

// register user 
export const register = ({name, email, password}) => dispatch =>{
    //headers
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }

    //req body
    const body = JSON.stringify({name,email,password})
    axios.post('http://localhost:5000/api/users',body, config)
    .then(res=>dispatch({
        type : REGISTER_SUCCESS,
        payload : res.data
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status,'REGISTER_FAIL'))
        dispatch({type : REGISTER_FAIL})
    })
}

//login user
export const login = ({ email, password}) => dispatch =>{
    //headers
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }

    //req body
    const body = JSON.stringify({email,password})
    axios.post('http://localhost:5000/api/auth',body, config)
    .then(res=>dispatch({
        type : LOGIN_SUCCESS,
        payload : res.data
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'))
        dispatch({type : LOGIN_FAIL})
    })
}

//logout user
export const logout = ()=>{
    return{
        type : LOGOUT_SUCCESS
    }
}

//setup config/header and token
export const tokenConfig = getState =>{
    //get token from local storage
    const token = getState().auth.token

    //headers
    const config = {
        headers : {
            "Content-type":"application/json"
        }
    }

    //if token exists, add it to header
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config
}
