<script>
  import * as d3 from 'd3';
  import { index } from 'd3';
  import { onMount } from 'svelte';
  import 'animate.css';
  import { get } from 'svelte/store';
  import { animationDetails } from '../../stores';
  import NavBar from '../../components/+NavBar.svelte';
  import Bars from './bars.svelte';
  export let data;
  
</script>

<main>
  <NavBar slideNumber=3/>

  <div class="vis">
    <div class="chart">
      <Bars data={data}/>
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
    </div>
  </div>

</main>

<style>
  .chart {
    margin: 10px
  }

  .vis {
    display: flex;
    flex-direction: row;
  }

</style>