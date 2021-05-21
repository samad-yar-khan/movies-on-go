import React from 'react'
import { StoreContext } from '../index';
import {handleMovieSearch , addToMovieList} from '../actions/index'
 


class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searchText : ''
        }
    }

    handleAddMovie = (movie)=>{
        this.props.dispatch(addToMovieList(movie));
    }


    handleSearch = () => {
        const {searchText} = this.state;
        //no we call an action to search for thi text
        this.props.dispatch(handleMovieSearch(searchText));

    }

    handleChange = (e)=>{
        this.setState({
            searchText : e.target.value
        })
    }

    render(){

        const {result:movie , showSearchResults} = this.props.search 

        return (
        <div className="nav">
            <div className='search-container'>
                <input onChange={this.handleChange}/>
                <button id='search-btn' onClick={this.handleSearch}>Search</button>
            
                { showSearchResults &&
            <div className='search-results'>
                <div className='search-result'>
                    <img src={movie.Poster} alt='MoviePOster'/>
                    <div className='movie-info'>
                    <span>
                        {movie.Title}
                    </span>
                    <button className='search-btn' onClick={()=>{this.handleAddMovie(movie)}}>
                        ADD TO MOVIES
                    </button>
                </div>
                </div>
                
            </div>
            }
            </div>
           
        </div>
        
       );
    }


}

class NavbarWrapper extends React.Component{

    render(){

        return(
            <StoreContext.Consumer>
                {
                    (store) => <Navbar dispatch={store.dispatch} search={this.props.search}  />
                }
            </StoreContext.Consumer>
        )

    }

}


export default NavbarWrapper;
