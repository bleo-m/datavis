<script>
  import 'animate.css';
  import PageSkeleton from '../../components/PageSkeleton.svelte';
  import LineGraph from './lines.svelte';
  import Sparkline from './sparkline.svelte';
  export let data;
  const map_src = "/images/northern-triangle-map.png";
</script>

<main>
  <PageSkeleton 
  navigationPage1="food" navigationDirection1="down"
  navigationPage2="" navigationDirection2="left" 
  title='CLIMATE CHANGE' slideNumber=1>
    <div class="vis">
      <div class="subhead-container">
        <div class="subhead">
          <p>
            In recent years, climate change has greatly affected the countries in Central America's Northern Triangle - El Salvador, Guatemala, and Honduras, leading to food insecurity and migration.
          </p>
          <div class="subhead-small">
            <p>
              These countries are uniquely susceptible to the increase in greenhouse gas emissions, seen in figure X, <span class="red">despite them contributing near-nothing (less than 1%)</span> to climate change in 
              comparison to the United States alone. 
            </p>
          </div>
        </div>
        
        <div>
          <img src={map_src} alt="map of the northern triangle" height="500em"/>
        </div>
      </div>

      <div class="middle-section">
        <div class="left" id="page-content">
          <h3>Contribution of Agriculture, Forestry, and Fishing to GDP</h3>
          <Sparkline bind:data={data}/>
        </div>
        <p class="right">This is due to the damages that changes in the climate have inflicted upon their agriculture, forestry, and fishing industries, upon which they 
        rely heavily. Just as emissions have increased appallingly since 1990, the percentage of forest area has steadily decreased for each Northern Triangle country. And despite efforts to 
        maintain the primary source of income for millions of people, as per the shaky increase in agricultural land, other factors have made it so that the profitability of rural industries 
        has steeply dropped (figure [ ]).
        </p>
      </div>

      <div class="subhead-wide">
        <p>
        Among many others, anomalies in rainfall is one of the factors affecting the profitability of rural industries. 
        </p>  
      </div>
      <p>
      According to the Intergovernmental Panel on Climate Change (IPCC), weather patterns are likely becoming more extreme and unpredictable, with more frequent droughts and floods that cause dangerous landslides, reduce agricultural yields, and destroy infrastructure. After an 
      irregular rainy season in Guatemala, for instance, farmers lost almost 80 percent of corn grown in the highlands. In El Salvador, 50 percent of corn and bean farmers lost half of their 
      crop after Tropical Storms Amanda and Cristóbal in May and June 2020.
      </p>

      <div class="chart">
        <h3>Rainfall Anomalies</h3>
        <LineGraph bind:data={data}/>
      </div>

      <p>
      And “toward the end of the century, as temperatures in Central America rise between 2.1°C and 3.3°C, the Northern Triangle is expected to experience increased aridity and drought, 
      increased fire-prone weather conditions, and more extreme weather events. High temperatures result in increased evapotranspiration, reducing water availability, raising food prices, 
      and creating food insecurity.” 

      It causes the profitability and arability of the land to diminish, making it both harder to buy and grow food. To learn more about food insecurity, navigate down.
      </p>

    </div>
  </PageSkeleton>
</main>

<style>
  .chart {
    margin-top: 0px;
    margin-bottom: 16px;
  }

  .vis {
    display: flex;
    flex-direction: column;
  }

  .vis p {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 300;
    line-height: 1.5em;
  }

  .middle-section{
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  .left {
    width: 60%
  }
  .right {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .subhead-container{
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: space-between;
    margin-top: 20px;
  }

  .subhead{
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: space-between;
  }
  .subhead-wide{
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: space-between;
  }

  .subhead-wide p{
    font-size: 40px;
    font-weight: bold;
    margin: 0px;
  }

  .subhead p{
    font-size: 40px;
    font-weight: bold;
    margin: 0px;
  }

  .subhead-small p{
    font-size: 20px;
    font-weight: bold;
  }

  .red{
    color: var(--red);
    animation-name: color;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
  @keyframes color {
  0% {
    color: #222;
  }
  20% {
    color: var(--red);
  }
  80% {
    color: var(--red);
  }
  100% {
    color: #222;
  }
}

.orange {
  color: var(--yellow);
  text-decoration: bold;
}

</style>