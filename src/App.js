import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import Form from './components/Form';
import { peliculas } from './peliculas.json';


class App extends Component {

  constructor(){
    super(); //hereda func de react
    this.state = {
      peliculas
    };    
    this.handleAddPelis=this.handleAddPelis.bind(this);    
 
  }
  handleAddPelis(movies){
    this.setState({
      peliculas: [...this.state.peliculas, movies]
    })
  }
  removePelis(index){
    if (window.confirm('Estas seguro de querer eliminarlo?')){
      
      this.setState({
        peliculas: this.state.peliculas.filter((e, i) => {
          return i !== index
        })
      })
    }
  }
  render() {
    const pelis = this.state.peliculas.map((movies,i) =>{
      return (
        <div className="col-md-4" key={i}>
          <div className="card mt-4"> {/* mt es margen top para el margen entre tarjetas*/}
            <div className="card-header">
              <h3> {movies.tittle}  </h3>
              <span className="badge badge-pill badge-danger ml-2">
                {movies.Nota}
              </span>
            </div>
            <div className="card-body">
              <p>{movies.descripción}</p>
              <p><mark>{movies.creador}</mark></p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger"
                      onClick={this.removePelis.bind(this,i)}                     
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="App">
        <Navbar titulo='Peliculas en React' nPelis= {this.state.peliculas.length}/>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <img src={logo} className="App-logo" alt="logo" />
              <Form onAddTarea={this.handleAddPelis}/>
            </div>
          <div className="col-md-8">
            <div className="row"> {/* espaciado de arriba de la pagina con el card */}
              {pelis}
            </div>
          </div>
          </div> 
          </div>
        </div>
    );
  }
}

export default App;
