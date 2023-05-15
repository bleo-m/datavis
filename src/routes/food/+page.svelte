<script>
  import NavBar from '../../components/+NavBar.svelte';
  import PageSkeleton from '../../components/PageSkeleton.svelte';
  import RingGraph from './rings.svelte';
  import RingGraph2 from './rings2.svelte';
  import CirclePercentageBar from '../../components/CirclePercentageBar.svelte';
  export let data;
  const mainTableResponses = data.csv;
  // make array of responses to income_exp_food and exclude the submissions that are "N/A"
  const incomeExpFood = mainTableResponses.map(response => parseInt(response.income_exp_food)).filter( answer => answer != 99);
  const lcsiBorrow = mainTableResponses.map(response => parseInt(response.lcsi_borrow)).filter( answer => answer != 88);
</script>

<main>
  <PageSkeleton
  title="FOOD INSECURITY"
  navigationPage1="climate"
  navigationPage2="migration"
  navigationDirection1="up"
  navigationDirection2="left"
  slideNumber={3}>
    <div class="vis">
      <p>
        <b>Food insecurity has been greatly exacerbated by climate change. It is substantially the result of lowered profits from agricultural production, and has drastically risen recently for the Northern Triangle. The number of people experiencing moderate or severe food insecurity has almost quadrupled from 2019, from 4.8 million to 17.3 million by 2020.</b>
      </p>

      <div class="graph-data">
        <RingGraph incomeExpFood={incomeExpFood}/>
        <b> A large amount of families would not say that their household income is enough to cover the expenses of purchasing food.</b>
      </div>  
      
      <div class="graph-data">
        <b>Families in the Northern Triangle have to borrow money to buy food. This option is unfortunately not always available.</b>
        <RingGraph2 lcsiBorrow={lcsiBorrow}/>
      </div>  
      <p>
        In data taken directly from survey responders in this region of Central America, people have to borrow money on a regular basis just to afford food. For the three countries – El Salvador, Guatemala, and Honduras – almost 7 million people experience acute hunger (Integrated Food Security Phase Classification (IPC) Phase 3+) as of 2022. As the country that has the most forest area and relies on agricultural profits the most, Honduras holds the highest percentage with 27% of its population experiencing acute hunger.
      </p>

      <!-- <p>
        To take an even deeper look at food insecurity, the impacts of malnutrition on health can be further explored. The Global Nutrition Report holds the factors seen in [DATA] as their global nutrition targets, and Honduras in particular is considered “Off course” or “No progress or worsening” in 10 out of the 11 factors for which there is data.
      </p> -->

      <CirclePercentageBar 
        let:hoveringP1={hoveringP1} 
        let:hoveringP2={hoveringP2} 
        let:hoveringP3={hoveringP3} 
        let:hoveringP4={hoveringP4}
      >
      <p>Migration is also heavily linked to food insecurity, as both a result of and driving factor for it. According to a 2021 survey, among people experiencing severe hunger, <span class:activeBlue={hoveringP1}>37%</span> said they had plans to migrate, with <span class:activeBlue={hoveringP3}>23%</span> having made concrete preparations to do so. By comparison, only <span class:activeRed={hoveringP2}>18%</span> of people experiencing little to no hunger said they intended to migrate, with just <span class:activeRed={hoveringP4}>7%</span> having prepared for the journey.</p>
      </CirclePercentageBar>

      <p>
      As WFP Executive David Beasley says, “When you can’t feed your children, desperation will force you on the road in search of food and safety.” To learn more about Migration, <b>navigate left</b>.
      </p>
    </div>
  </PageSkeleton>
</main>

<style>
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

  .graph-data{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 64px;
  }

  .graph-data b {
    font-size: 48px;
  }

  span {
  transition: all 500ms ease-in;
  transform: 30px;
  will-change: transform;
  }

  .activeBlue {
    color: var(--blue);
    font-weight: bold;
    font-size: 36px;
  }
  .activeRed {
    color: var(--red);
    font-weight: bold;
    font-size: 36px;
  }
</style>