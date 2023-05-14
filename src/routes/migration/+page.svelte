<script>
  import * as d3 from 'd3';
  import { index } from 'd3';
  import { onMount } from 'svelte';
  import 'animate.css';
  import NavBar from '../../components/+NavBar.svelte';
  import BubbleGraph from './bubbles.svelte';
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
    <div class="info-container">
      <div id="migration-graph-container" class="chart">
        <h3>Rural Population (as % of Total Population)</h3>
        <BubbleGraph data={data}/>
      </div>
      <div>
        hehe look at me I am a text
      </div>
    </div>
  </PageSkeleton>
</main>

<style>
  .chart {
    /* margin: 10px; */
    width: 40%;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

</style>