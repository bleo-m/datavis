<script>
    import * as d3 from 'd3';
  import { index } from 'd3';
  import { onMount } from 'svelte';
  import Bars from './bars.svelte';
  export let data;
  
</script>

<h1 class='title'> MIGRATION </h1>

<div class="chart">
  <Bars data={data}/>
</div>
<style>
  @font-face {
  font-family: "Druk";
  src: url('Druk-Wide-Bold.ttf'),
  }

  .chart {
    margin: 10px
  }

  .title{
  font-family: Druk;
  }

</style>