import { ChangeEvent, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import { v4 as uuidv4 } from "uuid";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { todoType } from "../types/types";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const TodoList = () => {
  const generateTodo = () => ({
    id: uuidv4(),
    description: "",
    date: "",
    priority: "High" || "Medium" || "Low",
  });

  const [todoObject, setTodoObject] = useState<todoType>(generateTodo());
  const [listOfTodos, setListOfTodos] = useState<todoType[]>([]);

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoObject({ ...todoObject, description: event.target.value });
  };

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    setTodoObject({ ...todoObject, priority: event.target.value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    const dateString = date?.format();
    const formattedDate = new Date(
      dateString ? dateString : ""
    ).toLocaleDateString("en-GB", { day: "numeric", month: "numeric" });
    setTodoObject({
      ...todoObject,
      date: date ? formattedDate : "",
    });
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
    {
      field: "date",
      filter: true,
      floatingFilter: true,
      comparator: (date1: string, date2: string) => {
        const [day1, month1] = date1.split("/").map(Number);
        const [day2, month2] = date2.split("/").map(Number);
        const dateObj1 = new Date(0, month1 - 1, day1);
        const dateObj2 = new Date(0, month2 - 1, day2);
        return dateObj1.getTime() - dateObj2.getTime();
      },
    },
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
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDeleteRow(params.data.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <TextField
          label="Description"
          value={todoObject.description}
          onChange={handleDescriptionChange}
          multiline={true}
          maxRows={4}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={handleDateChange} />
        </LocalizationProvider>
        <Select
          value={todoObject.priority}
          label="Priority"
          onChange={handlePriorityChange}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
        <Button
          color="primary"
          variant="contained"
          onClick={handleAddTodo}
          disabled={todoObject.description === "" || todoObject.date === ""}
        >
          Add
        </Button>
      </Stack>
      <Box className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact
          rowData={listOfTodos}
          columnDefs={columnDefs}
          animateRows={true}
        />
      </Box>
    </Box>
  );
};

export default TodoList;
