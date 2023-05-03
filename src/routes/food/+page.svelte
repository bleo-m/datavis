<script>
  import NavBar from '../../components/+NavBar.svelte';
  import PageSkeleton from '../../components/PageSkeleton.svelte';
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
        Food insecurity is both a result of and a driving factor for migration, and is definitely exacerbated by climate change. It is substantially the result of lowered profits from 
        agricultural production, and has drastically risen recently for the Northern Triangle. The number of people experiencing moderate or severe food insecurity has almost quadrupled from 
        2019, from 4.8 million to 17.3 million by 2020.”
      </p>
      <p>
        In data taken directly from survey responders in this region of Central America, people have to borrow money on a regular basis just to afford food (see figure [ ]). For the three 
        countries – El Salvador, Guatemala, and Honduras – almost 7 million people experience acute hunger (Integrated Food Security Phase Classification (IPC) Phase 3+) as of 2022. As the 
        country that has the most forest area and relies on agricultural profits the most, Honduras holds the highest percentage with 27% of its population experiencing acute hunger.
      </p>
      <p>
        The World Food Programme (WFP) considers conflict, rainfall/vegetation deficits, and excess rainfall as the indicators for food insecurity in the breakdown of their key trends. The 
        latter two are directly correlated to climate change, but the first is not necessarily exempt, as threats to livelihoods and disasters can easily yield higher tensions.
      </p>
      <p>
        Migration is also heavily linked to food insecurity. According to a 2021 survey, “among people experiencing severe hunger, 37% said they had plans to migrate, with 23% having made 
        concrete preparations to do so. By comparison, only 18% of people experiencing little to no hunger said they intended to migrate, with just 7% having prepared for the journey.” And, 
        as WFP Executive David Beasley says, “When you can’t feed your children, desperation will force you on the road in search of food and safety.” Quantitative data says the same: as 
        shown in figure [ ], migration has been consistently negative in the Northern Triangle.
      </p>
      <p>
        To take an even deeper look at food insecurity, the impacts of malnutrition on health can be further explored. [DATA] or [DATA]. This is especially true for the rural population, which 
        can be seen in the “Migration” tab.
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
</style>