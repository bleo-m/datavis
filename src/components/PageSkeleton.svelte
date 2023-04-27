<script>
    /**
     * Wrapper component for all pages to keep navigation consistent.
     * Work in progress but build around this structure as needed - bleo
     * 
     * @args navigationPage1 - the page to navigate to
     * @args navigationPage2 - the page to navigate to
     * @args navigationDirection1 - the direction to navigate to
     * @args navigationDirection2 - the direction to navigate to
     * @args title - the title of the page
     * @args slideNumber - the slide number of the page
    */

    export let navigationPage1;
    export let navigationPage2;
    export let navigationDirection1 = undefined;
    export let navigationDirection2 = undefined;
    export let title;
    export let slideNumber;

    import 'animate.css';
    import { get } from 'svelte/store';
    import { animationDetails, oppositeDirections } from '../stores';
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
      animationDirection = "Out" + oppositeDirections[direction];   // animate out in the opposite direction for parallax effect 
    }
  
  </script>
  

  <main class={`animate__animated animate__fade${animationDirection}`} >
    <NavBar title={title} slideNumber={slideNumber}/>
    <div>

      <slot></slot>  
      <NavArrow page={`/${navigationPage1}`} direction={navigationDirection1} on:navEvent={handleNavEvent}/>

      {#if navigationPage2 != undefined}
        <NavArrow page={`/${navigationPage2}`} direction={navigationDirection2} on:navEvent={handleNavEvent}/>
      {/if}

    </div>
  </main>
  

  <style>
  
  </style>
  
  