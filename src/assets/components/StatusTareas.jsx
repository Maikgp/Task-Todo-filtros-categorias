

export default function StatusTareas({ tareas, status, color, handleDrop, handleDragOver, handleDragStart, seleccionarTarea, tareaSeleccionada }) {



    return (
        <>
            <div
                onDrop={(e) => handleDrop(e, status)}
                onDragOver={handleDragOver}
                style={{
                    width: '90%',
                    border: '1px solid #ccc',
                    minHeight: '350px',
                    padding: '5px',
                    backgroundColor: '#588cb9ff',
                    color: 'black',
                    borderRadius: '5px',
                }}>

                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        padding: '10px',
                        margin: '15px',
                        borderRadius: '15px',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        backgroundColor: color
                    }}
                >{status}</p>
                {(tareas || []).filter(tarea => tarea.estado === status).map((tarea) => (
                    <div
                        key={tarea.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, tarea.id)}
                        onClick={() => seleccionarTarea(tarea.id)}
                        style={{
                            border: tareaSeleccionada === tarea.id ? '2px solid #4f8fb4ff' : '1px solid #ccc',
                            margin: '10px',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#d2e0e0ff',
                            cursor: 'pointer',

                        }}
                    >
                        <span style={{ fontWeight: 'bold' }}>{tarea.nombre}</span>
                        <p>Status: {tarea.estado}</p>
                        <p>Categoría: {tarea.categoria}</p>
                    </div>
                ))}
            </div>

        </>

    )
}
