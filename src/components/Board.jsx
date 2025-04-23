import ColumnList from "./ColumnList";

function Board({ columns, addTask, editTask, deleteTask, moveTask }) {
    return (
      <div>
        <ColumnList
          columns={columns}
          addTask={addTask}
          editTask={editTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      </div>
    );
  }

export default Board