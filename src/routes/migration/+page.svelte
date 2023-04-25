<script>
    import * as d3 from 'd3';
  import { index } from 'd3';
  import { onMount } from 'svelte';
  import '../../utilities/fonts.css'
  import '../../utilities/navigation.css'
  import Bars from './bars.svelte';
  export let data;
  
</script>


<div class="container">
  <div class="box gray"></div>
  <div class="box gray"></div>
  <div class="box gray"></div>
  <div class="box pink"></div>
</div>
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