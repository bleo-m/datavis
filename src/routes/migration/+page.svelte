<script>
  import * as d3 from 'd3';
  import { index } from 'd3';
  import { onMount } from 'svelte';
  import 'animate.css';
  import NavBar from '../../components/+NavBar.svelte';
  import Bars from './bars.svelte';
  import PageSkeleton from '../../components/PageSkeleton.svelte';

  export let data;
  
</script>

<main>
  <PageSkeleton
    title="MIGRATION"
    navigationPage1="food"
    navigationPage2=""
    navigationDirection1="right"
    navigationDirection2="up"
    slideNumber={2}
  >
    <div class="vis">
      <div class="chart">
        <Bars data={data}/>
      </div>
    </div>
  </PageSkeleton>
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