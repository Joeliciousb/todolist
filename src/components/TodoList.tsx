import { ChangeEvent, useState } from "react";
import { todoType } from "../types/types";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const TodoList = () => {
  const [todoObject, setTodoObject] = useState<todoType>({
    description: "",
    priority: "high" || "medium" || "low",
    date: "",
  });
  const [listOfTodos, setListOfTodos] = useState<Array<todoType>>([]);

  const [columnDefs] = useState<ColDef[]>([
    { field: "description" },
    { field: "priority" },
    { field: "date" },
  ]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoObject({ ...todoObject, [event.target.name]: event.target.value });
  }
  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>) {
    setTodoObject({ ...todoObject, [event.target.name]: event.target.value });
  }

  function handleAddTodo() {
    setListOfTodos([...listOfTodos, todoObject]);
    setTodoObject({ description: "", priority: "", date: "" });
  }

  return (
    <>
      <div className="todolist-header">Simple Todolist</div>
      <fieldset>
        <legend>Add todo:</legend>
        <div className="input-container">
          <p>* Description: </p>
          <input
            id="desc"
            type="text"
            name="description"
            placeholder="description"
            onChange={handleInputChange}
            value={todoObject.description}
          />
          <p>* Date: </p>
          <input
            id="date"
            type="text"
            name="date"
            placeholder="date"
            onChange={handleInputChange}
            value={todoObject.date}
          />
          <p>* Priority</p>
          <select name="priority" id="priority" onChange={handlePriorityChange}>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <button
            disabled={todoObject.date === "" || todoObject.description === ""}
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
      </fieldset>
      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact rowData={listOfTodos} columnDefs={columnDefs} />
      </div>
    </>
  );
};

export default TodoList;
