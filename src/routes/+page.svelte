<script>
  import 'animate.css';
  import { get } from 'svelte/store';
  import { animationDetails } from '../stores';
  import NavBar from '../components/+NavBar.svelte';
  import NavArrow from '../components/NavArrow.svelte';

  let direction = get(animationDetails).direction;  // get the direction from the store
  let animationDirection = "In" + direction;   // change to transitioning In on initializtion

  /**
   * Handles the navEvent from the NavArrow component
   * @param e - the event
   */
  const handleNavEvent = (e) => {
    direction = e.detail.direction;
    animationDetails.set({direction: direction});   // update the direction in the store
    animationDirection = "Out" + direction; 
  }

</script>

<main class={`animate__animated animate__fade${animationDirection}`} >
  <NavBar title='CLIMATE CHANGE AND FOOD INSECURITY' slideNumber=0/>
  <div>
    yoo
    <NavArrow page='/climate' direction="right" on:navEvent={handleNavEvent}/>
  </div>
</main>

<style>


</style>

