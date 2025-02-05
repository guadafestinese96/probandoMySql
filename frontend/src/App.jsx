import { useState } from 'react'
import './App.css'
import Axios from 'axios';


function App() {

  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [cantidadMl, setCantidadMl] = useState(0);
  const [genero, setGenero] = useState('');

  const registrarPerfume =()=>{
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      marca: marca,
      cantidadMl: cantidadMl,
      genero: genero
    }).then(()=>{
      alert('perfume registrado');
    })
  }

  return (
    <div className="App">
      <div className="datos">
        <label htmlFor="">Nombre: <input type="text" 
        onChange={(e)=>{
          setNombre(e.target.value)
        }}
        /></label>
        <label htmlFor="">Marca: <input type="text" 
        onChange={(e)=>{
          setMarca(e.target.value)
        }}
        /></label>
        <label htmlFor="">Cantidad ML: <input type="number" 
        onChange={(e)=>{
          setCantidadMl(e.target.value)
        }}
        /></label>
        <label htmlFor="">Genero: <input type="text" 
        onChange={(e)=>{
          setGenero(e.target.value)
        }}
        /></label>
        

        <button className='botonRegistrar' onClick={registrarPerfume}>Registrar</button>
      </div>
    </div>
  )
}

export default App
