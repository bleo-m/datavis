<script>
  import 'animate.css';
  import { get } from 'svelte/store';
  import { animationDetails, oppositeDirections } from '../../stores';
  import NavArrow from '../../components/NavArrow.svelte';
  import NavBar from '../../components/+NavBar.svelte';

  let direction = get(animationDetails).direction;  // get the previous direction from the store
  let animationDirection = "In" + direction;  // change to transitioning In on initializtion

  /**
   * Handles the navEvent from the NavArrow component
   * @param e - the event
   */
   const handleNavEvent = (e) => {
    direction = e.detail.direction;
    animationDetails.set({direction: direction});   // update the direction in the store
    animationDirection = "Out" + oppositeDirections[direction]; // animate out in the opposite direction for parallax effect 
  }
</script>

<main class={`animate__animated animate__fade${animationDirection}`} >
  <NavBar title='CLIMATE CHANGE' slideNumber=1/>
  <NavArrow page='/migration' direction="down" on:navEvent={handleNavEvent}/>
</main>

<style>
  .title{
    font-family: Druk;
  }

</style>