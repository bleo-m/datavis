<script>
    import * as d3 from 'd3';
    import { scaleLinear } from "d3-scale";
    import { onMount } from 'svelte';
  
    export let incomeExpFood = [];
  
    // const LEGEND_SIZE = 20;
    let graphWidth = 300;
    let graphHeight = 300;
  
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
        2: 0,
        3: 1,
        4: 1,
        5: 1
    }

    const responseCount = [0, 0];
    const totalResponses = incomeExpFood.length;

    // add up the responses by kind
    incomeExpFood.forEach((response) => { 
        const index = responseIndices[response];
        responseCount[index]++;
    });
    console.log(responseCount);

    const data = [responseCount[1], totalResponses - responseCount[1]];

    // Run only on browser
    onMount(() => {
        var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(['#ffb82b', "#e8e8e8"]);

        // Generate the pie
        var pie = d3.pie();

        // Generate the arcs
        var arc = d3.arc()
                    .innerRadius(radius * 0.85)
                    .outerRadius(radius);

        //Generate groups
        var arcs = g.selectAll("arc")
                    .data(pie(data))
                    .enter()
                    .append("g")
                    .attr("class", "arc");


        //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("d", arc);
        
        // large bold text in the middle
        g.append("text")
            .attr("text-anchor", "middle")
            .attr('font-size', '4em')
            .attr('font-weight', 'bold')
            .attr('fill', '#ffb82b')
            .attr('alignment-baseline', 'middle')
            .text(`${Math.floor(responseCount[1] / totalResponses * 100)}%`);   // percentage of people who responded 4 or 5

    });
    
</script>


<div class="visualization">
    <svg width={graphWidth} height={graphHeight}> </svg>
</div>

<style>
.visualization {
    /* font: 25px sans-serif; */
    margin: auto;
    margin-top: 1px;
    text-align: middle;
}


</style>