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
    import {goto} from '$app/navigation';
    import { animationDetails, oppositeDirections } from '../stores';
    import NavBar from '../components/+NavBar.svelte';
    import NavArrow from '../components/NavArrow.svelte';

    let direction = get(animationDetails).direction;  // get the direction from the store
    let animationDirection = "In";   // change to transitioning In on initializtion

    /**
    * Animation library is kinda clapped with directions
    * so we gotta invert for up and down when initializing
    */
    if (direction === "Down" || direction === "Up"){
      animationDirection += oppositeDirections[direction];
    }
    else{
      animationDirection += direction;
    }

    /**
     * Handles the navEvent from the NavArrow component
     * @param e - the event
     */
    const handleNavEvent = (e) => {
      direction = e.detail.direction;
      animationDetails.set({direction: direction});   // update the direction in the store
      animationDirection = "Out" + oppositeDirections[direction];   // animate out in the opposite direction for parallax effect 
    }

    let pages = ["/", "/climate", "/migration", "/food"];
  </script>
  

  <main class={`page-container animate__animated animate__faster animate__fade${animationDirection}`} >
    <NavBar title={title}/>

    <div class="navigation-container">
      {#each {length: 4} as _, i}
        {#if i == slideNumber}
          <div class="box pink" onclick="location.href='{pages[i]}'"></div>
        {:else}
          <div class="box gray" onclick="location.href='{pages[i]}'"></div>
        {/if}
      {/each}
    </div>
    <div>

      <slot></slot>  
      <div class={`nav-arrow-${navigationDirection1}`}>
        <NavArrow page={`/${navigationPage1}`} direction={navigationDirection1} on:navEvent={handleNavEvent}/>
      </div>
      {#if navigationPage2 != undefined}
        <div class={`nav-arrow-${navigationDirection2}`}>
          <NavArrow page={`/${navigationPage2}`} direction={navigationDirection2} on:navEvent={handleNavEvent}/>
        </div>  
      {/if}

    </div>
  </main>
  

  <style>
    .page-container{
      position: relative;
      width: 100%;
      height: 100vh;
      padding: 80px 160px;
    }

    .nav-arrow-right{
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translate(0%, -50%);
    }

    .nav-arrow-left{
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translate(0%, -50%);
    }

    .nav-arrow-down{
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translate(-50%, 0%);
    }

    .nav-arrow-up{
      position: absolute;
      left: 50%;
      top: 0px;
      transform: translate(-50%, 0%);
    }

    .navigation-container {
    width: 5%;
    height: auto;
    display: block;
    position: absolute;
    top: 24px;
    left: 24px;
  }
  
  </style>
  
  