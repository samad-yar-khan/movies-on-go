import React from 'react'
import {handleMovieSearch} from '../actions/index'



class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showSearchResults : false,
            searchText : ''
        }
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
        return (
        <div className="nav">
            <div className='search-container'>
                <input onChange={this.handleChange}/>
                <button id='search-btn' onClick={this.handleSearch}>Search</button>
            
            </div>
        </div>
       );
    }


}
export default Navbar;
