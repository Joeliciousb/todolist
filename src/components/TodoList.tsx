import { ChangeEvent, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import { v4 as uuidv4 } from "uuid";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { todoType } from "../types/types";

const TodoList = () => {
  const generateTodo = () => ({
    id: uuidv4(),
    description: "",
    date: "",
    priority: "High" || "Medium" || "Low",
  });

  const [todoObject, setTodoObject] = useState<todoType>(generateTodo());
  const [listOfTodos, setListOfTodos] = useState<todoType[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoObject({ ...todoObject, [event.target.name]: event.target.value });
  };

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTodoObject({ ...todoObject, [event.target.name]: event.target.value });
  };

  const handleAddTodo = () => {
    setListOfTodos([...listOfTodos, { ...todoObject, id: uuidv4() }]);
    setTodoObject(generateTodo());
  };

  const handleDeleteRow = (id: string) => {
    setListOfTodos(listOfTodos.filter((todo) => todo.id !== id));
  };

  const columnDefs: ColDef[] = [
    { field: "description", filter: true, floatingFilter: true },
    { field: "date", filter: true, floatingFilter: true },
    {
      field: "priority",
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
      comparator: (priority1: string, priority2: string) => {
        const priorityOrder: { [key: string]: number } = {
          High: 3,
          Medium: 2,
          Low: 1,
        };
        return priorityOrder[priority1] - priorityOrder[priority2];
      },
    },
    {
      field: "actions",
      cellRenderer: (params: CustomCellRendererProps) => (
        <button onClick={() => handleDeleteRow(params.data.id)}>Delete</button>
      ),
    },
  ];

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
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
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
        <AgGridReact
          rowData={listOfTodos}
          columnDefs={columnDefs}
          animateRows={true}
        />
      </div>
    </>
  );
};

export default TodoList;
