import { useState } from 'react'
import './App.css'
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




function App() {

  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [cantidadMl, setCantidadMl] = useState(0);
  const [genero, setGenero] = useState('');
  const [id, setId] = useState(0);

  const [perfumesList, setPerfumesList] = useState([]);
  const [editar, setEditar] = useState(false);

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: <strong>REGISTRO EXITOSO</strong>,
      html: <i>El perfume {nombre} fue registrado con exito </i>,
      icon: 'success',
      timer: 1000
    })
  }

  const updateSwal = () => {
    withReactContent(Swal).fire({
      title: <strong>ACTUALIZACION EXITOSA</strong>,
      html: <i>El perfume fue actualizado con exito </i>,
      icon: 'success',
    })
  }

  const deleteSwal = (perfume) => {

  }



  const registrarPerfume = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      marca: marca,
      cantidadMl: cantidadMl,
      genero: genero
    }).then(() => {
      getPerfumes();
      limpiarCampos();
      showSwal();
    }).catch(function(error){
      withReactContent(Swal).fire({
        icon: 'error',
        title: 'Error',
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Error del servidor" : JSON.parse(JSON.stringify(error)).message
      })
    })
  }

  const updatePerfume = () => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      marca: marca,
      cantidadMl: cantidadMl,
      genero: genero
    }).then(() => {
      getPerfumes();
      limpiarCampos();
      updateSwal();
    }).catch(function(error){
      withReactContent(Swal).fire({
        icon: 'error',
        title: 'Error',
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Error del servidor" : JSON.parse(JSON.stringify(error)).message
      })
    })
  }

  const deletePerfume = (perfume) => {
    withReactContent(Swal).fire({
      title: "ELIMINAR?",
      html: <i>Esta seguro de eliminar el perfume {perfume.nombre}? </i>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${perfume.id}`).then(() => {
          getPerfumes();
          limpiarCampos();
          withReactContent(Swal).fire({
            title: "Eliminado!",
            html: <i>{perfume.nombre} fue eliminado</i>,
            icon: "success"
          });
        }).catch(function(error){
          withReactContent(Swal).fire({
            icon: 'error',
            title: 'Error',
            text: 'No se logro eliminar el perfume',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Error del servidor" : JSON.parse(JSON.stringify(error)).message
          })
        })
        
      }
    });


  }

  const limpiarCampos = () => {
    setNombre("");
    setMarca("");
    setGenero("")
    setCantidadMl("");
    setEditar(false)
  }


  const editarPerfume = (perfume) => {
    setEditar(true);

    setNombre(perfume.nombre)
    setMarca(perfume.marca)
    setCantidadMl(perfume.cantidadMl)
    setGenero(perfume.genero)
    setId(perfume.id)
  }

  const getPerfumes = () => {
    Axios.get('http://localhost:3001/perfu', {
    }).then((perfumes) => {
      setPerfumesList(perfumes.data);
    })
  }
  getPerfumes();

  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          PERFUMES
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id='basic-addon1' >Nombre:</span>
            <input type="text"
              onChange={(e) => {
                setNombre(e.target.value)
              }}
              className="form-control" placeholder='Nombre' aria-label='username' aria-describedby='basic-addon1' value={nombre} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id='basic-addon1' >Marca:</span>
            <input type="text"
              onChange={(e) => {
                setMarca(e.target.value)
              }}
              className="form-control" placeholder='Marca' aria-label='username' aria-describedby='basic-addon1' value={marca} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id='basic-addon1' >Cantidad ML:</span>
            <input type="text"
              onChange={(e) => {
                setCantidadMl(e.target.value)
              }}
              className="form-control" placeholder='Cantidad ML' aria-label='username' aria-describedby='basic-addon1' value={cantidadMl} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id='basic-addon1' >Genero:</span>
            <input type="text"
              onChange={(e) => {
                setGenero(e.target.value)
              }}
              className="form-control" placeholder='Genero' aria-label='username' aria-describedby='basic-addon1' value={genero} />
          </div>


        </div>
        <div className="card-footer text-muted">
          {
            editar ?
              <div>
                <button className='btn btn-warning m-2' onClick={updatePerfume}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div> :
              <button className='btn btn-success' onClick={registrarPerfume}>Registrar</button>
          }

        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Marca</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cantidad ML</th>
            <th scope="col">Genero</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perfumesList.map((perfume, index) => {
            return <tr key={perfume.id}>
              <th>{perfume.id}</th>
              <td>{perfume.marca}</td>
              <td>{perfume.nombre}</td>
              <td>{perfume.cantidadMl}</td>
              <td>{perfume.genero}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-info"
                    onClick={() => {
                      editarPerfume(perfume)
                    }}
                  >Editar</button>
                  <button type="button" className="btn btn-danger" onClick={() => {
                    deletePerfume(perfume)
                  }}>Eliminar</button>

                </div>
              </td>
            </tr>


          })}


        </tbody>
      </table>


    </div>
  )
}

export default App
