<script>
  import * as d3 from 'd3';
  export let data;
  import { onMount } from 'svelte';

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function LineGraph(data, {
    value = d => d, // convenience alias for x
    label, // convenience alias for xLabel
    color1 = "currentColor",
    color2 = "currentColor",
    width = 1000, // outer width of chart, in pixels
    height = 400, // outer height of chart, in pixels,
    marginLeft = 40,
    marginRight = 30,
    marginTop = 20,
    marginBottom = 60,
    xRange = [marginLeft, width - marginRight],
    yRange = [height - marginBottom, marginTop],
  } = {}) {
    const xMin = d3.min(data, d => parseFloat(d.entry["index"]));
    const xMax = d3.max(data, d => parseFloat(d.entry["index"]));
    const yMax1 = d3.max(data, d => parseFloat(d.entry["1 Month Anomaly (%)"]));
    const yMax2 = d3.max(data, d => parseFloat(d.entry["3 Months Anomaly (%)"]));
    const xScale = d3.scaleLinear().domain([xMin, xMax]).range(xRange);
    const yScale = d3.scaleLinear().domain([0, Math.max(yMax1, yMax2)]).range(yRange);

    const xAxis = d3.axisBottom().scale(xScale).tickValues([0, 36, 72]).tickFormat((d,i) => ['2021','2022','2023'][i]);;
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
          .text("Variation from Average (%)"));
    
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call(g => g.append("text")
        .attr("x", width - marginRight)
        .attr("y", 27)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Year"));

    var normal = d3.line()
    .x(function(d) { return xScale(d.entry["index"]); })
    .y(function(d) { return yScale(100); });

    var oneMonth = d3.line()
    .x(function(d) { return xScale(d.entry["index"]); })
    .y(function(d) { return yScale(d.entry["1 Month Anomaly (%)"]); });

    var threeMonth = d3.line()
    .x(function(d) { return xScale(d.entry["index"]); })
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

    svg.selectAll("path.path3")
      .append("g")
      .attr("class", "line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "None")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
      .attr("d", normal(data));

    const mouse = svg.append('g').classed('mouse', true).style('display', 'none');
    mouse.append("rect").attr("width", 2).attr("x",-1).attr("height", height - marginBottom).style("fill", "gray");
    mouse.append("circle").attr("r",3).append("stroke", "steelblue");
    mouse.append("text");

    svg.on("mouseover", function(event) {
      mouse.style("display", "block");
    })

    svg.on("mousemove", function(event) {
      const [xCord, yCord] = d3.pointer(event);
      const ratio = xCord / width;
      const currentX = xMin + Math.round(ratio * (xMax - xMin));
      const dot1 = data.find(d => d.entry["index"] === String(currentX)).entry;
      const TEXTS = `Dekad ${dot1["Dekad"]} of ${MONTHS[parseInt(dot1["Month"] - 1)]} ${parseInt(dot1["Year"])}\n
                                1 Month Anomaly: ${parseInt(dot1["1 Month Anomaly (%)"])}\n
                                3 Months Anomaly: ${parseInt(dot1["3 Months Anomaly (%)"])}`;
      mouse.attr("transform", `translate(${xScale(currentX)},${0})`)
      mouse.select("text").text(TEXTS)
        .attr("text-anchor", currentX < (xMax + xMin) / 2 ? "start" : "end")
        .attr("y", marginTop + 10);
      mouse.select("circle").attr("cy", yScale(dot1["1 Month Anomaly (%)"])).attr("cy", yScale(dot1["3 Months Anomaly (%)"]));

    })
    svg.on("mouseout", function() {
      mouse.style("display", "none");
    });

    const keys = {"Normal":["currentColor", 100], "1 Month Anomaly":[color1,100], "3 Months Anomaly":[color2,125]}
    const size = 20

    svg.selectAll("mydots")
      .data(Object.keys(keys))
      .enter()
      .append("rect")
      .attr("x", function(d, i) { return marginLeft + i*(size+keys[d][1])})
      .attr("y", function(d){ return height - marginBottom / 3}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return keys[d][0]})

    svg.selectAll("mylabels")
      .data(Object.keys(keys))
      .enter()
      .append("text")
      .attr("x", function(d, i) {return marginLeft + i*(size+keys[d][1]) + 1.2*(size)})
      .attr("y", function(d,i){ return height - marginBottom / 7}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){ return keys[d][0]})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      

    return svg.node();
  }

  let chart;
  let container;

  onMount(()=>{
    let entries = data.csv.map(entry => new Object({'entry': entry}));

    chart = LineGraph(entries, {
      value: d => d.entries,
      label: "Rainfall Anomalies",
      height: 300,
      color1: "#FF5964",
      color2: "#6CA3CF"
    })

    container.appendChild(chart);
  })

</script>

<div bind:this={container}/>