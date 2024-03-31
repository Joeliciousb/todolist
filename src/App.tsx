import { Container, CssBaseline, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, minWidth: "748px" }}>
      <CssBaseline />
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
      <Link to={"/todolist"}>
        <Button>Todolist</Button>
      </Link>
      <Link to={"/contact"}>
        <Button>Contact</Button>
      </Link>
      <Link to={"/about"}>
        <Button>About</Button>
      </Link>
      <Outlet />
    </Container>
  );
}

export default App;
