<script>
  import * as d3 from 'd3';
  export let data;
  import { onMount } from 'svelte';
  // import {nest} from 'd3-collection';


  function LineGraph(data, {
    value = d => d, // convenience alias for x
    label, // convenience alias for xLabel
    format, // convenience alias for xFormat
    xFormat = format, // a format specifier string for the x-axis
    normalize, // whether to normalize values to a total of 100%
    color1 = "currentColor",
    color2 = "currentColor",
    width = 640, // outer width of chart, in pixels
    height = 400, // outer height of chart, in pixels
  } = {}) {
    const marginLeft = 40;
    const marginRight = 30;
    const marginBottom = 30;
    const marginTop = 20;

    //scale xAxis 
    var xMax = d3.max(data, d => parseInt(d.entry["Month"]));
    const xScale = d3.scaleLinear().domain([0, xMax]).range([marginLeft, width - marginRight]);
    //scale yAxis
    const yScale = d3.scaleLinear().domain([20, 180]).range([height - marginBottom, marginTop]);

    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${marginLeft},0)`) //use variable in translate
      .call(yAxis)
      .call(g => g.selectAll().clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Variation from Average (%)"))
      ;
    

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call(g => g.append("text")
            .attr("x", width - marginRight)
            .attr("y", 27)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text("Month"));

    var oneMonth = d3.line()
    // .interpolate("basis")
    .x(function(d) { return xScale(d.entry["Month"]); })
    .y(function(d) { return yScale(d.entry["1 Month Anomaly (%)"]); });

    var threeMonth = d3.line()
    // .interpolate("basis")
    .x(function(d) { return xScale(d.entry["Month"]); })
    .y(function(d) { return yScale(d.entry["3 Months Anomaly (%)"]); });

    svg.selectAll("path.path1")
    .append("g")
    .attr("class", "line")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", "None")
    .attr("stroke", color1)
    .attr("stroke-width", 2)
    .attr("d", oneMonth(data));

    svg.selectAll("path.path2")
    .append("g")
    .attr("class", "line")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", "None")
    .attr("stroke", color2)
    .attr("stroke-width", 2)
    .attr("d", threeMonth(data));

    return svg.node();

  }

  let chart;
  let container;

  onMount(()=>{
    let entries = data.csv.map(entry => new Object({'entry': entry}));

    chart = LineGraph(entries, {
      value: d => d.entries,
      label: "Rainfall Anomalies",
      height: 500,
      color1: "#FF5964",
      color2: "#6CA3CF"
    })

    console.log(chart);
    container.appendChild(chart);

  })

</script>

<div bind:this={container}/>

<style>
  .axis path{
      stroke:black;
      stroke-width:2px ;
  }   

  .axis line{
      stroke: black;
      stroke-width: 1.5px;
  } 

  .axis text{
      fill: black;
      font-weight: bold;
      font-size: 14px;
      font-family:"Arial Black", Gadget, sans-serif;
  } 

  .legend text{
      fill:  black;
      font-family:"Arial Black", Gadget, sans-serif;
  }
</style>