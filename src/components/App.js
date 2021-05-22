import React from 'react'
import {data} from '../data'
import Navbar from './Navbar'
import MovieCard from './MovieCard'

import {addMovies  , setShowFavourites} from '../actions/index'

import {connect} from 'react-redux' 
//inside the context properrt of our StoreContext we have a consumer property using whcih we we can acess the store property passed to our provider
//we caan only use Cosumer method inside render 



class  App extends React.Component {


  componentDidMount(){
    //make api call
    //dispatch action
    //no need fr this as we have now substibed to store in our connctedComponent 
    //  const { store } = this.props;
    //  store.subscribe(()=>{
    //    console.log(store.getState());
    //   this.forceUpdate();
    //  })

    this.props.dispatch(addMovies(data));
    // console.log(store.getState() , "STATE");
  }

  
  isMovieFavourite = (movie)=> {
    const {movies } = this.props;
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
    
    this.props.dispatch(setShowFavourites(val));
  }
  

  render() {

    const {movies} = this.props; // {movie:[] , search:{}}
    const {list , favourites , showFavourites} = movies;
    const displayMovies = showFavourites?favourites:list;
    // console.log(this.props.store.getState());

      return(
 
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
                                  dispatch = {this.props.dispatch}
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


// *We are making thus arapper class because or app class needs store as a prop so it can be used in all methods*/


// class AppWrapper extends React.Component{

//   render(){

//     return(
//       <StoreContext.Consumer>
//         {store => <App store={store} />}
//       </StoreContext.Consumer>
//     )

//   }
// }

//this function tells whats propertues we need from state for our component 
function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.search
  };
}

const ConnectedAppComponennt = connect(mapStateToProps)(App);

export default ConnectedAppComponennt;
