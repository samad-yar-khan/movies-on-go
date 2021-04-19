import React from 'react'

import {addFavourites} from '../actions/index'



class MovieCard extends React.Component{

    handleFavouritesClick = ()=>{
    
        this.props.dispatch(addFavourites(this.props.movie));
    }

    handleUnFavouritesClick = ()=>{
    
        this.props.dispatch(addFavourites(this.props.movie));
    }

    render(){

        const {movie} = this.props;
        return (
        <div className="movie-card">
            <div className="left" >
                <img alt='movie-poster 'src={movie.Poster}/>
            </div>
            <div className="right">
                <div className="title">
                    {movie.Title}
                </div>
                <div className="plot">
                    {movie.Plot}
                </div>
                <div className="footer">
                    <div className="rating">
                        {movie.imdbRating}
                    </div>
                    {this.props.isFavourite ?
                        <button className="unfavourite-btn" onClick={this.handleUnFavouritesClick} >
                            Unfavourite
                        </button>
                       :
                       <button className="favourite-btn" onClick={this.handleFavouritesClick} >
                            Favourite
                        </button>
                    }
                </div>
                

            </div>
        </div>
       );
    }


}
export default MovieCard;
