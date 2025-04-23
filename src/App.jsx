import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import Board from './components/Board';
import Toast from './components/Toast';

const mockApi = {
  save: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("kanbanData", JSON.stringify(data));
        resolve(data);
      }, 500);
    });
  },
  fetch: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem("kanbanData");
        resolve(
          data
            ? JSON.parse(data)
            : [
                {
                  id: 1,
                  title: "Por hacer",
                  tasks: [{ id: 1, title: "Tarea 1" }],
                },
                {
                  id: 2,
                  title: "En progreso",
                  tasks: [{ id: 2, title: "Tarea 2" }],
                },
                { id: 3, title: "Hecho", tasks: [] },
              ]
        );
      }, 500);
    });
  },
};

function App() {
  const [columns, setColumns] = useState([]); 
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    mockApi.fetch().then((data) => {
      setColumns(data || []); 
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading && columns.length > 0) {
      mockApi.save(columns);
    }
  }, [columns]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const addTask = (columnId, title) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: [...column.tasks, { id: Date.now(), title }],
            }
          : column
      )
    );
    setToastMessage(`Tarea "${title}" agregada`);
  };

  const editTask = (columnId, taskId, newTitle) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : column
      )
    );
    setToastMessage("Tarea actualizada");
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      )
    );
    setToastMessage("Tarea eliminada");
  };

  const moveTask = (sourceColumnId, targetColumnId, taskId) => {
    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    const targetColumn = columns.find((col) => col.id === targetColumnId);

    // Verificación para evitar errores si las columnas no existen
    if (!sourceColumn || !targetColumn) {
      console.error("Columna de origen o destino no encontrada");
      return;
    }

    const task = sourceColumn.tasks.find((t) => t.id === taskId);
    if (!task) {
      console.error("Tarea no encontrada");
      return;
    }

    setColumns(
      columns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((t) => t.id !== taskId),
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, task],
          };
        }
        return column;
      })
    );
    setToastMessage(`Tarea "${task.title}" movida`);
  };

  if (isLoading) return <div className="loading">Cargando...</div>;

  return (
    <div className="app-container">
      <Header />
      {columns.length > 0 ? (
        <Board
          columns={columns}
          addTask={addTask}
          editTask={editTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ) : (
        <p className="empty">No hay columnas disponibles</p>
      )}
      <Toast message={toastMessage} />
    </div>
  );
}

export default App
