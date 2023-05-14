<script>
  let hovering;
  let hoveringP1;
  let hoveringP2;
  let hoveringP3;
  let hoveringP4;

	const PERCENTAGE1 = 37;
  const PERCENTAGE2 = 18;
  const PERCENTAGE3 = 23;
  const PERCENTAGE4 = 7;
	const ANGLE1 = 360 * PERCENTAGE1 * 0.01;
  const ANGLE2 = 360 * PERCENTAGE2 * 0.01;
  const ANGLE3 = 360 * PERCENTAGE3 * 0.01;
  const ANGLE4 = 360 * PERCENTAGE4 * 0.01;
	
	const	BACKGROUND1 = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${ANGLE1}deg, gainsboro ${ANGLE1}deg 360deg),
    conic-gradient(var(--blue) 0deg, var(--blue));`;
  const	BACKGROUND2 = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${ANGLE2}deg, gainsboro ${ANGLE2}deg 360deg),
    conic-gradient(var(--red) 0deg, var(--red));`;
  const	BACKGROUND3 = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${ANGLE3}deg, gainsboro ${ANGLE3}deg 360deg),
    conic-gradient(var(--blue) 0deg, var(--blue));`;
  const	BACKGROUND4 = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${ANGLE4}deg, gainsboro ${ANGLE4}deg 360deg),
    conic-gradient(var(--red) 0deg, var(--red));`;

  function mouseEnter() {
    hovering = true;
  }

  function mouseLeave() {
    hovering = false;
  }

  function mouseEnterP1() {
    hoveringP1 = true;
  }

  function mouseLeaveP1() {
    hoveringP1 = false;
  }

  function mouseEnterP2() {
    hoveringP2 = true;
  }

  function mouseLeaveP2() {
    hoveringP2 = false;
  }

  function mouseEnterP3() {
    hoveringP3 = true;
  }

  function mouseLeaveP3() {
    hoveringP3 = false;
  }

  function mouseEnterP4() {
    hoveringP4 = true;
  }

  function mouseLeaveP4() {
    hoveringP4 = false;
  }
	
	$: cssVarStyle1 = `--background1:${BACKGROUND1}`;
  $: cssVarStyle2 = `--background2:${BACKGROUND2}`;
  $: cssVarStyle3 = `--background1:${BACKGROUND3}`;
  $: cssVarStyle4 = `--background2:${BACKGROUND4}`;
  
</script>

<div 
  class="chart-container" 
  on:mouseenter={mouseEnter}
  on:mouseleave={mouseLeave}
>
  <div class="circle-container">
    <h3 class="left-side"> </h3>
    <h3 class="middle">Severe Hunger</h3>
    <h3 class="right">Little to No Hunger </h3>
  </div>
  <div class="circle-container">
    <h3 class="left-side">Intends to Migrate</h3>
    <div class="middle">
      <div 
        class="progress-circle1" 
        style="{cssVarStyle1}"
        on:mouseenter={mouseEnterP1}
        on:mouseleave={mouseLeaveP1}
      >
        {PERCENTAGE1}%
      </div>
    </div>
    <div class="right">
      <div class="progress-circle2 right" style="{cssVarStyle2}">{PERCENTAGE2}%</div> </div>
  </div>
  <div class="circle-container">
    <h3 class="left-side">Made Preparations</h3>
    <div class="middle">
      <div class="progress-circle3" style="{cssVarStyle3}">{PERCENTAGE3}%</div>
    </div>
    <div class="right">
      <div class="progress-circle4 right" style="{cssVarStyle4}">{PERCENTAGE4}%</div> </div>
  </div>
  <slot hovering={hovering} hoveringP1={hoveringP1}></slot>
</div>


<style>
  .chart-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
  .left-side{
    width: 30%;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .middle {
    width: 35%;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .right {
    width: 35%;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .circle-container{
    display: flex;
    flex-direction: row;
    width: 75%;
    align-items: center;
  }
  .progress-circle1 {
    background: var(--background1);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    transition: all 500ms ease-in;
    will-change: transform;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  .progress-circle2 {
    background: var(--background2);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    transition: all 500ms ease-in;
    will-change: transform;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  .progress-circle3 {
    background: var(--background1);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    transition: all 500ms ease-in;
    will-change: transform;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  .progress-circle4 {
    background: var(--background2);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    transition: all 500ms ease-in;
    will-change: transform;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  </style>