import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Column({ column, addTask, editTask, deleteTask, moveTask }) {
    return (
      <div className="column">
      <h3>{column.title}</h3>
      <TaskForm addTask={addTask} columnId={column.id} />
      <TaskList
        tasks={column.tasks}
        columnId={column.id}
        editTask={editTask}
        deleteTask={deleteTask}
        moveTask={moveTask}
      />
    </div>
    );
  }

export default Column