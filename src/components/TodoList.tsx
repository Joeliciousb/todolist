import { ChangeEvent, useState } from "react";
import TodoTable from "./TodoTable";
import { todoType } from "../types/types";

const TodoList = () => {
  const [todoObject, setTodoObject] = useState<todoType>({
    date: "",
    description: "",
  });
  const [listOfTodos, setListOfTodos] = useState<Array<todoType>>([]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoObject({ ...todoObject, [event.target.name]: event.target.value });
  }

  function addTodo() {
    setListOfTodos([...listOfTodos, todoObject]);
    setTodoObject({ date: "", description: "" });
  }

  function deleteTodo(index: number) {
    setListOfTodos(listOfTodos.filter((_todo, i) => i !== index));
  }

  return (
    <>
      <div className="todolist-header">Simple Todolist</div>
      <fieldset>
        <legend>Add todo:</legend>
        <div className="input-container">
          <p>*Date: </p>
          <input
            id="date"
            type="text"
            name="date"
            placeholder="date"
            onChange={handleInputChange}
            value={todoObject.date}
          />
          <p>*Description: </p>
          <input
            id="desc"
            type="text"
            name="description"
            placeholder="description"
            onChange={handleInputChange}
            value={todoObject.description}
          />
          <button
            disabled={todoObject.date === "" || todoObject.description === ""}
            onClick={addTodo}
          >
            Add
          </button>
        </div>
      </fieldset>
      <TodoTable todos={listOfTodos} deleteTodo={deleteTodo} />
    </>
  );
};

export default TodoList;
