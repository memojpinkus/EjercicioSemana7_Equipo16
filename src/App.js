import React, {Component, Fragment} from 'react';
import itt from './itt.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import {useState} from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


class App extends Component{
  constructor(){
    super();
    this.state = {
      materia:{
        clave: "",
        nombre: "",
        calificacion: "",
      },
      lista:[],
      desactivado: false,
    };
  }

  guardarCambios=(e)=>{
    this.setState({
      ...this.state,
      materia:{
        ...this.state.materia,
        [e.target.name]: e.target.value
      }
    });
  }

  eliminar=(id)=>{
    const temp = this.state.lista.filter(a=>a.clave!==id)
    this.setState({
      ...this.state,
      lista:temp
    })
  }

  modificar=(id)=>{
    const temp = this.state.lista.find(a=>a.clave===id)
    this.setState({
      ...this.state,
      materia:{

        clave: temp.clave,
        nombre: temp.nombre,
        calificacion: temp.calificacion,
      },
      desactivado: true,
    })
  }

  enviar=(e)=>{
    e.preventDefault();

    const {clave, nombre, calificacion} = this.state.materia;

    const vacios = (clave.length === 0 && nombre.length === 0 && calificacion.length === 0)

    if(!vacios){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Alumno agregado",
        showConfirmButton: false,
        timer: 1500
      })

      let temp = this.state.lista;

      if(this.state.desactivado === true){
        temp = temp.filter(a=>a.clave!==clave)
      }

      this.setState({
        ...this.State,
        lista:[...temp,this.state.materia],
        materia:{
          clave:"",
          nombre:"",
          calificacion:"",
        },
        desactivado: false
      })
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Falta de ingresar datos',
        showConfirmButton: false,
        timer: 1500,
      })
      return;
    }
  }

  render(){

    const {clave, nombre, calificacion} = this.state.materia;

    return(

      <div className='App'>

        <header className='Header'>
            <img src={itt} alt='logo'></img>
        </header>

        <div className='Flex'>

          <div className='Form'>

            <form onSubmit={this.enviar}>

              <div>
                <label htmlFor='clave'>Clave</label>
                <input
                  type="text"
                  placeholder='Ej. AEB-1011'
                  onChange={this.guardarCambios}
                  value={this.state.materia.clave}
                  name="clave"
                  disabled={this.state.desactivado}></input>
              </div>

              <div>
                <label htmlFor='nombre'>Materia</label>
                <input
                  type="text"
                  placeholder='Ej. Desarrollo de aplicaciones móviles'
                  onChange={this.guardarCambios}
                  value={this.state.materia.nombre}
                  name="nombre"></input>
              </div>

              <div>
                <label htmlFor='calificacion'>Calificación</label>
                  <input
                    type="number"
                    placeholder='Ej. 87'
                    onChange={this.guardarCambios}
                    value={this.state.materia.calificacion}
                    name="calificacion"></input>
              </div>

              <Button type='submit'>Enviar</Button>

            </form>

          </div>

          <div className='Table'>


            {
            this.state.lista.length === 0
            ? <p>No hay materias</p>
            :
            <Table striped bordered hover>
              <thead>
                <tr></tr>
                  <th>Clave</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                <tr></tr>
              </thead>
                <tbody>
                {
                  this.state.lista.map((a,index)=>
                  <tr key={index}>
                    <td>{a.clave}</td>
                    <td>{a.nombre}</td>
                    <td>{a.calificacion}</td>
                    <td><Button onClick={()=>this.eliminar(a.clave)} variant='danger'>Eliminar</Button></td>
                    <td><Button onClick={()=>this.modificar(a.clave)} variant='success'>Modificar</Button></td>
                  </tr>
                  )
                }
                </tbody>
            </Table>
            }
            
          </div>

        </div>

      </div>
    )
  }
}

export default App;