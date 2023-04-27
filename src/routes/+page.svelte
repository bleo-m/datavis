<script>
  import 'animate.css';
  import { get } from 'svelte/store';
  import { animationDetails, oppositeDirections } from '../stores';
  import NavBar from '../components/+NavBar.svelte';
  import NavArrow from '../components/NavArrow.svelte';
  import PageSkeleton from '../components/PageSkeleton.svelte';

  let direction = get(animationDetails).direction;  // get the direction from the store
  let animationDirection = "In" + direction;   // change to transitioning In on initializtion

  /**
   * Handles the navEvent from the NavArrow component
   * @param e - the event
   */
  const handleNavEvent = (e) => {
    direction = e.detail.direction;
    animationDetails.set({direction: direction});   // update the direction in the store
    animationDirection = "Out" + oppositeDirections[direction];   // animate out in the opposite direction for parallax effect 
  }

</script>

<PageSkeleton navigationPage1="climate" navigationDirection1="right" title="CLIMATE CHANGE AND FOOD INSECURITY" slideNumber=0>
  <div>
    yoo
  </div>
</PageSkeleton>

<style>


</style>

