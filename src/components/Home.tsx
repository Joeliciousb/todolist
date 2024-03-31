import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Homepage</Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h6" sx={{ padding: 2 }}>
        Hello world!
      </Typography>
    </Box>
  );
};

export default Home;
