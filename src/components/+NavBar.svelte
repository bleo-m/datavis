<script>
  import './fonts.css'
  import './navigation.css'
  export let title;
  export let slideNumber;
</script>

<main class="navBar">
  <div class="navigation-container">
    {#each {length: 4} as _, i}
      {#if i == slideNumber}
        <div class="box pink"></div>
      {:else}
        <div class="box gray"></div>
      {/if}
    {/each}
  </div>

  {#if title != undefined}
    <h1 class="right title">{title}</h1>
  {/if}
</main>

<style>
  .navBar {
    padding: 1vw 2vw;
    display: block;
    align-items: center;
    position: relative;
  }
  .right {
    display: inline-block;
    margin-top: 1vw;
  }

  .title{
    font-family: Druk;
  }
</style>
