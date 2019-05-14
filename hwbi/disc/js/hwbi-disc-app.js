// Div list that all contain the quote class
//var quoteDivs = document.getElementsByClassName('quote');
//var quoteIndex = 0;
var acc = document.getElementsByClassName("accordion");
var acc_i;
var searchBox;
var locationValue = '{}';
var hwbi_disc_data;

$(document).ready(function () {
    // Snapshot body
    setAccordion();
    setTimeout(getScoreData, 600);
    $('#report_pdf').on("click", generateReport);
    $('#rank-exit').on("click", function () {
        $('#rank-window').hide();
    });

    // Customize body
    $('.indicator_data-title').on('mouseover', displayIndicatorInformation);
    $('.indicator_block:first-child .indicator_data-title:first-child').mouseenter(); //simulate mouseover of first indicator title to show a description by default

    // County and state selection search
    countyStateSelectors();
    mainpageCountyStateSelectors();

    /**
     * Reset the Scenario Builder to the original values for the locale
     * @listens click
     */
    document.getElementById("reset-scenario-builder-btn").addEventListener("click", function () {
        var choice = dialog.showMessageBox(
            {
              type: 'question',
              buttons: ['Yes', 'No'],
              title: 'Reset Scenario Builder',
              message: 'Resetting the Scenario Builder will erase any changes you have made below.\n\nDo you still want to proceed?'
            });
          if (choice === 0) {
            let baselineValue; 

            function isCustomized() {
                const metrics = {...dataStructure.HWBI_METRIC, ...dataStructure.SERVICE_METRIC};
                for (let metric in metrics) {
                    if (metrics[metric].original_val !== metrics[metric].custom_val) {
                        return true;
                    }
                }
                return false;
            }

            isCustomized() ? baselineValue = 'custom_val' : baselineValue = 'original_val';

            resetValues(dataStructure.METRIC_GROUP[2], 'scenario_val', baselineValue);
            resetValues(dataStructure.METRIC_GROUP[3], 'scenario_val', baselineValue);
            resetValues(dataStructure.METRIC_GROUP[4], 'scenario_val', baselineValue);
            
            resetSliders(dataStructure.SERVICE_METRIC, 'scenario_val', 'scenario-builder-metric');

            calculateServiceHWBI();
            runAsterPlot();
        }
    });

    /**
     * Reset the to the original values for the locale
     * @listens click
     */
    $(".reset-hwbi-custom-btn").on("click", function () {
        let id = this.dataset.id;
        resetValues(dataStructure.HWBI_DOMAIN[id], 'custom_val', 'original_val');
        resetSlidersRecursive(dataStructure.HWBI_DOMAIN[id], 'custom_val', 'customize-hwbi-metrics');

        // Update scores after resetting domain tree
        updateAllWeightedAvgValues('METRIC_GROUP', 'custom_val', dataStructure); // calculate the metric group scores by averaging each metric group's child domains
        
        let location = JSON.parse(locationValue);
        setScoreData(location.state_abbr, location.county, 'custom_val'); // set the domain scores
        loadSkillbar(); // update the colored bars on the snapshot page
    });

    /**
     * Reset the to the original values for the locale
     * @listens click
     */
    $(".reset-service-custom-btn").on("click", function () {
        let type = this.dataset.type;
        for (let prop in dataStructure.METRIC_GROUP) {
            if (dataStructure.METRIC_GROUP[prop].name === type) {
                resetValues(dataStructure.METRIC_GROUP[prop], 'custom_val', 'original_val');
                resetSlidersRecursive(dataStructure.METRIC_GROUP[prop], 'original_val', 'customize-service-metrics');
            }
        }

        // Reset Charts
        updateApexCharts("custom_val");
    });

    /**
     * Reset the RIVs to 1
     * @listens click
     */
    document.getElementById("riv-reset-btn").addEventListener("click", () => {
        resetRivs();
        updateRivUi();
    });

    /**
     * Reset the HWBI Domains
     * @listens click
     */
    document.getElementById("reset-hwbi-domains").addEventListener("click", () => {
        for (let domain in dataStructure.HWBI_DOMAIN) {
            resetValues(dataStructure.HWBI_DOMAIN[domain], 'custom_val', 'original_val');
            resetSlidersRecursive(dataStructure.HWBI_DOMAIN[domain], 'custom_val', 'customize-hwbi-metrics');
        }

        // Update scores after resetting domain tree
        updateAllWeightedAvgValues('METRIC_GROUP', 'custom_val', dataStructure); // calculate the metric group scores by averaging each metric group's child domains
        
        let location = JSON.parse(locationValue);
        setScoreData(location.state_abbr, location.county, 'custom_val'); // set the domain scores
        loadSkillbar(); // update the colored bars on the snapshot page
    });

    /**
     * Reset the all Service customizations
     * @listens click
     */
    document.getElementById("reset-service-btn").addEventListener("click", () => {
        for (let prop in dataStructure.METRIC_GROUP) {
            if (dataStructure.METRIC_GROUP[prop].name !== "HWBI") {
                resetValues(dataStructure.METRIC_GROUP[prop], 'custom_val', 'original_val');
                resetSlidersRecursive(dataStructure.METRIC_GROUP[prop], 'original_val', 'customize-service-metrics');
            }
        }

        // Reset Charts
        updateApexCharts("custom_val");
    });
});

function initializeGoogleMaps() {
    google.maps.event.addDomListener(window, 'load', initializeAutocomplete);
    google.maps.event.addDomListener(window, 'load', initializeTopAutocomplete);
}

function loadPage() {
    $('#disc-tabs').css("opacity", 100);
    $(window.location.hash + "-link").trigger("click");
}

function toggleSearchType(e) {
    e.preventDefault();
    $('#statecounty').toggle();
    $('.autocomplete-container').toggle();
}

function toggleMainpageSearchType(e) {
    e.preventDefault();
    $('#mainpage-statecounty').toggle();
    $('.search').toggle();
    $('#connection-icons span').toggle();
}

function snapshotTrigger() {
    show('mainpage', 'homepage');

    $('#community-snapshot-tab').addClass('show');
    $('#community-snapshot-tab-link').trigger("click");

    /* $('html, body').animate({
        scrollTop: $('.content-wrapper').offset().top
    }, 0); */

    $(window).scrollTop(0);

    countyStateSelectors();
}

function getScoreData() {
    var location_data = locationValue.toString();
    if (location_data === "{}") {
        var locationCookie = getCookie("EPAHWBIDISC");
        if (locationCookie !== "") {
            location_data = locationCookie;
        }
        else {
            return "";
        }
    }
    show('mainpage', 'homepage');
    
    $('#community-snapshot-tab-link').trigger("click");
    
    var location = JSON.parse(location_data);
    var data_url = "/hwbi/disc/rest/indicators/scores/?county=" + location.county + "&state_abbr=" + location.state_abbr;
    $.ajax({
        url: data_url,
        type: "GET",
        beforeSend: function () {
            $('#search_button').addClass('searching');
            $('#search_error_notification').hide();
        },
        success: function (data, status, xhr) {
            locationValue = location;
            setScoreData(data);
            $('#customize_location').html(location.county + " County, " + location.state);
            hwbi_disc_data = JSON.parse(data);
            setCookie('EPAHWBIDISC', location_data, 0.5);
            $(window).scrollTop(0);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#search_error_notification').show();
        },
        complete: function (jqXHR, textStatus) {
            $('#search_button').removeClass('searching');
            return false;
        }
    });
}

// initializeAutocomplete: Initializes google maps search places function with a restriction to only us locations.
function initializeAutocomplete() {
    /* var input = document.getElementById('search_field');
    searchBox = new google.maps.places.Autocomplete(input, {
        types: ['(regions)'],
        componentRestrictions: {country: 'us'}
    });
    // searchBox.setComponentRestrictions({'country': ['us']});
    searchBox.addListener('place_changed', setLocationValue); */

    var pac_input = document.getElementById('search_field');

    (function pacSelectFirst(input) {
        // store the original event binding function
        var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

        function addEventListenerWrapper(type, listener) {
            // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
            // and then trigger the original listener.
            if (type == "keydown") {
                var orig_listener = listener;
                listener = function(event) {
                    var suggestion_selected = $(".pac-item-selected").length > 0;
                    if (event.keyCode == 13 && !suggestion_selected) {
                        var simulated_downarrow = $.Event("keydown", {
                            keyCode: 40,
                            which: 40
                        });
                        orig_listener.apply(input, [simulated_downarrow]);
                    }

                    orig_listener.apply(input, [event]);
                };
            }

            _addEventListener.apply(input, [type, listener]);
        }

        input.addEventListener = addEventListenerWrapper;
        input.attachEvent = addEventListenerWrapper;

        searchBox = new google.maps.places.Autocomplete(input, {
            types: ['(regions)'],
            componentRestrictions: {country: 'us'}
        });
        searchBox.addListener('place_changed', setLocationValue);

    })(pac_input);
    $('#search_field').keypress(function(event){
        if (event.keyCode === 13) 
            event.preventDefault();
    });
}

function setLocationValue() {
    console.log("setLocationValue called");
    var place = searchBox.getPlace();
    var location = parsePlaceResponse(place);
    locationValue = JSON.stringify(location);

    $('#community-snapshot-tab').hide();
    $('.preload-wrapper, .preload').show();

    getScoreData();

    $('#search_field').val('');
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setAccordion() {
    for (acc_i = 0; acc_i < acc.length; acc_i++) {
        acc[acc_i].addEventListener("click", function() {
                var closingPanel = $(this).hasClass("active");
                $('.domain-description').map(function() {
                    this.style.display = "none";
                });
                $('.domain-expand').map(function () {
                    $(this).removeClass("active");
                });

                var panel = $(this.parentNode).find('.domain-description')[0];
                if (closingPanel) {
                    panel.style.display = "none";
                    $(this).removeClass("active");
                    $('html, body').animate({
                        scrollTop: $('.content-wrapper').offset().top
                    }, 400);
                } else {
                    panel.style.display = "block";
                    $(this).addClass("active");
                    if(!$(this).parent().is('#nature-block')) {
                        $('html, body').animate({
                        scrollTop: $('.domain-score-block').offset().top
                    }, 300);
                }
                }
            });

    }
}

function loadSkillbar() {
    console.log("LoadSkillBar called");
    $('.domain-score-bar').each(function () {
        $(this).find('.score-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 800);
    });

    $('.returnlink').removeClass('hide');
}

// function generateReport() {
//
//     var reportDoc = new PDFDocument();
//     var stream = reportDoc.pipe(blobStream());
//
//     // reportDoc.fontSize(25).text('Testing pdf report txt input', 100, 80);
//     // Report items get appended to reportDoc before reportDoc.end();
//     //var epaLogo = getImageCanvasDataURL(document.getElementsByClassName('site-logo').item(0));
//     // reportDoc.image(epaLogo, 0, 15);
//     var epaLogo = createTestCanvas();
//     var epaURL = epaLogo.toDataURL("image/jpeg");
//
//     reportDoc.image(epaURL, 0, 15);
//
//     reportDoc.end();
//     var saveData = (function () {
//         var a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         return function (blob, fileName) {
//             var url = window.URL.createObjectURL(blob);
//             a.href = url;
//             a.download = fileName;
//             a.target = "_black";
//             a.click();
//             setTimeout(function () {
//                 document.body.removeChild(a);
//                 window.URL.revokeObjectURL(url);
//             }, 300);
//             return false;
//         };
//     }());
//
//     stream.on('finish', function () {
//         var blob = stream.toBlob('application/pdf');
//         saveData(blob, "DISC-report.pdf");
//     });
// }
//
// function createTestCanvas(){
//     var canvas = document.createElement('canvas');
//     canvas.width = 300;
//     canvas.height = 150;
//     document.body.appendChild(canvas);
//     var ctx = canvas.getContext("2d");
//     var imgUrl = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
//     var image = new Image();
//     image.addEventListener("load", function(){
//         ctx.drawImage(image, 0, 0);
//     }, false);
//     // ctx.drawImage(image, 0, 0);
//     image.src = imgUrl;
//     return canvas;
// }

function getImageCanvasDataURL(imageEle) {
    var canvas = document.createElement('canvas');
    canvas.height = 150;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var image = new Image();

    // setTimeout(ctx.drawImage(image, 0, 0), 600);
    image.crossOrigin = "Anonymous";
    image.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
    // image.onload = function() {
    //     ctx.drawImage(this, 0, 0);
    // };
    // var image = document.createElement("img");

    // image.crossOrigin = 'Anonymous';
    // image.src = imageEle.src;
    //
    // canvas.width = imageEle.width;
    // canvas.height = imageEle.height;
    // image.onload = function(){
    //     ctx.drawImage(image, 0, 0);
    // };

    //image.src = imageEle.src;
    return canvas;
}

function displayIndicatorInformation() {
    var title = $(this).html().replace(':', '');
    var description = $(this).parent().attr('data-title');
    var domain = $(this).closest('.domain_indicator').attr('id');
    $('#' + domain + '_title').html(title);
    $('#' + domain + '_description').html(description);
    $('#' + domain + '_title > span').remove();
}

function round(number, precision) {
    var shift = function(number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true).toFixed(precision);
}

function countyStateSelectors() {
    var stateObject = {};
    $.getJSON('/static_qed/hwbi/disc/js/statecounty.json', function (data) {
        $.each(data, function(index, val) {
            stateObject[index] = val;
        });
        var stateSel = document.querySelector(".stateSel");
        var countySel = document.querySelector(".countySel");
        for (var state in stateObject) {
            stateSel.options[stateSel.options.length] = new Option(state, state);
        }
         stateSel.onchange = function () {
             countySel.length = 1; // remove all options bar first
             if (this.selectedIndex < 1) return; // done
             for (var county in stateObject[this.value]) {
                 countySel.options[countySel.options.length] = new Option(stateObject[this.value][county], stateObject[this.value][county]);
            }
        };
    });
    var stateAbbr;
    $.getJSON('/static_qed/hwbi/disc/js/statestateabbr.json', function (data) {
        stateAbbr = data;
    });
    //on county selection, send ajax POST call sending state and county name to server
    $('.countySel').change(function () {
        var stateVal = $('.stateSel').val();
        var countyVal = $('.countySel').val();
        locationValue = JSON.stringify({
            "state": stateVal,
            "county": countyVal,
            "state_abbr" : stateAbbr[stateVal]
        });
        $('#community-snapshot-tab').hide();
        $('.preload-wrapper, .preload').show();
        getScoreData();
    });
}

function mainpageCountyStateSelectors() {
    var stateObject = {};
    $.getJSON('/static_qed/hwbi/disc/js/statecounty.json', function (data) {
        $.each(data, function(index, val) {
            stateObject[index] = val;
        });
        var stateSel = document.querySelector(".stateSel-2");
        var countySel = document.querySelector(".countySel-2");
        for (var state in stateObject) {
            stateSel.options[stateSel.options.length] = new Option(state, state);
        }
         stateSel.onchange = function () {
             countySel.length = 1; // remove all options bar first
             if (this.selectedIndex < 1) return; // done
             for (var county in stateObject[this.value]) {
                 countySel.options[countySel.options.length] = new Option(stateObject[this.value][county], stateObject[this.value][county]);
            }
        };
    });
    var stateAbbr;
    $.getJSON('/static_qed/hwbi/disc/js/statestateabbr.json', function (data) {
        stateAbbr = data;
    });
    //on county selection, send ajax POST call sending state and county name to server
    $('.countySel-2').change(function () {
        var stateVal = $('.stateSel-2').val();
        var countyVal = $('.countySel-2').val();
        locationValue = JSON.stringify({
            "state": stateVal,
            "county": countyVal,
            "state_abbr" : stateAbbr[stateVal]
        });
        $('#community-snapshot-tab').hide();
        $('.preload-wrapper, .preload').show();
        getScoreData();
    });
}

function toast(msg) {
    var x = document.getElementById("toast");

    x.className = "show";
    x.innerHTML = msg;

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    return false;
}

function priorityText() {
    var x = document.getElementById("priorityexplanation");
    
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function serviceText() {
    var x = document.getElementById("service-explanation");
    
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function parsePlaceResponse(place) {
    var county = '';
    var state = '';
    var state_abbr = '';
    for (var i = 0; i < place.address_components.length; i++) {
        switch (place.address_components[i].types[0]) {
            case "administrative_area_level_1":
                state = place.address_components[i].long_name;
                state_abbr = place.address_components[i].short_name;
                break;
            case "administrative_area_level_2":
                county = place.address_components[i].long_name.replace(" County", "");
                break;
        }
    }
    if (state === '' || state_abbr === '') {
        return toast("Unable to find location. Please try another!");
    } else if (county === '') {
        return toast("Unable to find county for specified address. Please try another!");
    }
    var location = {};
    location["county"] = county;
    location["state"] = state;
    location["state_abbr"] = state_abbr;
    return location;
}

function newDISC() {
    var sum = 0;
    var avg = 0;
    var d = 0;
    $('.updateddomain').each(function() {
        sum+=parseFloat($(this).text()) || 0;
        if ($(this).text() != 0) {
            d++;
        }
    });
    avg = sum / d;
    $('#report-wellbeing-score-new').html(round(avg, 1));
};

function domainChange() {
    var baseline = 0;
    var update = 0;

    $('.report-domains').each(function() {
        baseline = parseFloat($(this).find('.baselinedomain').text());
        update = parseFloat($(this).find('.updateddomain').text());
        console.log(baseline);
        console.log(update);

        if (baseline > update) {
            $(':nth-child(8)', this).html("⮟");
        }
        else if (baseline < update) {
            $(':nth-child(8)', this).html("⮝");
        }

    });

};

function indicatorChange() {
    var base = 0;
    var upd = 0;

    $('tr').each(function() {
        base = parseFloat($(this).find('.baselineindicator').text());
        upd = parseFloat($(this).find('.updatedindicator').text());

        if (base > upd) {
            if ($(this).hasClass('report-domains')) {
                $('td:nth-child(5)', this).html("⮟")
            }
            else {
            $('td:nth-child(4)', this).html("⮟");
            }
        }
        
        else if (base < upd) {
            if ($(this).hasClass('report-domains')) {
                $('td:nth-child(5)', this).html("⮝")
            }
            else {
            $('td:nth-child(4)', this).html("⮝");
            }
        }

    });

};

// initializeTopAutocomplete: Initializes google maps search places function with a restriction to only us locations.
function initializeTopAutocomplete() {
    var pac_input = document.getElementById('top-search-bar');

    (function pacSelectFirst(input) {
        // store the original event binding function
        var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

        function addEventListenerWrapper(type, listener) {
            // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
            // and then trigger the original listener.
            if (type == "keydown") {
                var orig_listener = listener;
                listener = function(event) {
                    var suggestion_selected = $(".pac-item-selected").length > 0;
                    if (event.keyCode == 13 && !suggestion_selected) {
                        var simulated_downarrow = $.Event("keydown", {
                            keyCode: 40,
                            which: 40
                        });
                        orig_listener.apply(input, [simulated_downarrow]);
                    }

                    orig_listener.apply(input, [event]);
                };
            }

            _addEventListener.apply(input, [type, listener]);
        }

        input.addEventListener = addEventListenerWrapper;
        input.attachEvent = addEventListenerWrapper;

        topSearchBox = new google.maps.places.Autocomplete(input, {
            types: ['(regions)'],
            componentRestrictions: {country: 'us'}
        });
        topSearchBox.addListener('place_changed', setTopLocationValue);

    })(pac_input);
    $('#top-search-bar').keypress(function(event){
        if (event.keyCode === 13) 
            event.preventDefault();
    });
}

function setTopLocationValue() {
    console.log("setTopLocationValue called");
    var place = topSearchBox.getPlace();
    var location = parsePlaceResponse(place);
    locationValue = JSON.stringify(location);

    $('#community-snapshot-tab').hide();
    $('.preload-wrapper, .preload').show();

    getScoreData();

    $('#top-search-bar').val('');
}

/**
 * Resets the specified node values to the original value.
 * @param {object} node - The initial node to reset.
 * @param {string} typeToReset - The data type to reset. custom_val || scenario_val
 * @param {string} baselineValue - String containing the new baseline to load. custom_val || original_val
 * @function
 */
function resetValues(node, typeToReset, baselineValue) {
    if (node.hasOwnProperty(typeToReset)) {
        node[typeToReset] = node[baselineValue];
    }
	
	if (node.hasOwnProperty("children") && node.children) {
		node.children.forEach( child => {
			resetValues(child, typeToReset, baselineValue);
		});
	}
}

/**
 * Resets specified slider values to the original values
 * @param {object} startNode - The node to reset
 * @param {string} valueType - A string containing the data type to reset. custom_val || scenario_val
 * @param {string} sliderType - A string contianing the type of slider to reset. customize-hwbi-metrics || customize-service-metrics || scenario-builder-metric
 * @function
 */
function resetSliders(startNode, valueType, sliderType) {
    for (let metricName in startNode) {
        const metric = startNode[metricName];
        const ele = document.querySelector(`[data-var="${metric.id}"].${sliderType}`);
        if (ele.value !== metric[valueType]) {
            ele.value = metric[valueType];
            
            updateSliderLabel(ele);
        }
    }
}

/**
 * Resets specified slider values to the original values. Travels down tree and resets all children
 * @param {object} startNode - The starting node to reset all children of
 * @param {string} valueType - A string containing the data type to reset. custom_val || scenario_val
 * @param {string} sliderType - A string contianing the type of slider to reset. customize-hwbi-metrics || customize-service-metrics || scenario-builder-metric
 * @function
 */
function resetSlidersRecursive(startNode, valueType, sliderType) {
    if (startNode.hasOwnProperty("children") && startNode.children.length) {
        startNode.children.forEach(child => {
            resetSlidersRecursive(child, valueType, sliderType);
        });
    } else {
        const ele = document.querySelector(`[data-var="${startNode.id}"].${sliderType}`);
        ele.value = startNode[valueType];

        updateSliderLabel(ele);
    }
}

/**
 * Updates the label of a metric slider with the appropriote value
 * @param {HTMLElement} ele - The HTML Element that needs its label updated
 * @function
 */
function updateSliderLabel(ele) {
    const sign = ele.dataset.sign;
    const units = ele.dataset.units;
    let val = 0;
    let roundValue = 2;

    if (sign === "P") {
        val = (+ele.value * (+ele.dataset.max - +ele.dataset.min)) + +ele.dataset.min;
    } else if (sign === "N") {
        val = -1 * ((+ele.value - 1) * (+ele.dataset.max - +ele.dataset.min)) + +ele.dataset.min;
    }

    if (units.toLowerCase().trim() === "percent" && ele.classList.contains('customize-hwbi-metrics')) {
        val *= 100;
        roundValue = 1;
    }

    if (units.toLowerCase().trim() === "dollars") {
        roundValue = 2;
    }
    if (units) {
        ele.previousElementSibling.innerHTML = "<span> " + round(val, roundValue) + " (" + units + ")</span>";
    } else {
        ele.previousElementSibling.innerHTML = "<span> " + round(val, roundValue) + "</span>";
    }
  }

/**
 * Updates the apex charts with the type of value specified. 
 * @param {string} ele - A string containing the value type. original_val || custom_val || scenario_val
 * @function
 */
function updateApexCharts(valueType) {
    econChart.updateSeries([round(dataStructure.METRIC_GROUP["2"][valueType] * 100, 1)]);
    ecoChart.updateSeries([round(dataStructure.METRIC_GROUP["3"][valueType] * 100, 1)]);
    socialChart.updateSeries([round(dataStructure.METRIC_GROUP["4"][valueType] * 100, 1)]);
}

/**
 * Resets the RIV's to 1
 * @function
 */
function resetRivs() {
    for (let node in dataStructure.HWBI_DOMAIN) {
        let domain = dataStructure.HWBI_DOMAIN[node];
        domain.weight = 1;
        document.querySelector(`.rankinglist input[name="${slugify(domain.name)}-rank-number"]`).value = 1;
    }
}

/**
 * Updates the ranking donut, the HWBI Domain scores, sets the score data, calculates the Service HWBI domain scores, and updates the aster plot
 * @function
 */
function updateRivUi() {
    const location = JSON.parse(locationValue);

    initializeRankingDonut();
    updateAllWeightedAvgValues('METRIC_GROUP', 'custom_val', dataStructure); // calculate the metric group scores by averaging each metric group's child domains
    setScoreData(location.state_abbr, location.county, "custom_val"); // set the domain scores
    calculateServiceHWBI();
    runAsterPlot();
  }

const donut = donutChart()
  .width(540)
  .height(300)
  .transTime(250) // length of transitions in ms
  .cornerRadius(3) // sets how rounded the corners are on each slice
  .padAngle(0.015) // effectively dictates the gap between slices
  .variable('weight')
  .category('domain');

/**
 * Initialized the ranking donut with the domain name and weights in the datastructure
 * @function
 */
function initializeRankingDonut() {
  let data = [];
  for (let domain in dataStructure.HWBI_DOMAIN) {
    data.push({
      domain: dataStructure.HWBI_DOMAIN[domain].name,
      weight: dataStructure.HWBI_DOMAIN[domain].weight	
    });
  }

  donut.data(data);

  if (!$('#ranking-chart svg').length) {
    d3.select('#ranking-chart')
      .call(donut); // draw chart in div
  }
}
