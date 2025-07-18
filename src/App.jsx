import { useState } from 'react'
import './App.css'
import StatusTareas from './assets/components/StatusTareas'

function App() {
  const categorias = ['Personal', 'Trabajo', 'Estudio', 'Urgente', 'Ocio']
  const [tareas, setTareas] = useState([


    {
      id: 1,
      nombre: 'Aprender React',
      estado: 'Por hacer', //indev - done
    },
    {
      id: 2,
      nombre: 'Aprender JavaScript',
      estado: 'En progreso',
    },
    {
      id: 3,
      nombre: 'Aprender CSS',
      estado: 'Terminada',
    },


  ])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categorias[0])
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')





  const registrarTarea = () => {
    if (nuevaTarea.trim() === '') {
      alert('Por favor, ingresa una tarea válida.')
      return
    }

    setTareas([
      ...tareas,
      {
        id: tareas.length + 1,
        nombre: nuevaTarea,
        estado: 'Por hacer',
        categoria: categoriaSeleccionada,
      },
    ])
    // Limpiar el campo de entrada después de registrar la tarea
    setNuevaTarea('')
  }

  // funcion para eliminar tareas
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
    alert('Tarea eliminada');
  }

  //funciones de Drag and Drop

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  }
  const handleDragOver = (e) => {
    e.preventDefault();
  }
  const handleDrop = (e, newStatus) => {
    const id = e.dataTransfer.getData('id');
    setTareas(tareas.map(tarea => tarea.id === Number(id) ? { ...tarea, estado: newStatus } : tarea));
  }
  // Filtrar tareas por categoría
  const tareasFiltradas = filtroCategoria === 'Todas'
    ? tareas
    : tareas.filter(tarea => tarea.categoria === filtroCategoria);

  return (
    <>
      <div className='nueva-tarea-contenedor'>
        <h2>Nueva Tarea</h2>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una nueva tarea"
          style={{ width: '50%', padding: '10px', borderRadius: '40px' }}
        />
        <select
          name='seleccion-categoria'
          className='seleccion-categoria'
          value={categoriaSeleccionada}
          onChange={e => setCategoriaSeleccionada(e.target.value)}

        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>


        <button
          onClick={() => registrarTarea()}
          className='btn2'
        >Registrar Tarea</button>
        <button
          onClick={() => {
            if (tareaSeleccionada !== null) {
              eliminarTarea(tareaSeleccionada);
              setTareaSeleccionada(null); // Limpiar la tarea seleccionada después de eliminarla
            } else {
              alert('Por favor, selecciona una tarea para eliminar.');
            }
          }}
          className='btn3'>Eliminar Tarea</button>
      </div>
      <div className='filtro-categoria' >
        <label >Filtrar por categoría:</label>
        <select
          value={filtroCategoria}
          onChange={e => setFiltroCategoria(e.target.value)}
          style={{ padding: '5px', borderRadius: '10px' }}
        >
          <option value="Todas">Todas</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <h2>Estado Tareas</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          width: '100%',
        }}
      >
        <StatusTareas
          tareas={tareasFiltradas}
          status="Por hacer"
          color="rgb(22 65 26 / 93%)"
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          seleccionarTarea={setTareaSeleccionada}
          tareaSeleccionada={tareaSeleccionada}



        />
        <StatusTareas
          tareas={tareasFiltradas}
          status="En progreso"
          color="rgb(93 33 45)"
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          seleccionarTarea={setTareaSeleccionada}
          tareaSeleccionada={tareaSeleccionada}
        />
        <StatusTareas
          tareas={tareasFiltradas}
          status="Terminada"
          color="rgb(79 52 202)"
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          seleccionarTarea={setTareaSeleccionada}
          tareaSeleccionada={tareaSeleccionada}
        />
      </div>
    </>
  )
}

export default App
