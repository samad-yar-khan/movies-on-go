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
      //  console.log("UPdate");
      //  movies = store.getState();
      this.forceUpdate();
     })

    store.dispatch(addMovies(data));
    // console.log(store.getState() , "STATE");
  }
 
  

  render() {

    const movies = this.props.store.getState();
    // console.log("Render");

      return (
        <div className="App">
          <Navbar />
          <div className="main">
            <div className="tabs">
              <div className="tab">Movies</div>
              <div className="tab">Favourites</div>
            </div>
            <div className='list'>
              {movies.map((movie , index) => {
                return <MovieCard 
                          movie={movie}
                          key={`movies-${index}`}
                        />
              })}
            </div>
          </div>
        </div>
      );
      }
}

export default App;
