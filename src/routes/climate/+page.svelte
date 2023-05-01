<script>
  import 'animate.css';
  import PageSkeleton from '../../components/PageSkeleton.svelte';
  import LineGraph from './lines.svelte';
  export let data;
</script>

<main>
  <PageSkeleton 
  navigationPage1="food" navigationDirection1="down"
  navigationPage2="" navigationDirection2="left" 
  title='CLIMATE CHANGE' slideNumber=1>
  <div class="vis">
    <div class="chart">
      <LineGraph data={data}/>
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