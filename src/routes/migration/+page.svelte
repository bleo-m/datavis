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
  <div class="page-container">
    <div class="info-container">
      <div id="migration-graph-container" class="chart left">
        <h3>Rural Population (as % of Total Population)</h3>
        <BubbleGraph data={data}/>
      </div>
      <div class="right">
        <p>The external migration out of the Northern Triangle constitutes a humanitarian crisis. “On average, an estimated 407,000 people have left annually in recent years.” Beyond the damages to the land and profits, climate change has caused more diseases to emerge, and migration, especially in rural populations, has been greatly affected.<br><br>Rural populations are hit especially hard by climate change and its resulting food insecurity, as “rural communities often rely on subsistence agriculture and natural resources.” Changes and losses regarding agriculture can destroy their entire livelihood; as such, people in the Northern Triangle, especially those in rural areas “without employment, formal education, or a social safety net”, are forced to migrate externally in search of work.</p>
      </div>
    </div>
    <div>
      <p>Quantitative data says the same: migration has been consistently negative in the Northern Triangle. As this tends to be primarily men, families are also divided. This leads to familial and social instability, driving up tensions and reducing the quality of life even further.</p>
      <p>And, as the Council on Foreign Relations (CFR) reports: “Many households depend on remittances, or money sent home by relatives or friends living and working abroad…Remittances to Latin America amounted to nearly $135 billion in 2021, a 24 percent increase from the previous year…Remittances to the Northern Triangle made up nearly a quarter of that.” But remittances and even recent conflicted policy attempts to handle migration completely fail to mitigate the root causes of emigration. As testament, “critics say U.S. policies have been largely reactive, prompted by upturns in migration to the U.S.-Mexico border.”</p>
      <p>Altogether, migration has caused serious damages to the Northern Triangle, and if the country is to recover from the ensuing turmoil, deeper issues – like climate change and the accompanying food insecurity – must be tackled first.</p>
    </div>
  </div>
  </PageSkeleton>
</main>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .chart {
    /* margin: 10px; */
    width: 40%;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .left {
    width:45%;
  }

  .right {
    width: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  p {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 300;
    line-height: 1.5em;
  }


</style>