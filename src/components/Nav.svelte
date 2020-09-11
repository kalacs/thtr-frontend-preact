<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Grid from "./mui/Grid.svelte";
  import Toolbar from "./mui/Toolbar.svelte";
  import Typography from "./mui/Typography.svelte";
  import Box from "./mui/Box.svelte";
  import ButtonLabelGrid from "./mui/ButtonLabelGrid.svelte";
  import GreenButton from "./buttons/GreenButton.svelte";
  import RedButton from "./buttons/RedButton.svelte";
  import IconButton, { Icon } from "@smui/icon-button";
  import Button from "./buttons/Button.svelte";

  export let segment;
</script>

<style lang="scss">
  .navigation {
    color: white;
    flex-grow: 1;
  }
  .navigation :global(header) {
    background-color: var(--mdc-theme-primary, transparent);
    top: 0;
    left: auto;
    right: 0;
    position: fixed;
    width: 100%;
    display: flex;
    z-index: 1100;
    box-sizing: border-box;
    flex-shrink: 0;
    flex-direction: column;
  }
  .navigation :global(h5.title) {
    letter-spacing: 6px;
  }
  .navigation :global(.button-label) {
    top: 50px;
    position: absolute;
  }

  .navigation :global(button) {
    border-radius: 20px;
  }

  .navigation :global(.green-button) {
    background-color: green;
    color: green;
  }

  .navigation :global(.red-button) {
    background-color: red;
    color: red;
  }
</style>

<div class="navigation">
  <TopAppBar variant="fixed" dense>
    <Toolbar>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={1}>
          <Typography variant="h5" class="title">THTR</Typography>
        </Grid>
        <Grid item xs={11}>
          <Grid
            direction="row"
            alignItems="center"
            container
            justify="flex-start"
            spacing={3}>
            <Grid item>
              <Grid direction="column" alignItems="center" container>
                <Grid item>
                  <Button variant="contained" size="small">{'OK'}</Button>
                </Grid>
                <Grid item class="button-label">
                  <Typography variant="overline">Select / Play</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid direction="column" alignItems="center" container>
                <Grid item>
                  <Button variant="contained" size="small">
                    <Icon class="material-icons">keyboard_return</Icon>
                  </Button>
                </Grid>
                <Grid item class="button-label">
                  <Typography variant="overline">Back</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid direction="column" alignItems="center" container>
                <Grid item>
                  <Button variant="contained" size="small">
                    <Icon class="material-icons">control_camera</Icon>
                  </Button>
                </Grid>
                <Grid item class="button-label">
                  <Typography variant="overline">Navigate</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid direction="column" alignItems="center" container>
                <Grid item>
                  <Button variant="contained" size="small" class="red-button">
                    {'.'}
                  </Button>
                </Grid>
                <Grid item class="button-label">
                  <Typography variant="overline">Refresh</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid direction="column" alignItems="center" container>
                <Grid item>
                  <Button variant="contained" size="small" class="green-button">
                    {'.'}
                  </Button>
                </Grid>
                <Grid item class="button-label">
                  <Typography variant="overline">Change</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </TopAppBar>
</div>
