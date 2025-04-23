import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, columnId, editTask, deleteTask, moveTask }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (e, taskId, sourceColumnId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  const handleDrop = (e, targetColumnId) => {
    const taskId = Number(e.dataTransfer.getData("taskId"));
    const sourceColumnId = Number(e.dataTransfer.getData("sourceColumnId"));
    if (sourceColumnId !== targetColumnId) {
      moveTask(sourceColumnId, targetColumnId, taskId);
    }
    setIsDraggingOver(false);
  };

  return (
    <div
      className={`task-list ${isDraggingOver ? "drag-over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={(e) => handleDrop(e, columnId)}
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          columnId={columnId}
          editTask={editTask}
          deleteTask={deleteTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
  }

export default TaskList