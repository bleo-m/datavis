<script>
  import 'animate.css';
  import PageSkeleton from '../components/PageSkeleton.svelte';
  export let data;
  const src = "/images/food.png";

</script>

<main>
  <PageSkeleton 
    navigationPage1="climate" navigationDirection1="right" 
    title="CLIMATE CHANGE AND FOOD INSECURITY" slideNumber=0>
    <div class="home-container">
      <section>
        <p class="bold">The impact of climate change and food insecurity in the Northern Triangle is a humanitarian crisis that requires urgent action. The root causes of this crisis are complex and interrelated, and addressing them will require a multi-faceted approach that involves all stakeholders.</p>
        <p>The resulting food insecurity is both a result of and a driving factor for migration. The number of people experiencing moderate or severe food insecurity has almost quadrupled from 2019, from 4.8 million to 17.3 million by 2020. According to a 2021 survey, among people experiencing severe hunger, 37% said they had plans to migrate, with 23% having made concrete preparations to do so. By comparison, only 18% of people experiencing little to no hunger said they intended to migrate, with just 7% having prepared for the journey. This is a humanitarian crisis that has forced many people in the Northern Triangle, especially those in rural areas without employment, formal education, or a social safety net, to migrate externally in search of work.</p>
      </section>  
      <img src={src} alt="central american food in black and white"/>
    </div>  
  </PageSkeleton>
</main>

<style>

.home-container{
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
}
:global(html, body) 
{ /* this will apply to <body> */ 
  margin: 0; 
  padding: 0; 
  height: 100%;
  overflow: hidden;
  color: var(--black);
  background-color: var(--white);
}

img{
  filter: grayscale(100%);
  transition: filter, 250ms;
}

img:hover{
  filter: grayscale(10%);
  transition: filter, 250ms;
}

p{
  width: 75%;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  line-height: 1.5em;
}
.bold{
  font-weight: bold;
}
</style>

