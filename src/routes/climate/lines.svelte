<script>
  import * as d3 from 'd3';
  import { scaleLinear } from "d3-scale";
  import { onMount } from 'svelte';
  export let data = [];

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const KEYS = {"Normal":["#000000", 100], "1 Month Anomaly":["#FF5964",100], "3 Months Anomaly":["#6CA3CF",125]};
  const LEGEND_SIZE = 20;
  let graphWidth = 1000;

  onMount(() => {
    let pageContent = document.getElementById('page-content');
    graphWidth = pageContent.getBoundingClientRect().width;
  });

  let graphHeight = 300;
  const paddings = {
    top: 20,
    left: 40,
    right: 30,
    bottom: 60
  };

  // Scaling
  const yMax1 = Math.max(...data.csv.map((d) => d["1 Month Anomaly (%)"]));
  const yMax2 = Math.max(...data.csv.map((d) => d["3 Months Anomaly (%)"]));
  $: xScale = scaleLinear()
              .domain([0, data.csv.length])
              .range([paddings.left, graphWidth - paddings.right])

  $: yScale = scaleLinear()
              .domain([0, Math.max(yMax1, yMax2)])
              .range([graphHeight - paddings.bottom, paddings.top])

  // Tick Marks
  let xTicks = {0:2021, 36:2022, 72:2023};
  let yTicks = [];
  $: {
    for (let i=0; i<Math.round(Math.max(yMax1, yMax2))+1; i=i+20) {
      yTicks.push(i);
    }
  }

  // Hover Effects
  const idContainer = "svg-container-" + Math.random() * 1000000;

  // typically null is unreliable in javascript, try using underfined instead
  let mousePosition = { x: null, y: null };
  let pageMousePosition = { x: null, y: null };
  let currentHoveredPoint = undefined;

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

  function computeSelectedXValue(value) {
    console.log(currentHoveredPoint);
    try{
      currentHoveredPoint = data.csv[data.csv.filter((d) => xScale(d["index"]) >= value)[0]["index"] - 2];
      return data.csv.filter((d) => xScale(d.index) >= value)[0].index - 1;
    }
    catch {
      currentHoveredPoint = data.csv[data.csv.length - 1];
      return data.csv.length - 1;
    }
  }

</script>

<div class="visualization">
  <svg
    width={graphWidth}
    height={graphHeight}
    on:mousemove={followMouse}
    on:mouseleave={removePointer}
    id={idContainer}
  >
    <!-- X and Y axis -->
    <g>
      <line
        x1={paddings.left}
        x2={graphWidth - paddings.right}
        y1={graphHeight - paddings.bottom}
        y2={graphHeight - paddings.bottom}
        stroke="#000000"
        stroke-width="1"
      />
      <line
        x1={paddings.left}
        x2={paddings.left}
        y1={paddings.top}
        y2={graphHeight - paddings.bottom}
        stroke="#000000"
        stroke-width="1"
      />
    </g>
    <!-- Normal, 1 Month and 3 Months Anomaly Lines -->
    <line
      x1={paddings.left}
      x2={graphWidth - paddings.right}
      y1={yScale(100)}
      y2={yScale(100)}
      stroke="#000000"
      stroke-width="2"
    />
    <g>
      {#each data.csv as d, i}
        {#if i!= data.csv.length - 1}
          <line
            x1={xScale(data.csv[i].index)}
            x2={xScale(data.csv[i+1].index)}
            y1={yScale(data.csv[i]["1 Month Anomaly (%)"])}
            y2={yScale(data.csv[i+1]["1 Month Anomaly (%)"])}
            stroke="#FF5964"
            stroke-width="2"
          />
          <line
            x1={xScale(data.csv[i].index)}
            x2={xScale(data.csv[i+1].index)}
            y1={yScale(data.csv[i]["3 Months Anomaly (%)"])}
            y2={yScale(data.csv[i+1]["3 Months Anomaly (%)"])}
            stroke="#6CA3CF"
            stroke-width="2"
          />
        {/if}
      {/each}
    </g>
    <!-- Ticks on Axis -->
    <g transform="translate(0, {graphHeight - paddings.bottom})">
      {#each Object.keys(xTicks) as x}
        <g
          class="tick"
          opacity="1"
          transform="translate({xScale(x)},0)"
        >
          <line stroke="#000000" y2="6" />
          <text dy="0.71em" fill="#000000" y="10" x="-5">
            {xTicks[x]}
          </text>
        </g>
      {/each}
      <text x="{graphWidth - paddings.right}" y="5">Year</text>
    </g>
    <g transform="translate({paddings.left}, 0)">
      {#each yTicks as y}
        <g
          class="tick"
          opacity="1"
          transform="translate(0,{yScale(y)})"
        >
          <line stroke="#000000" x2="-5" />
          <text dy="0.32em" fill="#000000" x="-{paddings.left}">
            {y}
          </text>
        </g>
      {/each}
      <text x="-{paddings.left}" y="15">Variation from Average (%)</text>
    </g>

    {#if mousePosition.x !== null}
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
  </svg>
  <!-- Information when Hovering -->
  <div
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
  </div>
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
    background-color: #dcd9d0;
    border-radius: 10px;
    width: 225px;
    color: black;
    position: absolute;
    padding: 10px;
  }

  .info-container {
    display:flex;
  }

  .info-box1 {
    width: 7.5%;
    background-color: #FF5964;
    display: block;
    padding-top: 7.5%;
    margin-bottom: 1%;
  }

  .info-box2 {
    width: 7.5%;
    background-color: #6CA3CF;
    display: block;
    padding-top: 7.5%;
    margin-top: 1%;
  }

</style>