import { v4 as uuidv4 } from 'uuid'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../actions/types";

const initialState = {
    items : [],
    loading : false
    /* items : [
        {id : uuidv4(), name : 'Eggs'},
        {id : uuidv4(), name : 'Milk'},
        {id : uuidv4(), name : 'Steak'},
        {id : uuidv4(), name : 'Water'},
    ]  */
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items : action.payload,
                loading : false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items : state.items.filter(item=>item._id!==action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                items : [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading : true
            }
        default:
            return state
    }
}
