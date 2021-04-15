import React from 'react'
import { render } from 'react-dom';


class Navbar extends React.Component{


  
    render(){
        return (
        <div className="nav">
            <div className='search-container'>
                <input />
                <button id='search-btn'>Search</button>
            
            </div>
        </div>
       );
    }


}
export default Navbar;
