import React, {Component} from 'react';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-light bg-light">
            <a href=""> 
                {this.props.titulo} 
            
            <span className="badge badge-pill badge-dark ml-2">
                {this.props.nPelis}
            </span>
            </a>
          </nav>
        )
    }

}

export default Navbar;