import Column from "./Column";

function ColumnList({ columns, addTask, editTask, deleteTask, moveTask }) {
    return (
      <div className="column-list">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          addTask={addTask}
          editTask={editTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ))}
    </div>
    );
  }

export default ColumnList