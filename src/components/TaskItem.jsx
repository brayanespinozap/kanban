import { useState } from "react";

function TaskItem({ task, columnId, editTask, deleteTask, onDragStart, onDrop }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
  
    const handleEdit = () => {
      if (isEditing && editedTitle.trim()) {
        editTask(columnId, task.id, editedTitle);
      }
      setIsEditing(!isEditing);
    };
  
    return (
      <div
        className="task-item"
        draggable
        onDragStart={(e) => onDragStart(e, task.id, columnId)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, columnId)}
      >
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <span>{task.title}</span>
        )}
        <button
          className={isEditing ? "save-button" : "edit-button"}
          onClick={handleEdit}
        >
          {isEditing ? "Guardar" : "Editar"}
        </button>
        <button className="delete-button" onClick={() => deleteTask(columnId, task.id)}>
          Eliminar
        </button>
      </div>
    );
  }

export default TaskItem