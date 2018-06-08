Se instala la aplicación globalmente

~~~
npm install -g create-react-app
~~~

Para crear nuestro projecto se usa el siguiente comando 

~~~
create-react-app [nombre_de_la_app_sin_mayusculas]
~~~

Si queremos probar nuestra aplicación por defecto ejecutamos

~~~
npm start
~~~
cada cambio que realices al proyecto, se actualizara constantemente en la pagina.
luego para cerrar el servidor apretamos ctrl+c en la consola de comandos.
primero en la carpeta public en el archivo index.html importamos bootstrap 4. Esto debe hacerce en el header copiando y pegando la siguiente linea de comandos

~~~
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
~~~
  
en la carpeta src creamos un archivo peliculas.json para la manipulación de datos
~~~
{
    "peliculas": [
        {
            "tittle": "Lo que el lodo se llevó",
            "creador" : "lodonsio",
            "descripción" : "Peliculas sobre perros",
            "Nota": "5.5"
        },
        {
            "tittle": "Revengers Unlimited war",
            "creador" : "dasney",
            "descripción" : "pelicula de super Heroes",
            "Nota": "9.9"
        },
        {
            "tittle": "Taitanic",
            "creador" : "jaime camarón",
            "descripción" : "pelicula que se una un bote",
            "Nota": "7.7"
        }
        ]
}
~~~



Modificamos el app.css para cambiar el estilo de nuestra pagina
~~~
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
}
@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

~~~
junto al index.css cambiando el color de fondo y quitando margenes.

~~~
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #41295a;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2F0743, #41295a);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2F0743, #41295a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
~~~
Ahora vamos a genera componentes, el primero será una navbar en el top de la pagina, para esto creamos una carpeta components en src y dentro de esta carpeta un archivo Navbar.js (los componentes deben estar con mayusculas para que no se confundan con etiquetas html)

~~~
import React, {Component} from 'react';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-light bg-light">
            <a href=""> 
                {this.props.titulo} 
            
            <span className="badge badge-pill badge-dark ml-2">
                {this.props.ntareas}
            </span>
            </a>
          </nav>
        )
    }

}

export default Navbar;
~~~
ahora debemos incluirla en nuestra app, vamos a app.js

~~~
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar titulo='Peliculas en React' nPelis= '3'/>
          <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default App;


~~~

Luego vamos a importar en App.js nuestro json peliculas para manipular sus datos, para manipular sus datos creamos un constructor dentro de nuestra class app con el comando super() que hereda las funciones de react y this.state = {peliculas} que guardara nuestros datos y por ultimo creamos unas cards de bootstrap para mostrar nuestras pelis

~~~
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import { peliculas } from './peliculas.json';

class App extends Component {

  constructor(){
    super(); //hereda func de react
    this.state = {
      peliculas
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
          </div>
        </div>
      )
    })
    return (
      <div className="App">
        <Navbar titulo='Peliculas en React' nPelis= '3'/>
          <img src={logo} className="App-logo" alt="logo" />
      
       <div className="col-md-8">
       <div className="row"> {/* espaciado de arriba de la pagina con el card */}
         {pelis}
       </div>
     </div>
     </div>
    );
  }
}

export default App;


~~~
podemos probar nuestra app con ´npm start´.
para que el contandor de peliculas del navbar funciones ponemos en la etiqueta de NAvbar,nPelis = {this.state.peliculas.length}.

Ahora crearemos un Form para poder agregar pelis, entonces vamos a nuestar carpeta components y creamos un Form.js

~~~
import React, {Component} from 'react';

class Form extends Component {
    constructor(){
        super();
        this.state = {
            tittle: '',
            creador : '',
            descripción : '',
            Nota: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleInput(e){     
        const {value, name} = e.target;
        this.setState({
            [name]: value 
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.onAddTarea(this.state);
        console.log('sending data...');
    }
    
    render(){
      return(
        <div className="card">
            <form onSubmit={this.handleSubmit} className="card-body">
                <div className="form-group">
                    <input
                        type="text"
                        name="tittle"
                        onChange={this.handleInput}
                        className ="form-control"
                        placeholder= "Tittle"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="creador"
                        className ="form-control"
                        placeholder= "Creador"
                        onChange={this.handleInput}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="descripción"
                        className ="form-control"
                        placeholder= "descripción"
                        onChange={this.handleInput}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="Nota"
                        className ="form-control"
                        placeholder= "Nota"
                        onChange={this.handleInput}
                    />
                </div>
            <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    )
  }

}
export default Form;

~~~
 Luego en App.js debemos incluir el form con un import y modificaremos un poco la vista del return()

~~~
      <div className="App">
        <Navbar titulo='Peliculas en React' nPelis= {this.state.peliculas.length}/>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <img src={logo} className="App-logo" alt="logo" />
              <Form onAddTarea={this.handleAddTareas.bind(this)}/>
            </div>
          <div className="col-md-8">
            <div className="row"> {/* espaciado de arriba de la pagina con el card */}
              {pelis}
            </div>
          </div>
          </div> 
          </div>
        </div>
~~~
Ahora crearemos la funcion handleAddTareas donde agregaremos las tareas al state esta funcion la escribimos vajo el constructor

~~~
  handleAddPelis(movies){
    this.setState({
      peliculas: [...this.state.peliculas, movies]
    })
  }
~~~
y dentro del constructor y bajo el state hacemos un bind de la función para que sea reconocida

~~~
this.handleAddPelis=this.handleAddPelis.bind(this); 
~~~

Listo! puedes probar tu app.
ahora crearemos un boton para remover estas peliculas.
en app.js, en la parte que estan nuestas cards, agregamos un footer bajo ellas, bajo el card-body escribimos (fuera de el)

~~~

            <div className="card-footer"
		onClick={this.removePelis.bind(this,i)}>
              <button className="btn btn-danger"                     
              >
                Remover
              </button>
            </div>
~~~

esto nos genera un boton para remover pero ahora debemos darle funcionalidad, creamos la funcion removePelis (a esta le hacemos un bind directamente en el html, tambien se puede hacer en el constructor como hicimos anteriormente)

~~~
  removePelis(index){
    if (window.confirm('Estas seguro de querer eliminarlo?')){
      
      this.setState({
        peliculas: this.state.peliculas.filter((e, i) => {
          return i !== index
        })
      })
    }
  }
~~~

 Y listo , prueba tu app y sigue desarrollando ! :D



