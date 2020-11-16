import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from './firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      nombre: '',
      horas: '',
      sueldo: '',
      sueldoN: '',
    },
    id: 0
  };

  peticionGet = () => {
    firebase.child("Empleados").on("value", (nombre) => {
      if (nombre.val() !== null) {
        this.setState({ ...this.state.data, data: nombre.val() });
      } else {
        this.setState({ data: [] });
      }
    });

    
  };

  peticionPost=()=>{
    firebase.child("Empleados").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut=()=>{
    firebase.child(`Empleados/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

  peticionDelete=()=>{
    if(window.confirm(`Estás seguro que deseas eliminar el empleado ${this.state.form && this.state.form.nombre}?`))
    {
    firebase.child(`Empleados/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarEmpleado=async(nombre, id, caso)=>{

    await this.setState({form: nombre, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }



  render() {
    return (
      <div className="App">
        <br />
        
        <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>
        <br />
        <br />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Horas Trabajadas</th>
              <th>Sueldo sin descuentos</th>
              <th>Sueldo Neto</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
            
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].nombre}</td>
                <td>{this.state.data[i].horas}</td>
                <td>{this.state.data[i].horas*9.75}</td>
                <td>{this.state.data[i].horas*9.75}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarEmpleado(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={()=>this.seleccionarEmpleado(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                </td>

              </tr>
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre del Empleado: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={this.handleChange}/>
          <br />
          <label>Horas Trabaajadas: </label>
          <br />
          <input type="text" className="form-control" name="horas" onChange={this.handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>



    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={this.handleChange} value={this.state.form && this.state.form.nombre}/>
          <br />
          <label>Horas: </label>
          <br />
          <input type="text" className="form-control" name="horas" onChange={this.handleChange} value={this.state.form && this.state.form.pais}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>
      </div>
    );
  }
}

export default App;
