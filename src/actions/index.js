// {
//     type : "ADD_MOVIES" , 
//     movies : ["MOVIE1" , "MOVIE2"]
// }

//Action types

//we store our types as variables soe theyc an be used and changed throughout the app 
//variable comparisons store time in reducers
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";

//Action creators

//instead of passing the action object to the disppatcher directly , we write a action creator which can create the action for us , we need to just pass releet data and it can be used bby our dispatcher

export function  addMovies(data){
    return {
        type : ADD_MOVIES ,
        movies : data
    }
}

export function  addToFavourites(movie){
    return {
        type : ADD_TO_FAVOURITES ,
        movie : movie
    }
}

export function  removeFromFavourites(movie){
    return {
        type : REMOVE_FROM_FAVOURITES ,
        movie : movie
    }
}
