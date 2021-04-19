import React from 'react'
import {data} from '../data'
import Navbar from './Navbar'
import MovieCard from './MovieCard'

import {addMovies} from '../actions/index'


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

 
  

  render() {

    const {list} = this.props.store.getState();
    console.log("Render");

      return (
        <div className="App">
          <Navbar />
          <div className="main">
            <div className="tabs">
              <div className="tab">Movies</div>
              <div className="tab">Favourites</div>
            </div>
            <div className='list'>
              {list.map((movie , index) => {
                return <MovieCard 
                          movie={movie}
                          key={`movies-${index}`}
                          dispatch = {this.props.store.dispatch}
                          isFavourite = {this.isMovieFavourite(movie)}
                        />
              })}
            </div>
          </div>
        </div>
      );
      }
}

export default App;
