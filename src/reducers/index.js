
import {ADD_MOVIES} from '../actions/index'

export default function movies(state =  [] , action){
    //reducers  are passed to the action at the time f creation and hence the last return statemets sets the initial state of the store
    //afte that thhe coscetive states are set by dipattching the actions 
    //---
    //string comparisons take more time compares to var comparisons and variables can be cchanges
    //this gives us the adbility to changes name for action typpes
    if(action.type === ADD_MOVIES){
        return action.movies;
    }
    // console.log("heya");
    return state;

}
