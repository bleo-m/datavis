<script>
  import 'animate.css';
  import PageSkeleton from '../components/PageSkeleton.svelte';
  import CirclePercentageBar from '../components/CirclePercentageBar.svelte';
  export let data;
  const src = "/images/food.png";

</script>

<main>
  <PageSkeleton 
    navigationPage1="climate" navigationDirection1="right" 
    title="CLIMATE CHANGE AND FOOD INSECURITY" slideNumber=0>
    <div class="home-container">
      <section>
        <p class="bold">
          The Central American countries of El Salvador, Guatemala, and Honduras (otherwise known as the Northern Triangle) are greatly distressed by climate change, food insecurity, and migration
        </p>

        <p class="animate__animated animate__fadeIn animate__delay-1s">
          As climate change has worsened food insecurity over time, many people in the Northern Triangle, particularly those in rural areas without employment, formal education, or a social safety net, have been forced to migrate externally in search of work.
        </p>


        <!-- TODO: this sounds like it would better fit in the report, not on the story we are trying to show someone given that text space is a limited resource-->
        <p class="animate__animated animate__fadeIn animate__delay-2s">
          There are countless pamphlets and protracted papers with long walls of text on this topic, but there is a lack of easily followable and understandable presentations of this data. A cohesive compilation of all of our research, with clear and interactive data visualizations to accompany the information, serves to better pinpoint the most significant issues that the Northern Triangle is experiencing.
        </p>

        <p class="animate__animated animate__fadeIn animate__delay-3s">
          In the following pages, the story we hope to outline is how climate change has created a humanitarian crisis in the Northern Triangle that <b>requires urgent action.</b>
        </p>
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
  font-size: 32px;
}
</style>

