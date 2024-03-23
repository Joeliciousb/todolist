import React from "react";
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import TodoList from "./components/TodoList";

function App() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <CssBaseline />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Home" value={0} />
        <Tab label="Todos" value={1} />
      </Tabs>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Todos</Typography>
        </Toolbar>
      </AppBar>
      {value === 0 && (
        <Box sx={{ minWidth: "700px", padding: 2 }}>
          <Typography>Hello World!</Typography>
        </Box>
      )}
      {value === 1 && <TodoList />}
    </Container>
  );
}

export default App;
