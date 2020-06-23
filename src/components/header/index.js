import { h } from "preact";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "white",
    "& button": {
      borderRadius: 20,
    },
    "& header": {
      boxShadow: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = () => {
  const classes = useStyles();

  return (
    <div class={classes.root}>
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={1}>
              <Typography variant="h5" class={classes.title}>
                <Box letterSpacing={6}>THTR</Box>
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Grid direction="row" alignItems="center" container>
                <Box m={1} component="span">
                  <Button variant="contained">{"OK"}</Button>
                </Box>
                <Typography variant="overline">Select / Play</Typography>
                <Box m={1} component="span">
                  <Button variant="contained">
                    <KeyboardReturnIcon />
                  </Button>
                </Box>
                <Typography variant="overline">Back</Typography>
                <Box m={1} component="span">
                  <Button variant="contained">
                    <ControlCameraIcon />
                  </Button>
                </Box>
                <Typography variant="overline">Navigate</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
