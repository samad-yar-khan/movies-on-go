import React from 'react'
import {data} from '../data'
import Navbar from './Navbar'
import MovieCard from './MovieCard'

import {addMovies  , setShowFavourites} from '../actions/index'



class  App extends React.Component {


  componentDidMount(){
    // console.log("CDM");
    //make api call
    //dispatch action
     const { store } = this.props;
     store.subscribe(()=>{
       console.log(store.getState());
      this.forceUpdate();
     })

    store.dispatch(addMovies(data));
    // console.log(store.getState() , "STATE");
  }

  
  isMovieFavourite = (movie)=> {
    const {favourites} = this.props.store.getState();
    
    let index = favourites.indexOf(movie);
    // console.log(index);

    if(index !== -1){
     
      return true;
    }else{
      return false;
    }
  }

  OnTabChange(val){
    const { store } = this.props;
    store.dispatch(setShowFavourites(val));
  }
  

  render() {

    const {list , favourites , showFavourites} = this.props.store.getState();
    const displayMovies = showFavourites?favourites:list;
    console.log("Render");

      return (
        <div className="App">
          <Navbar />
          <div className="main">
            <div className="tabs">
              <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={()=> this.OnTabChange(false)}>Movies</div>
              <div className={`tab ${showFavourites ?'active-tabs' : ''}`} onClick={()=> this.OnTabChange(true)}>Favourites</div>
            </div>
            <div className='list'>
              { displayMovies.map((movie , index) => {
                return <MovieCard 
                          movie={movie}
                          key={`movies-${index}`}
                          dispatch = {this.props.store.dispatch}
                          isFavourite = {this.isMovieFavourite(movie)}
                        />
              })}
            {displayMovies.length === 0 ? <div className="no-movies">NO MOVIES TO SHOW </div> :null }
            </div>
          
          </div>
        </div>
      );
      }
}

export default App;
