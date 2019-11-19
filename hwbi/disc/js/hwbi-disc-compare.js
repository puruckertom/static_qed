const comp_width = 820;
const comp_height = 440;
const center = [comp_width / 2, comp_height / 2];
const noMatchFill = "#f1f1f1";
const selectedFill = "#32ba46";

const formatHwbi = d3.format(".1f");
//const qcolors = ['#8c510a', '#D9A55F', '#aeb0b5', '#80cdc1', '#35978f'];
//const qlabels = ['Much Less', 'Less', 'About Same', 'More', 'Much More'];
const qcolors = ["#D9A55F", "#aeb0b5", "#80cdc1", "#32ba46"];
const qlabels = ["Lower", "Same", "Higher", "Selected County"];

let countiesDataCache = [];
let countiesData = [];

let compareRange = 20; // this is the default compare range
// in set_compareRange() the distance between the selected county and the furthest adjacent county
const range_multiplier = 1.4; // (by centroids) is multiplied by this to get search range.

let currFIPS;
let hwbiByFIPS;

let projection = d3.geoAlbersUsa();

const zoom = d3.zoom().scaleExtent([1, 8]);

let comp_path = d3.geoPath().projection(projection);

let comp_svg = d3
  .select("#map-wrapper")
  .append("svg")
  .attr("class", "county-map")
  .attr("width", comp_width)
  .attr("height", comp_height)
  .append("g")
  .call(zoom);
comp_svg.on("wheel.zoom", null);
comp_svg.on("mousewheel.zoom", null);

let g = comp_svg.append("g");

let comparePanel = d3.select("#compare-panel");

let resultPanel = d3.select("#result-panel");

// Legend
let legend = comp_svg.append("g").attr("class", "legend");
legend
  .append("rect")
  .attr("x", comp_width - comp_width)
  .attr("y", comp_height - 120)
  .attr("width", 110)
  .attr("height", 170)
  .attr("fill", "#ffffff")
  .attr("opacity", 0.7);
legend
  .append("text")
  .attr("class", "legendheader")
  .attr("x", comp_width - comp_width)
  .attr("y", comp_height - 100)
  .text("DISC Score");
legend
  .selectAll("rect.legend")
  .data([0, 1, 2, 4])
  .enter()
  .append("rect")
  .attr("x", comp_width - comp_width)
  .attr("y", function(d, i) {
    return comp_height - i * 20 - 30;
  })
  .attr("width", 10)
  .attr("height", 20)
  .style("fill", function(d, i) {
    return qcolors[i];
  });
legend
  .selectAll(".ticklabel")
  .data([0, 1, 2, 3, 4])
  .enter()
  .append("text")
  .attr("class", "ticklabel")
  .attr("x", comp_width - comp_width + 15)
  .attr("y", function(d, i) {
    return comp_height - i * 20 - 15;
  })
  .text(function(d, i) {
    return qlabels[i];
  });

d3.json("comp_map_data/us.json").then(ready);

function ready(us) {
  g.append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter()
    .append("path")
    .attr("d", comp_path)
    .attr("fill", noMatchFill)
    .on("mouseover", function(d) {
      if (hwbiByFIPS.has(d.id)) {
        d3.select(this).classed("selected", true);
        comparePanel
          .transition()
          .duration(150)
          .style("opacity", 1);

        setText(d.id, comparePanel);
        compareScores();
      }
    })
    .on("mouseout", function() {
      d3.select(this).classed("selected", false);
      comparePanel
        .transition()
        .duration(300)
        .style("opacity", 0);
    });

  g.append("path")
    .datum(
      topojson.mesh(us, us.objects.states, function(a, b) {
        return a !== b;
      })
    )
    .attr("class", "states")
    .attr("d", comp_path);
}

function setText(id, div) {
  let county = hwbiByFIPS.get(id);
  div.select(".name").text(county["name"]);
  div
    .select(".hwbi")
    .html(
      '<text>DISC Score:  <span class="hwbi right">' +
        formatHwbi(county["hwbi"]) +
        "</span></text>"
    );
  div
    .select(".ed")
    .html(
      '<text>Education:  </text><span class="ed right">' +
        formatHwbi(county["Education"]) +
        "</span>"
    );
  div
    .select(".he")
    .html(
      '<text>Health:  </text><span class="he right">' +
        formatHwbi(county["Health"]) +
        "</span>"
    );
  div
    .select(".ls")
    .html(
      '<text>Living Standards:  </text><span class="ls right">' +
        formatHwbi(county["Living Standards"]) +
        "</span>"
    );
  div
    .select(".ss")
    .html(
      '<text>Safety &amp; Security:  </text><span class="ss right">' +
        formatHwbi(county["Safety and Security"]) +
        "</span>"
    );
  div
    .select(".re")
    .html(
      '<text>Resilience:  </text><span class="re right">' +
        (county["Resilience"] === null
          ? "N/A"
          : formatHwbi(county["Resilience"])) +
        "</span>"
    );
  div
    .select(".cf")
    .html(
      '<text>Cultural Fulfillment:  </text><span class="cf right">' +
        formatHwbi(county["Cultural Fulfillment"]) +
        "</span>"
    );
  div
    .select(".sc")
    .html(
      '<text>Social Cohesion:  </text><span class="sc right">' +
        formatHwbi(county["Social Cohesion"]) +
        "</span>"
    );
  div
    .select(".lt")
    .html(
      '<text>Leisure Time:  </text><span class="lt right">' +
        formatHwbi(county["Leisure Time"]) +
        "</span>"
    );
  div
    .select(".cn")
    .html(
      '<text>Connection to Nature:  </text><span class="cn right">' +
        formatHwbi(county["Connection to Nature"]) +
        "</span>"
    );

  if (county["Resilience"] === null) {
    div
      .select(".re")
      .attr(
        "title",
        "Score could not be calculated due to lack of available data."
      )
      .style("cursor", "help");
  } else {
    div
      .select(".re")
      .attr("title", "")
      .style("cursor", "pointer");
  }
}

function compareScores() {
  // TODO: there is a better way, this was easiest to get up and working
  const domains = [
    "hwbi right",
    "cn right",
    "cf right",
    "ed right",
    "he right",
    "lt right",
    "ls right",
    "ss right",
    "sc right",
    "re right"
  ];

  for (let i = 0; i < domains.length; i++) {
    let scores = document.getElementsByClassName(domains[i]);
    scores[0].classList.remove("better", "worse");
    scores[1].classList.remove("better", "worse");
    if (parseFloat(scores[0].innerText) > parseFloat(scores[1].innerText)) {
      scores[0].classList.add("better");
      scores[1].classList.add("worse");
    } else if (
      parseFloat(scores[0].innerText) < parseFloat(scores[1].innerText)
    ) {
      scores[0].classList.add("worse");
      scores[1].classList.add("better");
    }
  }
}

async function comp_setCompareMapData(state, county) {
  hwbiByFIPS = d3.map();
  let countyData = await db_get_fips(county, state);
  if (!countyData) {
    console.log("no data");
    return;
  }
  currFIPS = parseInt(countyData.FIPS);
  currFIPS = "" + currFIPS;
  if (currFIPS.length === 4) {
    currFIPS = "0" + currFIPS;
  }

  let data = getCachedData(currFIPS);
  if (!data) {
    data = await dbGetCountyScores(currFIPS);
    countiesDataCache.push(data);
  }
  countiesData.push(data);
  hwbiByFIPS.set(currFIPS, data);
  setText(currFIPS, resultPanel);
  setFill();
  scoreAdjacentByFIPS(currFIPS);
}

let globalCompareCountiesNonce;

async function scoreAdjacentByFIPS(fips) {
  const localNonce = (globalCompareCountiesNonce = new Object());
  let currentCountyGeo = null;
  let counties = comp_svg.selectAll(".counties path");

  for (let i = 0; i < counties._groups[0].length; i++) {
    if (fips === counties._groups[0][i].__data__.id) {
      currentCountyGeo = counties._groups[0][i].__data__;
    }
  }

  let currentCentroid = comp_path.centroid(currentCountyGeo);
  let { adjacentCounties, farthestDistance } = getAdjacentCounties(
    fips,
    currentCentroid
  );

  if (adjacentCounties.length >= 1) {
    compareRange = farthestDistance > 61 ? 61 : farthestDistance;
  } else {
    console.log("No border counties found!");
    scoreWithinRangeByFIPS(fips);
    return;
  }

  centerAndZoom(currentCentroid, compareRange);

  for (let i = 0; i < adjacentCounties.length; i++) {
    let countyID = adjacentCounties[i];
    if (fips !== countyID) {
      if (localNonce !== globalCompareCountiesNonce) {
        return;
      }
      let data = getCachedData(countyID); //checks here to see if the county has been scored on a previous search
      if (!data) {
        data = await dbGetCountyScores(countyID);
        countiesDataCache.push(data);
      }
      countiesData.push(data);
      setData(data);
    }
  }
}

async function scoreWithinRangeByFIPS(fips) {
  const localNonce = (globalCompareCountiesNonce = new Object());
  // SET THE COMPARE RANGE...
  // this could be more accurate by allowing a range of deviation for points to be "the same"
  // using path coords instead of centroids would most likely give a more complete search
  let currentCountyGeo = null;

  let counties = comp_svg.selectAll(".counties path");

  for (let i = 0; i < counties._groups[0].length; i++) {
    if (fips === counties._groups[0][i].__data__.id) {
      currentCountyGeo = counties._groups[0][i].__data__;
    }
  }
  let currentCentroid = comp_path.centroid(currentCountyGeo);

  var currentCountyGeoCoords = currentCountyGeo.geometry.coordinates;
  while (typeof currentCountyGeoCoords[0][0][0] !== "number") {
    currentCountyGeoCoords = currentCountyGeoCoords[0];
  }

  let adjacentCounties = [];

  // for every county in the list whose ID != currentCountyID
  for (let i = 0; i < counties._groups[0].length; i++) {
    let countyData = counties._groups[0][i].__data__;
    let countyID = countyData.id;
    if (fips !== countyID) {
      let countyGeo = countyData.geometry.coordinates;
      while (typeof countyGeo[0][0][0] !== "number") {
        countyGeo = countyGeo[0];
      }

      for (let j = 0; j < currentCountyGeoCoords[0].length; j++) {
        let coord1 = currentCountyGeoCoords[0][j];
        // see if any of the coord pairs match, if so they are touching
        for (let k = 0; k < countyGeo[0].length; k++) {
          let coord2 = countyGeo[0][k];
          if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
            adjacentCounties.push(
              distance(currentCentroid, comp_path.centroid(countyData))
            );
          }
        }
      }
    }
  }
  if (adjacentCounties.length >= 1) {
    let farthest = adjacentCounties[0];
    for (let i = 1; i < adjacentCounties.length; i++) {
      if (farthest < adjacentCounties[i]) {
        farthest = adjacentCounties[i];
      }
    }
    compareRange = farthest * range_multiplier;
  }

  centerAndZoom(currentCentroid, compareRange);

  // SCORE WITHIN RANGE
  countiesData = [];
  for (let i = 0; i < counties._groups[0].length; i++) {
    let countyID = counties._groups[0][i].__data__.id;
    if (fips !== countyID) {
      let otherCentroid = comp_path.centroid(counties._groups[0][i].__data__);
      if (distance(currentCentroid, otherCentroid) < compareRange) {
        if (localNonce !== globalCompareCountiesNonce) {
          return;
        }
        //checks here to see if the county has been scored on a previous search
        let data = getCachedData(countyID);
        if (!data) {
          data = await dbGetCountyScores(countyID);
          countiesDataCache.push(data);
        }
        countiesData.push(data);
        setData(data);
      }
    }
  }
}

function getCachedData(countyID) {
  for (let i = 0; i < countiesDataCache.length; i++) {
    let county = countiesDataCache[i];
    if (county.FIPS === countyID) {
      return county;
    }
  }
  return false;
}

function setData(d) {
  hwbiByFIPS.set(d.FIPS, d);
  setFill();
}

async function dbGetCountyScores(fips) {
  let data = {};
  let id = fips.toString();

  if (id.length < 5) {
    id = "0" + id;
  }

  let comp_location = await db_get_location(id);
  let name = comp_location["COUNTY_NAME"] + ", " + comp_location["STATE_CODE"];

  let scores = await db_get_data(
    comp_location["COUNTY_NAME"],
    comp_location["STATE_CODE"]
  );
  let hwbi = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i]["avg(SCORE)"] === null) {
      data[scores[i].DOMAIN] = scores[i]["avg(SCORE)"];
    } else {
      data[scores[i].DOMAIN] = scores[i]["avg(SCORE)"] * 100;
    }
    hwbi += scores[i]["avg(SCORE)"];
  }
  data.hwbi = (hwbi / scores.length) * 100;
  data.FIPS = fips;
  data.name = name;

  return data;
}

function db_get_fips(county, state) {
  let stmt_fips =
    "SELECT FIPS FROM counties WHERE COUNTY_NAME = ? AND STATE_CODE = ?";
  return new Promise((resolve, reject) => {
    db.get(stmt_fips, [county, state], (err, row) => {
      if (err) {
        console.log(
          "Error - db_get_fips(" + county + ", " + state + "): " + err
        );
        reject(err);
      }
      resolve(row);
    });
  });
}

function db_get_location(fips) {
  let stmt_location = "SELECT * FROM counties WHERE FIPS = ?";
  return new Promise((resolve, reject) => {
    db.get(stmt_location, [fips], (err, row) => {
      if (err) {
        console.log("Error - db_get_location(" + fips + "): " + err);
        reject(err);
      }
      resolve(row);
    });
  });
}

function db_get_data(county, state) {
  let stmt_data =
    "SELECT DOMAIN, avg(SCORE) from(" +
    "SELECT Domains_Indicators.DOMAIN, Indicators_MetricVars.INDICATOR, avg(MetricVarScores.SCORE) as SCORE " +
    "FROM MetricVarScores " +
    "INNER JOIN Counties ON MetricVarScores.FIPS = Counties.FIPS " +
    "INNER JOIN MetricVars ON MetricVarScores.METRIC_VAR = MetricVars.METRIC_VAR " +
    "INNER JOIN Indicators_MetricVars ON Indicators_MetricVars.METRIC_VAR = MetricVars.METRIC_VAR " +
    "INNER JOIN Domains_Indicators ON Domains_Indicators.INDICATOR = Indicators_MetricVars.INDICATOR " +
    "INNER JOIN MetricGroups_Domains ON MetricGroups_Domains.DOMAIN = Domains_Indicators.DOMAIN " +
    "WHERE Counties.COUNTY_NAME = ? AND Counties.STATE_CODE = ? AND (MetricGroups_Domains.METRIC_GRP = ? OR MetricGroups_Domains.METRIC_GRP = ?)" +
    "Group By Domains_Indicators.DOMAIN, Indicators_MetricVars.INDICATOR) Group By DOMAIN";
  return new Promise((resolve, reject) => {
    db.all(stmt_data, [county, state, "HWBI", "CRSI"], (err, rows) => {
      if (err) {
        console.log(
          "Error - db_get_data(" + county + ", " + state + "): " + err
        );
        reject(err);
      }
      resolve(rows);
    });
  });
}

function distance(coord1, coord2) {
  let x1 = coord1[0];
  let y1 = coord1[1];
  let x2 = coord2[0];
  let y2 = coord2[1];
  let xs = x2 - x1;
  let ys = y2 - y1;
  xs *= xs;
  ys *= ys;
  return Math.sqrt(xs + ys);
}

function setFill() {
  comp_svg
    .selectAll(".counties path")
    .transition()
    .duration(300)
    .attr("fill", function(d) {
      if (d.id === currFIPS) {
        return selectedFill;
      }
      let matchFound = false;
      for (let i = 0; i < countiesData.length; i++) {
        if (countiesData[i]["FIPS"] === d.id) {
          matchFound = true;
        }
      }

      if (matchFound) {
        return classByHwbi(d.id);
      } else {
        return noMatchFill;
      }
    });
}

function classByHwbi(FIPS) {
  let currCounty = hwbiByFIPS.get(currFIPS);

  let county = hwbiByFIPS.get(FIPS);

  if (typeof county !== "undefined") {
    if (formatHwbi(currCounty.hwbi) === formatHwbi(county.hwbi)) {
      return qcolors[1];
    } else if (county.hwbi < currCounty.hwbi) {
      return qcolors[0];
    } else {
      return qcolors[2];
    }
  } else {
    return noMatchFill;
  }
}

function centerAndZoom(centroid, compareRange) {
  // higher compare ranges need smaller scale
  // scale should be between ~2 - ~10
  // affine transform...
  // mapped_value = ((initial_value - from_lowest) * ((to_highest - to_lowest) / (from_highest - from_lowest))) + to_lowest
  // to invert the range subtract the transform from the length of the range
  let scale = 10 - 0 - ((compareRange - 0) * ((10 - 0) / (80 - 0)) + 0);
  g.transition()
    .duration(0.1)
    .attr(
      "transform",
      "translate(" +
        center[0] +
        ", " +
        center[1] +
        ")scale(" +
        scale +
        ")translate(" +
        -centroid[0] +
        ", " +
        -centroid[1] +
        ")"
    );
}

function testCounties() {
  let counties = comp_svg.selectAll(".counties path");

  for (let x = 0; x < counties._groups[0].length; x++) {
    let currentCountyGeo = counties._groups[0][x].__data__;
    let fips = currentCountyGeo.id;
    let currentCountyGeoCoords = getCountyCoords(currentCountyGeo);
    let adjacentCountiesFIPS = [];

    // for every county in the list whose ID != currentCountyID
    for (let i = 0; i < counties._groups[0].length; i++) {
      let countyData = counties._groups[0][i].__data__;
      let countyID = countyData.id;
      if (fips !== countyID) {
        let countyGeo = getCountyCoords(countyData);
        for (let j = 0; j < currentCountyGeoCoords.length; j++) {
          let coord1 = currentCountyGeoCoords[j];
          // see if any of the coord pairs match, if so they are touching
          for (let k = 0; k < countyGeo[0].length; k++) {
            let coord2 = countyGeo[0][k];
            if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
              adjacentCountiesFIPS.push(countyID);
            }
          }
        }
      }
    }

    if (!adjacentCountiesFIPS.length) {
      db_get_location(fips).then(data => {
        console.log(data);
      });
    }
  }
}

function getBoarderingCounties(fips, baselineCentroid) {
  let counties = comp_svg.selectAll(".counties path");
  let currentCountyGeo = null;
  let boardingCounties = [];
  let farthestDistance = 0;
  let currentCountyGeoCoords = null;

  for (let x = 0; x < counties._groups[0].length; x++) {
    if (fips === counties._groups[0][x].__data__.id) {
      currentCountyGeo = counties._groups[0][x].__data__;
    }
  }

  currentCountyGeoCoords = getCountyCoords(currentCountyGeo);

  // for every county in the list whose ID != currentCountyID
  for (let i = 0; i < counties._groups[0].length; i++) {
    let countyData = counties._groups[0][i].__data__;
    let countyID = countyData.id;
    if (fips !== countyID) {
      let countyGeo = getCountyCoords(countyData);
      for (let j = 0; j < currentCountyGeoCoords.length; j++) {
        let coord1 = currentCountyGeoCoords[j];
        // see if any of the coord pairs match, if so they are touching
        for (let k = 0; k < countyGeo.length; k++) {
          let coord2 = countyGeo[k];
          if (
            coord1[0] === coord2[0] &&
            coord1[1] === coord2[1] &&
            !boardingCounties.includes(countyID)
          ) {
            boardingCounties.push(countyID);
            let currentDistance = distance(
              baselineCentroid,
              comp_path.centroid(countyData)
            );
            if (farthestDistance < currentDistance) {
              farthestDistance = currentDistance;
            }
          }
        }
      }
    }
  }

  return {
    boardingCounties: boardingCounties,
    farthestDistance: farthestDistance
  };
}

function getAdjacentCounties(fips, baselineCentroid) {
  let { boardingCounties, farthestDistance } = getBoarderingCounties(
    fips,
    baselineCentroid
  );
  let adjacentCounties = [];
  for (let i = 0; i < boardingCounties.length; i++) {
    let {
      boardingCounties: counties,
      farthestDistance: distance
    } = getBoarderingCounties(boardingCounties[i], baselineCentroid);
    adjacentCounties = adjacentCounties.concat(counties);
    if (farthestDistance < distance) {
      farthestDistance = distance;
    }
  }
  adjacentCounties = adjacentCounties.concat(boardingCounties);
  adjacentCounties = Array.from(new Set(adjacentCounties));
  return {
    adjacentCounties: adjacentCounties,
    farthestDistance: farthestDistance
  };
}

function getCountyCoords(countyData) {
  let countyGeo = [];
  if (countyData.geometry.type === "MultiPolygon") {
    countyGeo = [];
    for (let i = 0; i < countyData.geometry.coordinates.length; i++) {
      for (let j = 0; j < countyData.geometry.coordinates[i][0].length; j++) {
        countyGeo.push(countyData.geometry.coordinates[i][0][j]);
      }
    }
  } else {
    countyGeo = countyData.geometry.coordinates[0];
  }
  return countyGeo;
}
