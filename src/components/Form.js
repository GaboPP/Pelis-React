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