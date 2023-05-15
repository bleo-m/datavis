<script>
  import * as d3 from 'd3';
  import { scaleLinear } from "d3-scale";
  import { onMount } from 'svelte';
  export let data = [];

  const KEYS = {"Honduras":["var(--red)", 75], "Guatemala":["var(--blue)",80], "El Salvador":["var(--yellow)",84]};
  const LEGEND_SIZE = 20;
  let graphWidth = 1000;
  let graphHeight = 800;
  const paddings = {
    top: 20,
    left: 75,
    right: 75,
    bottom: 60
  };

  onMount(() => {
    let pageContent = document.getElementById('page-content');
    graphWidth = pageContent.getBoundingClientRect().width /2 - paddings.left - paddings.right;
    graphHeight = graphWidth *2/3;
  });

  let y1s = [];
  let y2s = [];
  let y3s = [];
  let y1Data = [];
  let y2Data = [];
  let y3Data = [];
  for (let i=1960; i<2022; i=i+1) {
    y1s.push((i, data.agData[0][i]));
    y2s.push((i, data.agData[1][i]));
    y3s.push((i, data.agData[2][i]));
    y1Data.push(data.agData[0][i]);
    y2Data.push(data.agData[1][i]);
    y3Data.push(data.agData[2][i]);
  }
  console.log(y3s);
  // console.log(data.agData[0])
  $: xScale = scaleLinear()
              .domain([1960, 2022])
              .range([paddings.left, graphWidth - paddings.right])

  $: yScale1 = scaleLinear()
              .domain([0, Math.max(...y1Data)])
              .range([(graphHeight - paddings.bottom) / 3, paddings.top])

  $: yScale2 = scaleLinear()
              .domain([0, Math.max(...y2Data)])
              .range([(graphHeight - paddings.bottom) * 2/3, (graphHeight - paddings.bottom) / 3])

  $: yScale3 = scaleLinear()
              .domain([0, Math.max(...y3Data)])
              .range([graphHeight - paddings.bottom, (graphHeight - paddings.bottom) * 2/3])

  // $: path1 = `M${y1s.map(d => `${xScale(d[0])},${yScale1(d[1])}`).join('L')}`;
  // $: area1 = `${path1}L${xScale(2021)},${yScale1(0)}L${xScale(1960)},${yScale1(0)}Z`;

  // // Hover Effects
  // const idContainer = "svg-container-" + Math.random() * 1000000;

  // // typically null is unreliable in javascript, try using underfined instead
  // let mousePosition = { x: null, y: null };
  // let pageMousePosition = { x: null, y: null };
  // let currentHoveredPoint = undefined;

  // function followMouse(event) {
  //   const svg = document.getElementById(idContainer);
  //   if (svg === null) return;
  //   const dim = svg.getBoundingClientRect();
  //   pageMousePosition = {
  //     x: event.pageX,
  //     y: event.pageY,
  //   };
  //   const positionInSVG = {
  //     x: event.clientX - dim.left,
  //     y: event.clientY - dim.top,
  //   };
  //   mousePosition =
  //     positionInSVG.x > paddings.left &&
  //     positionInSVG.x < graphWidth - paddings.right &&
  //     positionInSVG.y > paddings.top &&
  //     positionInSVG.y < graphHeight - paddings.bottom
  //       ? { x: positionInSVG.x, y: positionInSVG.y }
  //       : { x: null, y: null };
  // }

  // function removePointer() {
  //   mousePosition = { x: null, y: null };
  // }

  // function computeSelectedXValue(value) {
  //   try{
  //     currentHoveredPoint = data.rainData[data.rainData.filter((d) => xScale(d["index"]) >= value)[0]["index"] - 2];
  //     return data.rainData.filter((d) => xScale(d.index) >= value)[0].index - 1;
  //   }
  //   catch {
  //     currentHoveredPoint = data.rainData[data.rainData.length - 1];
  //     return data.rainData.length - 1;
  //   }
  // }

</script>

<div class="visualization">
  <svg
    width={graphWidth}
    height={graphHeight}
  >
    <g>
      <!-- <path class="area1" d={area1}></path> -->
      {#each y1Data as y, i}
        {#if i!= y1Data.length - 1}
          <line
            x1={xScale(1960+i)}
            x2={xScale(1960+i+1)}
            y1={yScale1(y)}
            y2={yScale1(y1Data[i+1])}
            stroke="var(--red)"
            stroke-width="2"
          />
          />
        {/if}
      {/each}
      {#each y2Data as y, i}
        {#if i!= y2Data.length - 1}
          <line
            x1={xScale(1960+i)}
            x2={xScale(1960+i+1)}
            y1={yScale2(y)}
            y2={yScale2(y2Data[i+1])}
            stroke="var(--blue)"
            stroke-width="2"
          />
          />
        {/if}
      {/each}
      {#each y3Data as y, i}
        {#if i!= y3Data.length - 1}
          <line
            x1={xScale(1960+i)}
            x2={xScale(1960+i+1)}
            y1={yScale3(y)}
            y2={yScale3(y3Data[i+1])}
            stroke="var(--yellow)"
            stroke-width="2"
          />
          />
        {/if}
      {/each}
    </g>
    </svg>
    <!-- {#if mousePosition.x !== null}
      <g transform="translate({xScale(computeSelectedXValue(mousePosition.x))} 0)">
        <line
          x1="0"
          x2="0"
          y1={paddings.top}
          y2={graphHeight - paddings.bottom - 2}
          stroke="var(--black)"
          stroke-width="1"
        />
        <circle
          cx={0}
          cy={yScale(data.rainData.find((d) => d["index"] === computeSelectedXValue(mousePosition.x)))}
          r="3"
          fill="var(--black)"
        />
      </g>
    {/if}
  </svg> -->
  <!-- Information when Hovering -->
  <!-- <div
    class={mousePosition.x === null ? "tooltip-hidden" : "tooltip-visible"}
    style="left: {pageMousePosition.x + 10}px; top: {pageMousePosition.y + 10}px"
  >
    {#if mousePosition.x !== null && currentHoveredPoint !== undefined}
      <b>Dekad {currentHoveredPoint["Dekad"]} of {MONTHS[parseInt(currentHoveredPoint["Month"])-1]} {currentHoveredPoint["Year"]}</b> <br>
      <div class="info-container">
        <div class="info-box1"></div>
        <div>&nbsp 1 Month Anomaly  <b>{parseInt(currentHoveredPoint["1 Month Anomaly (%)"])}%</b> </div>
      </div>
      <div class="info-container">
        <div class="info-box2"></div>
        <div>&nbsp 3 Months Anomaly  <b>{parseInt(currentHoveredPoint["3 Months Anomaly (%)"])}%</b> </div>
      </div>
    {/if}
  </div> -->
  <!-- Legend -->
  <div>
    <svg
      width={graphWidth}
      height={LEGEND_SIZE}
    >
      <g>
        {#each Object.keys(KEYS) as key, i}
          <rect 
            x={paddings.left + i*(LEGEND_SIZE+KEYS[key][1])}
            width={LEGEND_SIZE}
            height={LEGEND_SIZE}
            fill={KEYS[key][0]}
          />
          <text
            x={paddings.left + i*(LEGEND_SIZE+KEYS[key][1]) + 1.2*LEGEND_SIZE}
            y="15"
            fill={KEYS[key][0]}
          >
            {key}
          </text>
        {/each}
      </g>
    </svg>
  </div>
</div>

<style>
  .visualization {
    /* font: 25px sans-serif; */
    margin: auto;
    margin-top: 1px;
    text-align: middle;
  }

  .area1 {
    fill: var(--red);
  }

  .tooltip-hidden {
    visibility: hidden;
    /* font-family: "Nunito", sans-serif; */
    width: 225px;
    position: absolute;
  }

  .tooltip-visible {
    /* font: 25px sans-serif; */
    /* font-family: "Nunito", sans-serif; */
    visibility: visible;
    /* make blurry transparent background */
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    backdrop-filter: blur(5px);
    width: 225px;
    color: var(--black);
    position: absolute;
    padding: 10px;
    /* drop shadow */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.10);
  }

  .info-container {
    display:flex;
  }

  .info-box1 {
    width: 7.5%;
    background-color: var(--red);
    display: block;
    padding-top: 7.5%;
    margin-bottom: 1%;
  }

  .info-box2 {
    width: 7.5%;
    background-color: var(--blue);
    display: block;
    padding-top: 7.5%;
    margin-top: 1%;
  }

</style>