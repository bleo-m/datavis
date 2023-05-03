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
      <h3>Rainfall Anomalies</h3>
      <LineGraph bind:data={data}/>
    </div>
  </div>
  </PageSkeleton>
</main>

<style>
  .chart {
    margin: 0;
  }

  .vis {
    display: flex;
    flex-direction: row;
  }

  :global(html, body) 
{ /* this will apply to <body> */ 
  margin: 0; 
  padding: 0; 
  height: 100%;
  overflow: hidden;
}
</style>