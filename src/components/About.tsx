import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const About = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">About</Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h6" sx={{ padding: 2 }}>
        About us is that we are cats🐱
      </Typography>
    </Box>
  );
};

export default About;
