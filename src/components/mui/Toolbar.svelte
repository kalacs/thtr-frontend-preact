<style lang="scss">
  @media (min-width: 600px) {
    .mui-toolbar-regular {
      min-height: 64px;
    }
    .mui-toolbar-gutters {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  @media (min-width: 0px) and (orientation: landscape) {
    .mui-toolbar-regular {
      min-height: 48px;
    }
  }

  .mui-toolbar-regular {
    min-height: 56px;
  }

  .mui-toolbar-gutters {
    padding-left: 16px;
    padding-right: 16px;
  }

  .mui-toolbar-root {
    display: flex;
    position: relative;
    align-items: center;
  }
</style>

<div class="mui-toolbar-root mui-toolbar-regular mui-toolbar-gutters">
  <slot />
</div>
