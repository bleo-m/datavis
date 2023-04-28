<script>
  import 'animate.css';
  import PageSkeleton from '../components/PageSkeleton.svelte';

</script>

<main>
  <PageSkeleton 
    navigationPage1="climate" navigationDirection1="right" 
    title="CLIMATE CHANGE AND FOOD INSECURITY" slideNumber=0>
    <div>
      yoo
    </div>
  </PageSkeleton>
</main>

<style>
:global(body) 
{ /* this will apply to <body> */ 
  margin: 0; 
  padding: 0; 
  height: 100%;
  overflow: hidden;
}
</style>

