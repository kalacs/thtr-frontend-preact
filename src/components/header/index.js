import { h } from "preact";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  withStyles,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

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

const RedButton = withStyles({
  text: {
    color: "red",
  },
  contained: {
    color: "red",
    backgroundColor: "red",
  },
})(Button);
const GreenButton = withStyles({
  text: {
    color: "green",
  },
  contained: {
    color: "green",
    backgroundColor: "green",
  },
})(Button);
const ButtonLabelGrid = withStyles({
  root: {
    position: "absolute",
    top: "50px",
  },
})(Grid);

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
              <Grid
                direction="row"
                alignItems="center"
                container
                justify="flex-start"
                spacing={3}
                class="control-buttons"
              >
                <Grid item>
                  <Grid direction="column" alignItems="center" container>
                    <Grid item>
                      <Button variant="contained" size="small">
                        {"OK"}
                      </Button>
                    </Grid>
                    <ButtonLabelGrid item>
                      <Typography variant="overline">Select / Play</Typography>
                    </ButtonLabelGrid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid direction="column" alignItems="center" container>
                    <Grid item>
                      <Button variant="contained" size="small">
                        <KeyboardReturnIcon />
                      </Button>
                    </Grid>
                    <ButtonLabelGrid item>
                      <Typography variant="overline">Back</Typography>
                    </ButtonLabelGrid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid direction="column" alignItems="center" container>
                    <Grid item>
                      <Button variant="contained" size="small">
                        <ControlCameraIcon />
                      </Button>
                    </Grid>
                    <ButtonLabelGrid item>
                      <Typography variant="overline">Navigate</Typography>
                    </ButtonLabelGrid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid direction="column" alignItems="center" container>
                    <Grid item>
                      <RedButton variant="contained" size="small">
                        <FiberManualRecordIcon />
                      </RedButton>
                    </Grid>
                    <ButtonLabelGrid item>
                      <Typography variant="overline">Refresh</Typography>
                    </ButtonLabelGrid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid direction="column" alignItems="center" container>
                    <Grid item>
                      <GreenButton variant="contained" size="small">
                        <FiberManualRecordIcon />
                      </GreenButton>
                    </Grid>
                    <ButtonLabelGrid item>
                      <Typography variant="overline">Change</Typography>
                    </ButtonLabelGrid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
