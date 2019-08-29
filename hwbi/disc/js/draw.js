var rivData;
var drawn = false;
var width = 300,
  height = 300,
  radius = Math.min(width, height) / 2,
  innerRadius = 0.3 * radius;

var svg = d3
  .select("#aster")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

function drawAsterPlot(data) {
  drawn = true;
  rivData = data; ////give rivData updated data

  //use d3 to create the pie chart layout
  var pie = d3
    .pie()
    .sort(null)
    .value(function(d) {
      return d.weight;
    });

  //hover over pie slice for label using d3 tooltip
  var tip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([0, 0])
    .html(function(d) {
      return (
        d.data.description +
        ": <span style='color:orangered'>" +
        round(d.data.score, 1) +
        "</span>"
      );
    });

  //call the hover tip utility
  svg.call(tip);

  //use d3 to calculate size of arcs/angles
  var arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(function(d) {
      return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
    });

  //use d3 to calculate size of outline arcs
  var outlineArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  //create variable path that appends a solidArc to the svg
  //"path" is any irregular SVG shape (pie slice)
  var path = svg
    .selectAll(".solidArc")
    .data(pie(data))
    .enter()
    .append("path")
    //assign colors to solidArc slice based on domain name
    .attr("fill", function(d) {
      if (d.data.description == "Connection to Nature") {
        return "#82AC45";
      }
      if (d.data.description == "Cultural Fulfillment") {
        return "#998FE4";
      }
      if (d.data.description == "Education") {
        return "#D59B2D";
      }
      if (d.data.description == "Health") {
        return "#5598C3";
      }
      if (d.data.description == "Leisure Time") {
        return "#DC4B60";
      }
      if (d.data.description == "Living Standards") {
        return "#269683";
      }
      if (d.data.description == "Safety and Security") {
        return "#606060";
      }
      if (d.data.description == "Social Cohesion") {
        return "#E5632E";
      }
      if (d.data.description == "Resilience") {
        return "#FDFD65";
      }
    })

    .attr("class", "solidArc")
    .attr("stroke", "gray")
    .attr("d", arc)
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  //create variable outerPath that appends an outlineArc to svg
  svg
    .selectAll(".outlineArc")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("class", "outlineArc")
    .attr("d", outlineArc);

  // calculate the weighted mean HWBI score
  var score =
    data.reduce(function(a, b) {
      console.log(b);
      if (b.score !== null) {
        return a + b.score * b.weight;
      }
      return a;
    }, 0) /
    data.reduce(function(a, b) {
      if (b.score !== null) {
        return a + b.weight;
      }
      return a;
    }, 0);

  //display DISC score
  svg
    .append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(round(score, 1));

  //display word "DISC" under the score value
  svg
    .append("svg:text")
    .attr("dy", "1.95em")
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .style("font-weight", "bold")
    .text("DISC");
}

//update pie chart function
function updateAsterPlot(data) {
  rivData = data; //give rivData updated data

  //use d3 to create the pie chart layout
  var pie = d3
    .pie()
    .sort(null)
    .value(function(d) {
      return d.weight;
    });

  //use d3 to calculate size of arcs/angles
  var arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(function(d) {
      return (radius - innerRadius) * (d.data.score / 100) + innerRadius;
    });

  //use d3 to calculate size of outline arcs
  var outlineArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  //create variable path that appends a solidArc to the svg
  //"path" is any irregular SVG shape (pie slice)
  svg
    .selectAll(".solidArc")
    .data(pie(data))
    .transition()
    .duration(250)
    //assign colors to solidArc slice based on domain name
    .attr("fill", function(d) {
      if (d.data.description == "Connection to Nature") {
        return "#82AC45";
      }
      if (d.data.description == "Cultural Fulfillment") {
        return "#998FE4";
      }
      if (d.data.description == "Education") {
        return "#D59B2D";
      }
      if (d.data.description == "Health") {
        return "#5598C3";
      }
      if (d.data.description == "Leisure Time") {
        return "#DC4B60";
      }
      if (d.data.description == "Living Standards") {
        return "#269683";
      }
      if (d.data.description == "Safety and Security") {
        return "#606060";
      }
      if (d.data.description == "Social Cohesion") {
        return "#E5632E";
      }
      if (d.data.description == "Resilience") {
        return "#FDFD65";
      }
    })
    .attr("class", "solidArc")
    .attr("stroke", "gray")
    .attr("d", arc);

  //create variable outerPath that appends an outlineArc to svg
  svg
    .selectAll(".outlineArc")
    .data(pie(data))
    .transition()
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("class", "outlineArc")
    .attr("d", outlineArc);

  // calculate the weighted mean HWBI score
  var score =
    data.reduce(function(a, b) {
      console.log(b);
      if (b.score !== null) {
        return a + b.score * b.weight;
      }
      return a;
    }, 0) /
    data.reduce(function(a, b) {
      if (b.score !== null) {
        return a + b.weight;
      }
      return a;
    }, 0);

  //display DISC score
  d3.select("text.aster-score")
    .transition()
    .duration(250)
    .text(round(score, 1));
}

//update pie chart function
function updateAsterRivs(data) {
  //use d3 to create the pie chart layout
  var pie = d3
    .pie()
    .sort(null)
    .value(function(d) {
      return d.weight;
    });

  //use d3 to calculate size of arcs/angles
  var arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(function(d) {
      return (radius - innerRadius) * (d.data.score / 100) + innerRadius;
    });

  //use d3 to calculate size of outline arcs
  var outlineArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  //create variable path that appends a solidArc to the svg
  //"path" is any irregular SVG shape (pie slice)
  svg
    .selectAll(".solidArc")
    .data(pie(data))
    .transition()
    .duration(250)
    //assign colors to solidArc slice based on domain name
    .attr("fill", function(d) {
      if (d.data.description == "Connection to Nature") {
        return "#82AC45";
      }
      if (d.data.description == "Cultural Fulfillment") {
        return "#998FE4";
      }
      if (d.data.description == "Education") {
        return "#D59B2D";
      }
      if (d.data.description == "Health") {
        return "#5598C3";
      }
      if (d.data.description == "Leisure Time") {
        return "#DC4B60";
      }
      if (d.data.description == "Living Standards") {
        return "#269683";
      }
      if (d.data.description == "Safety and Security") {
        return "#606060";
      }
      if (d.data.description == "Social Cohesion") {
        return "#E5632E";
      }
      if (d.data.description == "Resilience") {
        return "#FDFD65";
      }
    })
    .attr("class", "solidArc")
    .attr("stroke", "gray")
    .attr("d", arc);

  //create variable outerPath that appends an outlineArc to svg
  svg
    .selectAll(".outlineArc")
    .data(pie(data))
    .transition()
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("class", "outlineArc")
    .attr("d", outlineArc);

  // calculate the weighted mean HWBI score
  var score1 =
    data.reduce(function(a, b) {
      console.log(b);
      if (b.score !== null) {
        return a + b.score * b.weight;
      }
      return a;
    }, 0) /
    data.reduce(function(a, b) {
      if (b.score !== null) {
        return a + b.weight;
      }
      return a;
    }, 0);

  //display HWBI score
  d3.select("text.scoreTex")
    .transition()
    .duration(250)
    .text(round(score1, 1));
}

function useRIVWeights() {
  //create empty array to store domain weights
  var domainWeights = [];
  //get value of each RIV p input and store in array
  $(".rankinglist input").each(function(i, elem) {
    domainWeights.push(parseInt($(elem).val()));
  });

  //to populate rivData array, grab Domain Weights values iteratively
  var i = 0;
  rivData.forEach(function(domain) {
    domain.weight = domainWeights[i];
    i++;
  });

  //call function to draw pie chart taking updated rivData
  updateAsterRivs(rivData);
}
