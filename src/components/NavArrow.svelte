<script>
  /**
   * General purpose navigation arrow to use throughout the site
   * @param {string} page - the page to navigate to
   *  @param {string} direction - the direction of the arrow
   */

  import {goto} from '$app/navigation';
  import { createEventDispatcher } from 'svelte';

  export let page;  // the page to navigate to
  export let direction;   // specifies the direction of the arrow
  const dispatch = createEventDispatcher(); 

  function handleClick() {
    // add a capital letter to the direction for animations to work
    const capitalizedDirection = direction.charAt(0).toUpperCase() + direction.slice(1);
    const data = {direction: capitalizedDirection}; 
    dispatch('navEvent', data);   // dispatch the event to the parent component

    // wait for the animation to finish before navigating
    setTimeout(() => {
      goto(page);
    }, 300);
  }

</script>

<div>
    <button on:click={handleClick}>
      <i class={`fas fa-chevron-${direction} fa-4x`}></i>
    </button>
</div>

<style>
  button{
    height: 100px;
    width: 100px;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    color: black;
    background: none;
    border: none;
    transition: color 0.5s ease;
  }
  button:hover{
    color: var(--red);
    cursor: pointer;
    transition: color 0.25s ease;
  }
</style>