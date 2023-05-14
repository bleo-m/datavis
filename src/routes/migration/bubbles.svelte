<script>
  import * as d3 from 'd3';
  import { scaleLinear } from "d3-scale";
  import { onMount } from 'svelte';
  import Slider from './slider.svelte';

  export let data = [];
  data = data["data"];

  let slider_year = 1960;

  // const KEYS = {"Normal":["#000000", 100], "1 Month Anomaly":["#FF5964",100], "3 Months Anomaly":["#6CA3CF",125]};
  // let countries = ["Honduras", "El Salvador", "Nicaragua"];
  let years = [];
  for (let i=1960; i<2022; i=i+1) { 
    years.push(i); 
  }
  // const LEGEND_SIZE = 20;
  let graphWidth = 500;
  let graphHeight = 500;

  const paddings = {
    top: 20,
    left: 20,
    right: 40,
    bottom: 40
  };

  onMount(() => {
    /**
     * Make graph height / width the size of the content element for the page
     */
    let pageContent = document.getElementById('migration-graph-container');
    graphWidth = pageContent.getBoundingClientRect().width - paddings.left - paddings.right;
    graphHeight = pageContent.getBoundingClientRect().height - paddings.top - paddings.bottom;
  });

  let parsed_data = new Object();
  for (let i=1960; i<2022; i=i+1) {
    let running_sum = 0;
    for (let j=0; j<data.length; j=j+1) {
      running_sum += parseInt(data[j][i]);
    }
    parsed_data[i] = running_sum / 3;
  }

  // // Scaling
  let numCircles = [...Array(10).keys()];
  $: xScale = scaleLinear()
              .domain([0, 9])
              .range([paddings.left, graphWidth - paddings.right])

  $: yScale = scaleLinear()
              .domain([0, 9])
              .range([paddings.top, graphHeight - paddings.bottom])

  // Hover Effects
  const idContainer = "svg-container-" + Math.random() * 1000000;
  let mousePosition = { x: null, y: null };
  let pageMousePosition = { x: null, y: null };
  let currentHoveredPoint = null;

  function followMouse(event) {
    const svg = document.getElementById(idContainer);
    if (svg === null) return;
    const dim = svg.getBoundingClientRect();
    pageMousePosition = {
      x: event.pageX,
      y: event.pageY,
    };
    const positionInSVG = {
      x: event.clientX - dim.left,
      y: event.clientY - dim.top,
    };
    mousePosition =
      positionInSVG.x > paddings.left &&
      positionInSVG.x < graphWidth - paddings.right &&
      positionInSVG.y > paddings.top &&
      positionInSVG.y < graphHeight - paddings.bottom
        ? { x: positionInSVG.x, y: positionInSVG.y }
        : { x: null, y: null };
  }

  function removePointer() {
    mousePosition = { x: null, y: null };
  }

  // function computeSelectedXValue(value) {
  //   currentHoveredPoint = data.csv[data.csv.filter((d) => xScale(d["index"]) >= value)[0]["index"] - 2];
  //   return data.csv.filter((d) => xScale(d.index) >= value)[0].index - 1;
  // }
  
</script>

<div class="visualization">
  <!-- <svg
    width={graphWidth}
    height={graphHeight}
    on:mousemove={followMouse}
    on:mouseleave={removePointer}
    id={idContainer}
  > -->
  <svg
    width={graphWidth}
    height={graphHeight}
    on:mousemove={followMouse}
    on:mouseleave={removePointer}
    id={idContainer}
  >
    <g>
      {#each numCircles as y, j}
        {#each numCircles as x, i}
          {#if 10*y + x <= parsed_data[slider_year]}
            <rect
              x={xScale(i)}
              y={yScale(j)}
              width="30"
              height="30"
              stroke="var(--blue)"
              fill="var(--blue)"
              rx="2"
            />
            {:else}
              <rect
                x={xScale(i)}
                y={yScale(j)}
                width="30"
                height="30"
                stroke="var(--gray)"
                fill="var(--gray)"
                rx="2"
              />
          {/if}
        {/each}
      {/each}
    </g>
  </svg>
  <div class="slider-theme">
    <h3>Year: {slider_year}</h3>
    <Slider on:change={(e) => slider_year = e.detail.value} id="basic-slider" />
  </div>
    

    <!-- {#if mousePosition.x !== null}
      <g transform="translate({xScale(computeSelectedXValue(mousePosition.x))} 0)">
        <line
          x1="0"
          x2="0"
          y1={paddings.top}
          y2={graphHeight - paddings.bottom - 2}
          stroke="#000000"
          stroke-width="1"
        />
        <circle
          cx={0}
          cy={yScale(data.csv.find((d) => d["index"] === computeSelectedXValue(mousePosition.x)))}
          r="3"
          fill="#000000"
        />
      </g>
    {/if}
  </svg>  -->
  <!-- Information when Hovering -->
  <div
    class={mousePosition.x === null ? "tooltip-hidden" : "tooltip-visible"}
    style="left: {pageMousePosition.x + 10}px; top: {pageMousePosition.y + 10}px"
  >
    {#if mousePosition.x !== null}
      {parsed_data[slider_year]}%
      <!-- <b>Dekad {currentHoveredPoint["Dekad"]} of {MONTHS[parseInt(currentHoveredPoint["Month"])-1]} {currentHoveredPoint["Year"]}</b> <br>
      <div class="info-container">
        <div class="info-box1"></div>
        <div>&nbsp 1 Month Anomaly  <b>{parseInt(currentHoveredPoint["1 Month Anomaly (%)"])}%</b> </div>
      </div>
      <div class="info-container">
        <div class="info-box2"></div>
        <div>&nbsp 3 Months Anomaly  <b>{parseInt(currentHoveredPoint["3 Months Anomaly (%)"])}%</b> </div>
      </div> -->
    {/if}
  </div>
  <!-- Legend -->
  <!-- <div>
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
  </div> -->
</div>

<style>
  .visualization {
    /* font: 25px sans-serif; */
    margin: auto;
    margin-top: 1px;
    text-align: middle;
  }

  .slider-theme {
		--track-focus: var(--red);
		--track-highlight-bgcolor: var(--red);
		--track-highlight-bg: linear-gradient(90deg, var(--red), var(--blue));
		--thumb-holding-outline: rgba(255, 89, 100, 0.3);
		--tooltip-bgcolor: var(--red);
		--tooltip-bg: linear-gradient(45deg, var(--red), var(--blue));
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

</style>