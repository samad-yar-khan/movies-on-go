import React from 'react'
import {data} from '../data'
import Navbar from './Navbar'
import MovieCard from './MovieCard'

import {addMovies  , setShowFavourites} from '../actions/index'

import {StoreContext} from '../index' 
//inside the context properrt of our StoreContext we have a consumer property using whcih we we can acess the store property passed to our provider
//we caan only use Cosumer method inside render 



class  App extends React.Component {


  componentDidMount(){
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
    const {movies } = this.props.store.getState();
    const {favourites} = movies;
    
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

    const {movies , search} = this.props.store.getState(); // {movie:[] , search:{}}
    const {list , favourites , showFavourites} = movies;
    const displayMovies = showFavourites?favourites:list;
    console.log(this.props.store.getState());

      return(
        <StoreContext.Consumer>

          {
            (store)=>{//callback func nessessary to get store from provider //this store is the object which we passed to provider and we are getting it back forom consumer
              return (
                <div className="App">
                  <Navbar
                      dispatch = {store.dispatch}
                      search = {search}
                        />
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

        
        </StoreContext.Consumer>
      )

  
      }
}

export default App;
