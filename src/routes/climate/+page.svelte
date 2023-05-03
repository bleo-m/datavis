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
    In recent years, climate change has greatly affected the countries in Central America's Northern Triangle - El Salvador, Guatemala, and Honduras, leading to food insecurity and 
    migration. They are uniquely susceptible to the increase in greenhouse gas emissions, seen in figure [ ], despite them contributing near-nothing (less than 1%)  to climate change in 
    comparison to the United States alone. This is due to the damages that changes in the climate have inflicted upon their agriculture, forestry, and fishing industries, upon which they 
    rely heavily. Just as emissions have increased appallingly since 1990, the percentage of forest area has steadily decreased for each Northern Triangle country. And despite efforts to 
    maintain the primary source of income for millions of people, as per the shaky increase in agricultural land, other factors have made it so that the profitability of rural industries 
    has steeply dropped (figure [ ]). <br><br>

    Among many others, anomalies in rainfall is one of these factors, as seen in figure [ ]. “According to the Intergovernmental Panel on Climate Change (IPCC), weather patterns are likely 
    becoming more extreme and unpredictable, with more frequent droughts and floods that cause dangerous landslides, reduce agricultural yields, and destroy infrastructure. After an 
    irregular rainy season in Guatemala, for instance, farmers lost almost 80 percent of corn grown in the highlands. In El Salvador, 50 percent of corn and bean farmers lost half of their 
    crop after Tropical Storms Amanda and Cristóbal in May and June 2020.”

    <div class="chart">
      <h3>Rainfall Anomalies</h3>
      <LineGraph bind:data={data}/>
    </div>

    This constitutes a humanitarian crisis. Beyond the damages to the land and profits, climate change has caused more diseases to emerge. Rural populations are hit especially hard, as 
    “rural communities often rely on subsistence agriculture and natural resources.” Changes and losses regarding agriculture can destroy their entire livelihood; as such, people in the 
    Northern Triangle, especially those in rural areas “without employment, formal education, or a social safety net”, are forced to migrate externally in search of work. To this point, 
    see the decline in rural populations by navigating to “Migration.” As this tends to be primarily men, families are also divided (see figure [ ]). <br><br>

    And “toward the end of the century, as temperatures in Central America rise between 2.1°C and 3.3°C, the Northern Triangle is expected to experience increased aridity and drought, 
    increased fire-prone weather conditions, and more extreme weather events. High temperatures result in increased evapotranspiration, reducing water availability, raising food prices, 
    and creating food insecurity.”

    To learn more about food insecurity, click down.

  </div>
  </PageSkeleton>
</main>

<style>
  .chart {
    margin: 0;
  }

  .vis {
    display: flex;
    flex-direction: column;
  }

  :global(html, body) 
{ /* this will apply to <body> */ 
  margin: 0; 
  padding: 0; 
  height: 100%;
  overflow: hidden;
}
</style>