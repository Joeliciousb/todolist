import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Contact = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Contact</Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h6" sx={{ padding: 2 }}>
        Contact us!
      </Typography>
    </Box>
  );
};

export default Contact;
