<script>
  import './fonts.css'
  import './navigation.css'
  export let title;
</script>

<main class="navBar">
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
