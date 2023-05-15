<script>
    import * as d3 from 'd3';
    import { scaleLinear } from "d3-scale";
    import { onMount } from 'svelte';
  
    export let lcsiBorrow = [];
  
    // const LEGEND_SIZE = 20;
    let graphWidth = 400;
    let graphHeight = 400;
  
    const paddings = {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    };
  
    // onMount(() => {
    //   /**
    //    * Make graph height / width the size of the content element for the page
    //    */
    // //   let pageContent = document.getElementById('migration-graph-container');
    // //   graphWidth = pageContent.getBoundingClientRect().width - paddings.left - paddings.right;
    // //   graphHeight = pageContent.getBoundingClientRect().height - paddings.top - paddings.bottom;
    // });

    // Used to group responses 1 and 2 together, and 4 and 5 together

    const responseIndices = {
        1: 0,
        2: 2,
        3: 1,
    }

    const responseCount = [0, 0, 0];
    const totalResponses = lcsiBorrow.length;

    // add up the responses by kind
    lcsiBorrow.forEach((response) => { 
        const index = responseIndices[response];
        responseCount[index]++;
    });

    const data = responseCount;
    console.log(data);
    const radius = (graphWidth - 40) / 2;

    // Run only on browser
    onMount(() => {
        let colors = ["#ffb82b", "#ff7940", "#e3e3e3"];

        let sizes = {
        innerRadius: radius * 0.9,
        outerRadius: radius
        };

        let durations = {
        entryAnimation: 2000
        };

        draw();

        function draw() {
        d3.select("#chart2").html("");
        
        let generator = d3.pie()
            .sort(null);

        let chart = generator(data);

        let arcs = d3.select("#chart2")
            .append("g")
            .attr("transform", "translate(200, 200)")
            .selectAll("path")
            .data(chart)
            .enter()
            .append("path")
            .style("fill", (d, i) => colors[i])
            .on("mousemove", (d, section)=>{
                followMouse(d, section.index);
            })
            .on("mouseout", (d, section)=>{
                removePointer();
            });


        // large bold text in the middle
        let text = d3.select("#chart2").select('g')
            .append("text")
            .attr("text-anchor", "middle")
            .attr('font-size', '4em')
            .attr('font-weight', 'bold')
            .attr('fill', '#ffb82b')
            .attr('alignment-baseline', 'middle')
            .text(`${Math.floor(responseCount[0] / totalResponses * 100)}%`);   // percentage of people who responded yes

        let angleInterpolation = d3.interpolate(generator.startAngle()(), generator.endAngle()());
        let innerRadiusInterpolation = d3.interpolate(0, sizes.innerRadius);
        let outerRadiusInterpolation = d3.interpolate(0, sizes.outerRadius);
        let fontInterpolation = d3.interpolate(0, 64);

        let arc = d3.arc()
            .innerRadius(sizes.innerRadius)
            .outerRadius(sizes.outerRadius);
        

        arcs.transition()
            .duration(durations.entryAnimation)
            .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                return "";
                }
                d.endAngle = Math.min(currentAngle, originalEnd);
                return arc(d);
            };
            });
        
        // change text content and size
        text.transition()
            .duration(durations.entryAnimation)
            .tween("text", () => {
            return t => text.text(`${Math.floor(responseCount[0] / totalResponses * 100 * t)}%`);
            })
            .tween("fontSize", () => {
            return t => text.attr('font-size', `${fontInterpolation(t)}px`);
            });

        // d3.select("#chart2")
        //     .transition()
        //     .duration(durations.entryAnimation)
        //     .tween("arcRadii", () => {
        //     return t => arc
        //         .innerRadius(innerRadiusInterpolation(t))
        //         .outerRadius(outerRadiusInterpolation(t));
        //     });
        
        }

    });

    // Hover Effects
    const idContainer = "chart2";
    let mousePosition = { x: null, y: null };
    let pageMousePosition = { x: null, y: null };
    let currentArc = 0;

    function followMouse(event, arc) {
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

    currentArc = arc;    
    }

    function removePointer() {
        mousePosition = { x: null, y: null };
    }
    
</script>


<div class="visualization">
    <svg id="chart2" 
    width={graphWidth} 
    height={graphHeight}
    ></svg>

    <div
    class={mousePosition.x === null ? "tooltip-hidden" : "tooltip-visible"}
    style="left: {pageMousePosition.x - 300}px; top: {pageMousePosition.y + 16}px"
  >
    {#if mousePosition.x !== null && currentArc === 0}
    <p>
        {data[0]} families responded <b>"Yes"</b>
    </p>
    {/if}
    {#if mousePosition.x !== null && currentArc === 1}
    <p>
        {data[1]} families responded <b>"No, because this strategy has been exhausted"</b>
    </p>
    {/if}
    {#if mousePosition.x !== null && currentArc === 2}
    <p>
        {data[2]} families responded <b>"No"</b>
    </p>
    {/if}
  </div>
</div>

<style>
.visualization {
    margin-top: 1px;
    text-align: middle;
}

.tooltip-hidden {
    visibility: hidden;
    /* font-family: "Nunito", sans-serif; */
    width: 250px;
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
    width: 300px;
    color: var(--black);
    position: absolute;
    padding: 8px;
    /* drop shadow */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.10);
}


</style>