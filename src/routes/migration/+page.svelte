<script>
    import * as d3 from 'd3';
  import { index } from 'd3';
  import { onMount } from 'svelte';
  import Bars from './bars.svelte';
  export let data;
  
</script>

<h1 class='title'> MIGRATION </h1>

<div class="vis">
  <div class="chart">
    <Bars data={data}/>
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

</div>
</div>
<style>
  @font-face {
  font-family: Druk;
  src: 
      url('./Druk-Wide-Bold.ttf') format('embedded-opentype'), /* Internet Explorer */
      url('./Druk-Wide-Bold.ttf') format('woff2'),             /* Super Modern Browsers */
      url('./Druk-Wide-Bold.ttf') format('woff'),              /* Pretty Modern Browsers */
      url('./Druk-Wide-Bold.ttf') format('truetype'),          /* Safari, Android, iOS */
      url('./Druk-Wide-Bold.ttf') format('svg');               /* Legacy iOS */
  }

  .chart {
    margin: 10px
  }

  .title{
  font-family: Druk;
  }

  .vis {
    display: flex;
    flex-direction: row;
  }

</style>