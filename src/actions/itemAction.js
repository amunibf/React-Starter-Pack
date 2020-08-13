import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../actions/types";
import axios from 'axios'
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

/* export const getItems = () =>{
    return {
        type : GET_ITEMS
    }
} */
export const getItems = () =>dispatch =>{
    dispatch(setItemsLoading())
    axios
    .get('http://localhost:5000/api/items')
    .then(res=>dispatch({
        type : GET_ITEMS,
        payload : res.data
    }))
    .catch(err=>dispatch(returnErrors(err.response.data, err.res)))
}

/* export const addItem = item =>{
    return {
        type : ADD_ITEM,
        payload : item
    }
} */

export const addItem = item => (dispatch, getState) =>{
    axios
    .post('http://localhost:5000/api/items', item, tokenConfig(getState))
    .then(res=>dispatch({
        type : ADD_ITEM,
        payload : res.data
    }))
    .catch(err=>dispatch(returnErrors(err.response.data, err.res)))
}

/* export const deleteItem = id =>{
    return {
        type : DELETE_ITEM,
        payload : id
    }
} */

export const deleteItem = id => (dispatch, getState) =>{
    axios
    .delete(`http://localhost:5000/api/items/${id}`, tokenConfig(getState))
    .then(res=>dispatch({
        type : DELETE_ITEM,
        payload : id
    }))
    .catch(err=>dispatch(returnErrors(err.response.data, err.res)))
}

export const setItemsLoading = () =>{
    return {
        type : ITEMS_LOADING
    }
}