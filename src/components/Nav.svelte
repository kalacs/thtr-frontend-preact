<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Button from "@smui/button";
  import Grid from "./mui/Grid.svelte";
  import Toolbar from "./mui/Toolbar.svelte";
  import Typography from "./mui/Typography.svelte";
  import Box from "./mui/Box.svelte";
  import ButtonLabelGrid from "./mui/ButtonLabelGrid.svelte";
  import GreenButton from "./buttons/GreenButton.svelte";
  import RedButton from "./buttons/RedButton.svelte";
  import IconButton, { Icon } from "@smui/icon-button";

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
</style>

<div class="navigation">
  <TopAppBar variant="fixed" dense>
    <Toolbar>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={1}>
          <Typography variant="h5" class="title">
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
            class="control-buttons">
            <Grid item>
              <Grid direction="column" alignItems="center" container>
                <Grid item>
                  <Button variant="contained" size="small">{'OK'}</Button>
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
                    <IconButton>keyboard_return</IconButton>
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
                    <IconButton>control_camera</IconButton>
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
                    <IconButton>fiber_manual</IconButton>
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
                    <IconButton>fiber_manual_record</IconButton>
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
  </TopAppBar>
</div>
