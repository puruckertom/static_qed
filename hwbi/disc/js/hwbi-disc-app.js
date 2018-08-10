// Div list that all contain the quote class
var quoteDivs = document.getElementsByClassName('quote');
var quoteIndex = 0;
var acc = document.getElementsByClassName("accordion");
var acc_i;
var searchBox;
var compareSearchBox = [];
var locationValue = '{}';
var active_domain;
var hwbi_disc_data;
var hwbi_indicator_data;
var hwbi_indicator_value_adjusted = {};

var discDomains = {
    "built environment" : {
        hwbi : [],
        crsi : [
            "communication infrastructure",
            "housing characteristics",
            "transportation infrastructure",
            "utility infrastructure",
            "vacant structures"
        ]
    },
    "community involvement" : {
        hwbi : [
            "attitudes towards others and the community",
            "democratic engagement",
            "family bonding",
            "social engagement",
            "social support"
        ],
        crsi : []
    },
    "education" : {
        hwbi : [
            "basic educational knowledge and skills",
            "participation and attainment",
            "social, emotional and developmental aspects"
        ],
        crsi : []
    },
    "environmental resource management" : {
        hwbi : [],
        crsi : [
            "condition",
            "extent of ecosystem types"
        ]
    },
    "local economy" : {
        hwbi : [
            "basic necessities",
            "wealth",
            "work"
        ],
        crsi : [
            "economic diversity",
            "socio-economics"
        ]
    },
    "hazard vulnerability" : {
        hwbi : [],
        crsi : [
            "exposure",
            "loss"
        ]
    },
    "health" : {
        hwbi : [
            "healthcare",
            "life expectancy and mortality",
            "lifestyle and behavior",
            "personal well-being"
        ],
        crsi : [
            "health characteristics",
            "social services"
        ]
    },
    "resilience planning" : {
        hwbi : [],
        crsi : [
            "community preparedness",
            "natural resource conservation",
            "personal preparedness"
        ]
    },
    "local culture" : {
        hwbi : [
            "activity participation",
            "biophilia",
            "time spent",
            "working age adults"
        ],
        crsi : []
    },
    "safety and security" : {
        hwbi : [
            "actual safety",
            "perceived safety",
            "risk"
        ],
        crsi : []
    },
};

$(document).ready(function () {

    initializeTabs();

    // fix for Firefox UIf
    $('#community-snapshot-tab-link').trigger("click");
    $('#about-tab-link').trigger("click");

    // Run cycleQuote after 500ms delay on page load.
    setTimeout(cycleQuote, 500);
    setTimeout(loadPage, 600);

    // Snapshot body
    setAccordion();
    setRankSliders();
    setTimeout(getScoreData, 600);
    $('#report_pdf').on("click", generateReport);
    $('#rank_btn').on("click", toggleRank);
    $('#rank-exit').on("click", function () {
        $('#rank-window').hide();
    });
    $('.rank-slider').on("slidestop", calculateScore);

    // Customize body
    $('.domain-icon').on('click', selectDomain);

    // Comparison body
    $('.add-community').on('click', addComparison);
    $('.close-compare-search').on('click', removeComparison);
    $('.compare-search-button').on('click', getComparisonData);
    $('.indicator_data-title').on('mouseover', displayIndicatorInformation);

    // County and state selection search
    countyStateSelectors();
});

function initializeGoogleMaps() {
    google.maps.event.addDomListener(window, 'load', initializeAutocomplete);
    google.maps.event.addDomListener(window, 'load', initializeComparisonAutocomplete);
}

function setSearchBlock(selectedTab) {
    $(".selected-tab").map(function () {
        $(this).removeClass('selected-tab');
    });
    $(selectedTab).closest("li").addClass('selected-tab');
    if (selectedTab.hash === "#about-tab") {
        $('#search_block').removeClass('search_block');
        $('#search_block').addClass('about_search');
        $('#report_pdf').hide();
        $('#hwbi-intro').show();
    }
    else {
        $('#search_block').addClass('search_block');
        $('#search_block').removeClass('about_search');
        $('#report_pdf').show();
        $('#hwbi-intro').hide();
    }
}

function loadPage() {
    $('#disc-tabs').css("opacity", 100);
    $(window.location.hash + "-link").trigger("click");
}

function initializeTabs() {
    $('#disc-tabs').tabs({
        active: 0,
        beforeActivate: function (event, ui) {
            setSearchBlock(event.currentTarget);
        }
    });
}

function toggleSearchType(e) {
    e.preventDefault();
    $('#statecounty').toggle();
    $('#search_form').toggle();
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
    $('#community-snapshot-tab-link').trigger("click");
    var location = JSON.parse(location_data);
    var data_url = "/hwbi/disc/rest/scores?state=" + location.state + "&county=" + location.county + "&state_abbr=" + location.state_abbr;
    $.ajax({
        url: data_url,
        type: "GET",
        beforeSend: function () {
            $('#search_button').addClass('searching');
            $('#search_error_notification').hide();
        },
        success: function (data, status, xhr) {
            console.log("getScoreData success: " + status);
            locationValue = location;
            // zeroScoreData();
            setScoreData(data);
            setCompareData(data, 0);
            displayCompareData(JSON.parse(sessionStorage.getItem("compareCommunities")).length);
            $('#customize_location').html(location.county + " County, " + location.state);
            hwbi_disc_data = JSON.parse(data);
            setTimeout(getIndicatorData, 1200);
            hwbi_indicator_value_adjusted = {};
            setCookie('EPAHWBIDISC', location_data, 0.5);
            $('html, body').animate({
                scrollTop: $('#disc-tabs').offset().top
            }, 'slow');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("getScoreData error: " + errorThrown);
            $('#search_error_notification').show();
        },
        complete: function (jqXHR, textStatus) {
            console.log("getScoreData complete: " + textStatus);
            $('#search_button').removeClass('searching');
            return false;
        }
    });
}

// cycleQuote: continuously cycles through the divs on the page which have the quote class.
function cycleQuote() {
    var currentQuote = $(quoteDivs).eq(quoteIndex);
    $(currentQuote).fadeIn(1200);
    currentQuote.delay(4000);
    $(currentQuote).fadeOut(1200, cycleQuote);
    currentQuote.delay(1200);
    quoteIndex = ++quoteIndex % quoteDivs.length;
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
    
}

function setLocationValue() {
    console.log("setLocationValue called");
    console.log(document.getElementById('search_field').value);
    var place = searchBox.getPlace();
    var county = '';
    var state = '';
    var stateAbbr = '';
    for (var i = 0; i < place.address_components.length; i++) {
        switch (place.address_components[i].types[0]) {
            case "administrative_area_level_1":
                state = place.address_components[i].long_name;
                stateAbbr = place.address_components[i].short_name;
                break;
            case "administrative_area_level_2":
                county = place.address_components[i].long_name.replace(" County", "");
                break;
        }
    }

    if (state === '' || county === '' || stateAbbr === '') {
        console.log("invalid entry")

        return toast("Unable to find location. Please try another!");
    }
    var json_value = {};
    json_value["county"] = county;
    json_value["state"] = state;
    json_value["state_abbr"] = stateAbbr;
    locationValue = JSON.stringify(json_value);

    getScoreData();
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

function setScoreData(data) {
    data = JSON.parse(data);
    document.getElementById('score_indicator_span').style.transform = "rotate(0deg) skew(45deg, -45deg)";
    // Set location info
    $('#location').html("Snapshot results for:<br>" + data.inputs[1].value + " County, " + data.inputs[0].value);
    // $('#wellbeing-score-location').html("Nation: " + data.outputs.nationhwbi.toFixed(1) + ", State: " +
    //     data.outputs.statehwbi.toFixed(1));

    // Set location score
    var score = round(data.outputs.hwbi, 1);
    $('#wellbeing-score').html(score);
    document.getElementById('score_indicator_span').style.transform = "rotate(" + Math.round(score * 90 / 50) + "deg) skew(45deg, -45deg)";

    // Set Domain scores
    var environment_score = round(data.outputs.domains[0].score, 1);
    $('#environment_score').html(environment_score);
    $('#environment_score_bar').attr('data-percent', environment_score + "%");
    //$('#environment_location').html("[Nation: " + round(data.outputs.domains[0].nationScore, 1) +
    //    ", State: " + data.outputs.domains[0].stateScore.toFixed(1) + "]");

    var community_score = round(data.outputs.domains[1].score, 1);
    $('#community_score').html(community_score);
    $('#community_score_bar').attr('data-percent', community_score + "%");
    // $('#community_location').html("[Nation: " + round(data.outputs.domains[1].nationScore, 1) +
    //     ", State: " + data.outputs.domains[1].stateScore.toFixed(1) + "]");
    
    var education_score = round(data.outputs.domains[2].score, 1);
    $('#education_score').html(education_score);
    $('#education_score_bar').attr('data-percent', education_score + "%");
    // $('#education_location').html("[Nation: " + round(data.outputs.domains[2].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[2].stateScore, 1) + "]");
    
    var health_score = round(data.outputs.domains[3].score, 1);
    $('#health_score').html(health_score);
    $('#health_score_bar').attr('data-percent', health_score + "%");
    // $('#health_location').html("[Nation: " + round(data.outputs.domains[3].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[3].stateScore, 1) + "]");
    
    var resourceMgmt_score = round(data.outputs.domains[4].score, 1);
    $('#resource-mgmt_score').html(resourceMgmt_score);
    $('#resource-mgmt_score_bar').attr('data-percent', resourceMgmt_score + "%");
    // $('#resource-mgmt_location').html("[Nation: " + round(data.outputs.domains[4].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[4].stateScore, 1) + "]");
    
    var hazard_score = round(data.outputs.domains[5].score, 1);
    $('#hazard_score').html(hazard_score);
    $('#hazard_score_bar').attr('data-percent', hazard_score + "%");
    // $('#hazard_location').html("[Nation: " + round(data.outputs.domains[5].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[5].stateScore, 1) + "]");
    
    var economy_score = round(data.outputs.domains[6].score, 1);
    $('#economy_score').html(economy_score);
    $('#economy_score_bar').attr('data-percent', economy_score + "%");
    // $('#economy_location').html("[Nation: " + round(data.outputs.domains[6].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[6].stateScore, 1) + "]");
    
    var resilience_score = round(data.outputs.domains[7].score, 1);
    $('#resilience_score').html(resilience_score);
    $('#resilience_score_bar').attr('data-percent', resilience_score + "%");
    // $('#resilience_location').html("[Nation: " + round(data.outputs.domains[7].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[7].stateScore, 1) + "]");
    
    var culture_score = round(data.outputs.domains[8].score, 1);
    $('#culture_score').html(culture_score);
    $('#culture_score_bar').attr('data-percent', culture_score + "%");
    // $('#culture_location').html("[Nation: " + round(data.outputs.domains[8].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[8].stateScore, 1) + "]");
    
    var safety_score = round(data.outputs.domains[9].score, 1);
    $('#safety_score').html(safety_score);
    $('#safety_score_bar').attr('data-percent', safety_score + "%");
    // $('#safety_location').html("[Nation: " + round(data.outputs.domains[9].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[9].stateScore, 1) + "]");   

    setTimeout(loadSkillbar, 600);
}

function setAccordion() {
    for (acc_i = 0; acc_i < acc.length; acc_i++) {
        acc[acc_i].addEventListener("click", function () {
                var closingPanel = $(this).hasClass("active");
                $('.domain-description').map(function () {
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
                        scrollTop: $('#disc-tabs').offset().top
                    }, 400);
                } else {
                    panel.style.display = "block";
                    $(this).addClass("active");
                    $('html, body').animate({
                        scrollTop: $(this).offset().top
                    }, 300);
                }
            }
        );
    }
}

function loadSkillbar() {
    console.log("LoadSkillBar called");
    $('.domain-score-bar').each(function () {
        $(this).find('.score-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 800);
    });
}

function setRankSliders() {
    var sliderOptions = {
        animate: "fast",
        max: 5,
        min: 1,
        orientation: "horizontal",
        step: .1
    };
    $('#environment-slider-bar').slider(sliderOptions);
    $('#community-slider-bar').slider(sliderOptions);
    $('#education-slider-bar').slider(sliderOptions);
    $('#health-slider-bar').slider(sliderOptions);
    $('#resource-mgmt-slider-bar').slider(sliderOptions);
    $('#hazard-slider-bar').slider(sliderOptions);
    $('#economy-slider-bar').slider(sliderOptions);
    $('#resilience-slider-bar').slider(sliderOptions);
    $('#culture-slider-bar').slider(sliderOptions);
    $('#safety-slider-bar').slider(sliderOptions);
}

function toggleRank() {
    var rWindow = $('.slider-block');
    rWindow.map(function () {
        if ($(this).is(':visible')) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });
}

function calculateScore() {
    var weights = document.getElementsByClassName('rank-slider');
    var totalWeightArray = $(weights).map(function () {
        return $(this).slider("value");
    });
    var totalWeight = totalWeightArray.toArray().reduce(sumArray);

    var environmentScore = hwbi_disc_data["outputs"]["domains"][0]["score"];
    var environmentWeight = $('#environment-slider-bar').slider("value");
    var adjustedEnvironmentScore = environmentScore * environmentWeight;
    
    var communityScore = hwbi_disc_data["outputs"]["domains"][1]["score"];
    var communityWeight = $('#community-slider-bar').slider("value");
    var adjustedCommunityScore = communityScore * communityWeight;
    
    var educationScore = hwbi_disc_data["outputs"]["domains"][2]["score"];
    var educationWeight = $('#education-slider-bar').slider("value");
    var adjustedEducationScore = educationScore * educationWeight;
    
    var healthScore = hwbi_disc_data["outputs"]["domains"][3]["score"];
    var healthWeight = $('#health-slider-bar').slider("value");
    var adjustedHealthScore = healthScore * healthWeight;

    var resourceMgmtScore = hwbi_disc_data["outputs"]["domains"][4]["score"];
    var resourceMgmtWeight = $('#resource-mgmt-slider-bar').slider("value");
    var adjustedResourceMgmtScore = resourceMgmtScore * resourceMgmtWeight;
    
    var hazardScore = hwbi_disc_data["outputs"]["domains"][5]["score"];
    var hazardWeight = $('#hazard-slider-bar').slider("value");
    var adjustedHazardScore = hazardScore * hazardWeight;
    
    var economyScore = hwbi_disc_data["outputs"]["domains"][6]["score"];
    var economyWeight = $('#economy-slider-bar').slider("value");
    var adjustedEconomyScore = economyScore * economyWeight;

    var resilienceScore = hwbi_disc_data["outputs"]["domains"][7]["score"];
    var resilienceWeight = $('#resilience-slider-bar').slider("value");
    var adjustedResilienceScore = resilienceScore * resilienceWeight;

    var cultureScore = hwbi_disc_data["outputs"]["domains"][8]["score"];
    var cultureWeight = $('#culture-slider-bar').slider("value");
    var adjustedCultureScore = cultureScore * cultureWeight;

    var safetyScore = hwbi_disc_data["outputs"]["domains"][9]["score"];
    var safetyWeight = $('#safety-slider-bar').slider("value");
    var adjustedSafetyScore = safetyScore * safetyWeight;
    
    var totalScore = adjustedEnvironmentScore + adjustedEducationScore + adjustedHealthScore + adjustedResilienceScore + 
    adjustedCommunityScore + adjustedResourceMgmtScore + adjustedSafetyScore + adjustedHazardScore + adjustedEconomyScore + adjustedCultureScore;

    var newScore = totalScore / totalWeight;
    $('#wellbeing-score').html(newScore.toFixed(1));
    document.getElementById('score_indicator_span').style.transform = "rotate(" + Math.round(newScore * 90 / 50) + "deg) skew(45deg, -45deg)";
}

function sumArray(total, num) {
    return total + num;
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

function getDataUri(url, callback) {
    var image = document.createElement("img");

    image.crossOrigin = 'Anonymous';
    image.src = url;
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // // Get raw image data
        //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };
}

function selectDomain() {
    if (hwbi_disc_data === undefined) {
        return false;
    }
    $('#customize_domain_score').show();
    $('#customize_domain_arrow').show();
    $('#customize_domain_bar').show();
    $('#customize_domain_indicators').show();
    var domains = $('.domain-icon');
    $(domains).map(function () {
        $(this).removeClass("domain-selected");
    });
    $(this).addClass("domain-selected");
    var domainID = $(this).attr('id');
    active_domain = domainID;
    var domainScore = $(hwbi_disc_data['outputs']['domains']).map(function () {
        if (this['domainID'] === domainID) {
            return this['score'];
        }
    });
    if (!(hwbi_indicator_value_adjusted.hasOwnProperty(domainID))) {
        hwbi_indicator_value_adjusted[domainID] = domainScore[0];
    }
    var domainScoreRounded = Math.round(domainScore[0]);
    var adjustedScoreRounded = Math.round(hwbi_indicator_value_adjusted[domainID]);
    $('#arrow_initial').css("left", domainScoreRounded + "%");
    $('#score_initial').html(domainScore[0].toFixed(1));
    $('#score_initial').css("left", domainScoreRounded + "%");
    $('#arrow_adjusted').css("left", adjustedScoreRounded + "%");
    $('#score_adjusted').html(hwbi_indicator_value_adjusted[domainID].toFixed(1));
    $('#score_adjusted').css("left", adjustedScoreRounded + "%");

    $('#customize_domain_details').html(getDomainDescription(domainID) +
        "<br>Move a slider left or right to change the indicator score to describe your community better. Mouse over an indicator to learn more about it.");
    showDomainIndicators(domainID);
}

function getDomainDescription(domainID) {
    if (domainID === "environment") {
        return "Indicators for the Connection to Nature domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "community") {
        return "Indicators for the Cultural Fulfillment domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Education") {
        return "Indicators for the Education domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Health") {
        return "Indicators for the Health domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "resource-mgmt") {
        return "Indicators for the Leisure Time domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "hazard") {
        return "Indicators for the Living Standards domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "economy") {
        return "Indicators for the Safety and Security domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "resilience") {
        return "Indicators for the Social Cohesion domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "culture") {
        return "Indicators for the Social Cohesion domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "safety") {
        return "Indicators for the Social Cohesion domain<br>Info from Smith, et al. 2012<br>"
    }
    else {
        return "Ah Oh! Unable to find domain."
    }
}

function showDomainIndicators(domainID) {
    $('.domain_indicator').map(function () {
        $(this).hide();
    });
    if (domainID === "environment") {
        $('#environment_indicators').show();
    }
    else if (domainID === "community") {
        $('#community_indicators').show();
    }
    else if (domainID === "Education") {
        $('#education_indicators').show();
    }
    else if (domainID === "Health") {
        $('#health_indicators').show();
    }
    else if (domainID === "resource-mgmt") {
        $('#resource-mgmt_indicators').show();
    }
    else if (domainID === "hazard") {
        $('#hazard_indicators').show();
    }
    else if (domainID === "economy") {
        $('#economy_indicators').show();
    }
    else if (domainID === "resilience") {
        $('#resilience_indicators').show();
    }
    else if (domainID === "culture") {
        $('#culture_indicators').show();
    }
    else if (domainID === "safety") {
        $('#safety_indicators').show();
    }
}

function getIndicatorData() {
    var location = locationValue;
    $.ajax({
        type: 'GET',
        url: "/hwbi/disc/rest/indicators/scores?county=" + location.county + "&state_abbr=" + location.state_abbr,
        success: function (data, status, xhr) {
            hwbi_indicator_data = JSON.parse(data);
            setIndicatorSliders();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("getScoreData error: " + errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("getScoreData complete: " + textStatus);
            return false;
        }
    });

}

function setIndicatorSliders() {
    var cap = 25;
    $('.domain_indicator').hide(); // Hide domains
    $('.domain-icon').removeClass("domain-selected"); // De-select domain of indicator sliders
    $('#customize_domain_details').html(''); // Clear details
    $('#customize_domain_score').hide(); // Hide domain score bar
    var environment_communication = hwbi_indicator_data.outputs["communication infrastructure"].score.toFixed(2);
    $('#environment_communication_value').html(environment_communication);
    $('#environment_communication_slider').slider({
        min: 0,
        max: 100,
        value: environment_communication,
        slide: function (event, ui) {
            $('#environment_communication_value').html(ui.value);
            calculateNewScore("environment", "#environment_indicators");
        }
    });
    var environment_housing = hwbi_indicator_data.outputs["housing characteristics"].score.toFixed(2);
    $('#environment_housing_value').html(environment_housing);
    $('#environment_housing_slider').slider({
        min: 0,
        max: 100,
        value: environment_housing,
        slide: function (event, ui) {
            $('#environment_housing_value').html(ui.value);
            calculateNewScore("environment", "#environment_indicators");
        }
    });
    var environment_transportation = hwbi_indicator_data.outputs["transportation infrastructure"].score.toFixed(2);
    $('#environment_transportation_value').html(environment_transportation);
    $('#environment_transportation_slider').slider({
        min: 0,
        max: 100,
        value: environment_transportation,
        slide: function (event, ui) {
            $('#environment_transportation_value').html(ui.value);
            calculateNewScore("environment", "#environment_indicators");
        }
    });
    var environment_utility = hwbi_indicator_data.outputs["utility infrastructure"].score.toFixed(2);
    $('#environment_utility_value').html(environment_utility);
    $('#environment_utility_slider').slider({
        min: 0,
        max: 100,
        value: environment_utility,
        slide: function (event, ui) {
            $('#environment_utility_value').html(ui.value);
            calculateNewScore("environment", "#environment_indicators");

        }
    });
    var environment_vacant = hwbi_indicator_data.outputs["vacant structures"].score.toFixed(2);
    $('#environment_vacant_value').html(environment_vacant);
    $('#environment_vacant_slider').slider({
        min: 0,
        max: 100,
        value: environment_vacant,
        slide: function (event, ui) {
            $('#environment_vacant_value').html(ui.value);
            calculateNewScore("environment", "#environment_indicators");

        }
    });
    var community_attitude = (hwbi_indicator_data.outputs["attitude toward others and the community"].score).toFixed(2);
    $('#community_attitude_value').html(community_attitude);
    $('#community_attitude_slider').slider({
        min: 0,
        max: 100,
        value: community_attitude,
        slide: function (event, ui) {
            $('#community_attitude_value').html(ui.value);
            calculateNewScore("community", "#community_indicators");
        }
    });
    var community_democratic = (hwbi_indicator_data.outputs["democratic engagement"].score).toFixed(2);
    $('#community_democratic_value').html(community_democratic);
    $('#community_democratic_slider').slider({
        min: 0,
        max: 100,
        value: community_democratic,
        slide: function (event, ui) {
            $('#community_democratic_value').html(ui.value);
            calculateNewScore("community", "#community_indicators");
        }
    });
    var community_family = (hwbi_indicator_data.outputs["family bonding"].score).toFixed(2);
    $('#community_family_value').html(community_family);
    $('#community_family_slider').slider({
        min: 0,
        max: 100,
        value: community_family,
        slide: function (event, ui) {
            $('#community_family_value').html(ui.value);
            calculateNewScore("community", "#community_indicators");
        }
    });
    var community_social_eng = (hwbi_indicator_data.outputs["social engagement"].score).toFixed(2);
    $('#community_social_eng_value').html(community_social_eng);
    $('#community_social_eng_slider').slider({
        min: 0,
        max: 100,
        value: community_social_eng,
        slide: function (event, ui) {
            $('#community_social_eng_value').html(ui.value);
            calculateNewScore("community", "#community_indicators");
        }
    });
    var community_support = (hwbi_indicator_data.outputs["social support"].score).toFixed(2);
    $('#community_support_value').html(community_support);
    $('#community_support_slider').slider({
        min: 0,
        max: 100,
        value: community_support,
        slide: function (event, ui) {
            $('#community_support_value').html(ui.value);
            calculateNewScore("community", "#community_indicators");
        }
    });
    var education_knowledge = (hwbi_indicator_data.outputs["basic educational knowledge and skills of youth"].score).toFixed(2);
    $('#education_knowledge_value').html(education_knowledge);
    $('#education_knowledge_slider').slider({
        min: 0,
        max: 100,
        value: education_knowledge,
        slide: function (event, ui) {
            $('#education_knowledge_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    var education_participation = (hwbi_indicator_data.outputs["social, emotional and developmental aspects"].score).toFixed(2);
    $('#education_participation_value').html(education_participation);
    $('#education_participation_slider').slider({
        min: 0,
        max: 100,
        value: education_participation,
        slide: function (event, ui) {
            $('#education_participation_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    var education_social = (hwbi_indicator_data.outputs["participation and attainment"].score).toFixed(2);
    $('#education_social_value').html(education_social);
    $('#education_social_slider').slider({
        min: 0,
        max: 100,
        value: education_social,
        slide: function (event, ui) {
            $('#education_social_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    var health_healthcare = (hwbi_indicator_data.outputs["healthcare"].score).toFixed(2);
    $('#health_healthcare_value').html(health_healthcare);
    $('#health_healthcare_slider').slider({
        min: 0,
        max: 100,
        value: health_healthcare,
        slide: function (event, ui) {
            $('#health_healthcare_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_life_exp = (hwbi_indicator_data.outputs["life expectancy and mortality"].score).toFixed(2);
    $('#health_life_expectancy_value').html(health_life_exp);
    $('#health_life_expectancy_slider').slider({
        min: 0,
        max: 100,
        value: health_life_exp,
        slide: function (event, ui) {
            $('#health_life_expectancy_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_lifestyle = (hwbi_indicator_data.outputs["lifestyle and behavior"].score).toFixed(2);
    $('#health_lifestyle_value').html(health_lifestyle);
    $('#health_lifestyle_slider').slider({
        min: 0,
        max: 100,
        value: health_lifestyle,
        slide: function (event, ui) {
            $('#health_lifestyle_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_personal = (hwbi_indicator_data.outputs["personal well-being"].score).toFixed(2);
    $('#health_personal_value').html(health_personal);
    $('#health_personal_slider').slider({
        min: 0,
        max: 100,
        value: health_personal,
        slide: function (event, ui) {
            $('#health_personal_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_services = (hwbi_indicator_data.outputs["social services"].score).toFixed(2);
    $('#health_services_value').html(health_services);
    $('#health_services_slider').slider({
        min: 0,
        max: 100,
        value: health_services,
        slide: function (event, ui) {
            $('#health_services_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_characteristics = (hwbi_indicator_data.outputs["health characteristics"].score).toFixed(2);
    $('#health_characteristics_value').html(health_characteristics);
    $('#health_characteristics_slider').slider({
        min: 0,
        max: 100,
        value: health_characteristics,
        slide: function (event, ui) {
            $('#health_characteristics_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var resource_mgmt_condition = (hwbi_indicator_data.outputs["condition"].score).toFixed(2);
    $('#resource-mgmt_condition_value').html(resource_mgmt_condition);
    $('#resource-mgmt_condition_slider').slider({
        min: 0,
        max: 100,
        value: resource_mgmt_condition,
        slide: function (event, ui) {
            $('#resource-mgmt_condition_value').html(ui.value);
            calculateNewScore("resource-mgmt", "#resource-mgmt_indicators");
        }
    });
    var resource_mgmt_ecosystem = (hwbi_indicator_data.outputs["extent of ecosystem types"].score).toFixed(2);
    $('#resource-mgmt_ecosystem_value').html(resource_mgmt_ecosystem);
    $('#resource-mgmt_ecosystem_slider').slider({
        min: 0,
        max: 100,
        value: resource_mgmt_ecosystem,
        slide: function (event, ui) {
            $('#resource-mgmt_ecosystem_value').html(ui.value);
            calculateNewScore("resource-mgmt", "#resource-mgmt_indicators");
        }
    });
    var hazard_exposure = (hwbi_indicator_data.outputs["exposure"].score).toFixed(2);
    $('#hazard_exposure_value').html(hazard_exposure);
    $('#hazard_exposure_slider').slider({
        min: 0,
        max: 100,
        value: hazard_exposure,
        slide: function (event, ui) {
            if (ui.value > +hazard_exposure + cap || ui.value < +hazard_exposure - cap) {
                return false;
            }
            $('#hazard_exposure_value').html(ui.value);
            calculateNewScore("hazard", "#hazard_indicators");
        }
    });
    var hazard_loss = (hwbi_indicator_data.outputs["loss"].score).toFixed(2);
    $('#hazard_loss_value').html(hazard_loss);
    $('#hazard_loss_slider').slider({
        min: 0,
        max: 100,
        value: hazard_loss,
        slide: function (event, ui) {
            if (ui.value > +hazard_loss + cap || ui.value < +hazard_loss - cap) {
                return false;
            }
            $('#hazard_loss_value').html(ui.value);
            calculateNewScore("hazard", "#hazard_indicators");
        }
    });
    var economy_necessities = (hwbi_indicator_data.outputs["basic necessities"].score).toFixed(2);
    $('#economy_necessities_value').html(economy_necessities);
    $('#economy_necessities_slider').slider({
        min: 0,
        max: 100,
        value: economy_necessities,
        slide: function (event, ui) {
            $('#economy_necessities_value').html(ui.value);
            calculateNewScore("economy", "#economy_indicators");
        }
    });
    var economy_diversity = (hwbi_indicator_data.outputs["economic diversity"].score).toFixed(2);
    $('#economy_diversity_value').html(economy_diversity);
    $('#economy_diversity_slider').slider({
        min: 0,
        max: 100,
        value: economy_diversity,
        slide: function (event, ui) {
            $('#economy_diversity_value').html(ui.value);
            calculateNewScore("economy", "#economy_indicators");
        }
    });
    var economy_socio = (hwbi_indicator_data.outputs["socio-economics"].score).toFixed(2);
    $('#economy_socio_value').html(economy_socio);
    $('#economy_socio_slider').slider({
        min: 0,
        max: 100,
        value: economy_socio,
        slide: function (event, ui) {
            $('#economy_socio_value').html(ui.value);
            calculateNewScore("economy", "#economy_indicators");
        }
    });
    var economy_wealth = (hwbi_indicator_data.outputs["wealth"].score).toFixed(2);
    $('#economy_wealth_value').html(economy_wealth);
    $('#economy_wealth_slider').slider({
        min: 0,
        max: 100,
        value: economy_wealth,
        slide: function (event, ui) {
            $('#economy_wealth_value').html(ui.value);
            calculateNewScore("economy", "#economy_indicators");
        }
    });
    var economy_work = (hwbi_indicator_data.outputs["work"].score).toFixed(2);
    $('#economy_work_value').html(economy_work);
    $('#economy_work_slider').slider({
        min: 0,
        max: 100,
        value: economy_work,
        slide: function (event, ui) {
            $('#economy_work_value').html(ui.value);
            calculateNewScore("economy", "#economy_indicators");
        }
    });
    var resilience_community = (hwbi_indicator_data.outputs["community preparedness"].score).toFixed(2);
    $('#resilience_community_value').html(resilience_community);
    $('#resilience_community_slider').slider({
        min: 0,
        max: 100,
        value: resilience_community,
        slide: function (event, ui) {
            $('#resilience_community_value').html(ui.value);
            calculateNewScore("resilience", "#resilience_indicators");
        }
    });
    var resilience_conservation = (hwbi_indicator_data.outputs["natural resource conservation"].score).toFixed(2);
    $('#resilience_conservation_value').html(resilience_conservation);
    $('#resilience_conservation_slider').slider({
        min: 0,
        max: 100,
        value: resilience_conservation,
        slide: function (event, ui) {
            $('#resilience_conservation_value').html(ui.value);
            calculateNewScore("resilience", "#resilience_indicators");
        }
    });
    var resilience_personal = (hwbi_indicator_data.outputs["personal preparedness"].score).toFixed(2);
    $('#resilience_personal_value').html(resilience_personal);
    $('#resilience_personal_slider').slider({
        min: 0,
        max: 100,
        value: resilience_personal,
        slide: function (event, ui) {
            $('#resilience_personal_value').html(ui.value);
            calculateNewScore("resilience", "#resilience_indicators");
        }
    });
    var culture_activity = (hwbi_indicator_data.outputs["activity participation"].score).toFixed(2);
    $('#culture_activity_value').html(culture_activity);
    $('#culture_activity_slider').slider({
        min: 0,
        max: 100,
        value: culture_activity,
        slide: function (event, ui) {
            $('#culture_activity_value').html(ui.value);
            calculateNewScore("culture", "#culture_indicators");
        }
    });
    var culture_biophilia = (hwbi_indicator_data.outputs["biophilia"].score).toFixed(2);
    $('#culture_biophilia_value').html(culture_biophilia);
    $('#culture_biophilia_slider').slider({
        min: 0,
        max: 100,
        value: culture_biophilia,
        slide: function (event, ui) {
            $('#culture_biophilia_value').html(ui.value);
            calculateNewScore("culture", "#culture_indicators");
        }
    });
    var culture_time = (hwbi_indicator_data.outputs["time spent"].score).toFixed(2);
    $('#culture_time_value').html(culture_time);
    $('#culture_time_slider').slider({
        min: 0,
        max: 100,
        value: culture_time,
        slide: function (event, ui) {
            $('#culture_time_value').html(ui.value);
            calculateNewScore("culture", "#culture_indicators");
        }
    });
    var culture_adults = (hwbi_indicator_data.outputs["working age adults"].score).toFixed(2);
    $('#culture_adults_value').html(culture_adults);
    $('#culture_adults_slider').slider({
        min: 0,
        max: 100,
        value: culture_adults,
        slide: function (event, ui) {
            $('#culture_adults_value').html(ui.value);
            calculateNewScore("culture", "#culture_indicators");
        }
    });
    var safety_actual = (hwbi_indicator_data.outputs["actual safety"].score).toFixed(2);
    $('#safety_actual_value').html(safety_actual);
    $('#safety_actual_slider').slider({
        min: 0,
        max: 100,
        value: safety_actual,
        slide: function (event, ui) {
            $('#safety_actual_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");

        }
    });
    var safety_perceived = (hwbi_indicator_data.outputs["perceived safety"].score).toFixed(2);
    $('#safety_perceived_value').html(safety_perceived);
    $('#safety_perceived_slider').slider({
        min: 0,
        max: 100,
        value: safety_perceived,
        slide: function (event, ui) {
            $('#safety_perceived_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");
        }
    });
    var safety_risk = (hwbi_indicator_data.outputs["risk"].score).toFixed(2);
    $('#safety_risk_value').html(safety_risk);
    $('#safety_risk_slider').slider({
        min: 0,
        max: 100,
        value: safety_risk,
        slide: function (event, ui) {
            $('#safety_risk_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");
        }
    });
}

function calculateNewScore(domainID, domainBlock) {
    var domain = $(domainBlock + " .indicator_value");
    var scores = $(domain).map(function () {
        return Number($(this).html());
    });
    var total = scores.toArray().reduce(sumArray);
    var scoreCount = scores.toArray().length;
    var newScore = total / scoreCount;
    hwbi_indicator_value_adjusted[domainID] = newScore;
    var adjustedScoreRounded = Math.round(newScore);
    $('#arrow_adjusted').css("left", adjustedScoreRounded + "%");
    $('#score_adjusted').html(hwbi_indicator_value_adjusted[domainID].toFixed(1));
    $('#score_adjusted').css("left", adjustedScoreRounded + "%");
    
}

function setCompareData(data, columnNumber) {
    data = JSON.parse(data);

    var compareCommunities = JSON.parse(sessionStorage.getItem("compareCommunities"));
    if (!compareCommunities) {
        compareCommunities = [];
    }

    if (compareCommunities.length >= 3) {
        return; // don't allow more than three comparisons
    }

    var community = {};

    community.location = data["inputs"][1]["value"] + " County, " + data["inputs"][0]["value"];
    for (var i = 0; i < compareCommunities.length; i++) {
        if (community.location === compareCommunities[i].location) { // check for duplicates
            return "dupe"; // don't add the duplicate
        }
    }
    community.score = data["outputs"]["hwbi"].toFixed(1);
    community.environment_score = data["outputs"]["domains"][0]["score"].toFixed(1);
    community.community_score = data["outputs"]["domains"][1]["score"].toFixed(1);
    community.education_score = data["outputs"]["domains"][2]["score"].toFixed(1);
    community.health_score = data["outputs"]["domains"][3]["score"].toFixed(1);
    community.resource_mgmt_score = data["outputs"]["domains"][4]["score"].toFixed(1);
    community.hazard_score = data["outputs"]["domains"][5]["score"].toFixed(1);
    community.economy_score = data["outputs"]["domains"][6]["score"].toFixed(1);
    community.resilience_score = data["outputs"]["domains"][7]["score"].toFixed(1);
    community.culture_score = data["outputs"]["domains"][8]["score"].toFixed(1);
    community.safety_score = data["outputs"]["domains"][9]["score"].toFixed(1);

    compareCommunities.push(community);
    sessionStorage.setItem('compareCommunities', JSON.stringify(compareCommunities));
}

function displayCompareData() {
    var compareCommunities = JSON.parse(sessionStorage.getItem("compareCommunities"));

    for (var i = 0; i < compareCommunities.length; i++) {
        var community = compareCommunities[i];

        $('#community-button-' + i).hide();
        $('#community-close-button-' + i).show();
        $('#community-button-' + (+i + 1))
            .prop('disabled', false)
            .removeClass('button-disabled');

        $('#community-location-' + i).html(community.location);
        $('#compare-score-' + i).html(community.score);
        $('#compare-environment-' + i).html(community.environment_score);
        $('#compare-community-' + i).html(community.community_score);
        $('#compare-education-' + i).html(community.education_score);
        $('#compare-health-' + i).html(community.health_score);
        $('#compare-resource-mgmt-' + i).html(community.resource_mgmt_score);
        $('#compare-hazard-' + i).html(community.hazard_score);
        $('#compare-economy-' + i).html(community.economy_score);
        $('#compare-resilience-' + i).html(community.resilience_score);
        $('#compare-culture-' + i).html(community.culture_score);
        $('#compare-safety-' + i).html(community.safety_score);
    }
}

function clearComparisonData(columnNumber) {
    var compareCommunities = JSON.parse(sessionStorage.getItem("compareCommunities"));
    compareCommunities.splice(columnNumber, 1);
    sessionStorage.setItem('compareCommunities', JSON.stringify(compareCommunities));
}

function clearComparisonDisplay() {
    var compareCommunities = JSON.parse(sessionStorage.getItem("compareCommunities"));
    for (var i = 0; i < compareCommunities.length; i++) {
        $('#community-button-' + i).show();
        $('#community-button-' + (+i + 1))
            .prop('disabled', true)
            .addClass('button-disabled');
        $('#community-close-button-' + i).hide();

        $('#community-location-' + i).empty();
        $('#compare-score-' + i).empty();
        $('#compare-environment-' + i).empty();
        $('#compare-community-' + i).empty();
        $('#compare-education-' + i).empty();
        $('#compare-health-' + i).empty();
        $('#compare-resource-mgmt-' + i).empty();
        $('#compare-hazard-' + i).empty();
        $('#compare-economy-' + i).empty();
        $('#compare-resilience-' + i).empty();
        $('#compare-culture-' + i).empty();
        $('#compare-safety-' + i).empty();
    }
}

$(document).click(function (e)
{
    var searchcontainer = $(".add-community-search");
    var autocomplete = $(".compare-search-input");
    var button = $(".add-community");

    if (!searchcontainer.is(e.target) && !button.is(e.target) // if the target of the click isn't the container or button
        && searchcontainer.has(e.target).length === 0) // nor a descendant of the container
    {
        searchcontainer.hide();
    }
});

function addComparison() {
    $me = $(this);
    var communityNumber = $me.attr('data-community');
    $('#compare-search-' + communityNumber).parent().toggle();
}

function removeComparison() {
    $me = $(this);
    var communityNumber = +$me.attr('data-community');
    clearComparisonDisplay();
    clearComparisonData(communityNumber);
    displayCompareData();
}

function getComparisonData() {
    var communityNumber = +$(this).attr('data-community'); // get the community number
    var place = compareSearchBox[communityNumber].getPlace();
    var county = place.address_components[1]['long_name'].replace(" County", "");
    var state = place.address_components[2]['long_name'];
    var state_abbr = place.address_components[2]['short_name'];
    var location = {};
    location["county"] = county;
    location["state"] = state;
    var data_url = "/hwbi/disc/rest/scores?state=" + state + "&county=" + county + "&state_abbr=" + state_abbr;
    $.ajax({ // get score data
        url: data_url,
        type: "GET",
        beforeSend: function () {
            $('.compare-search-button').eq(communityNumber).addClass('searching');
            $('.compare-search-error').hide();
        },
        success: function (data, status, xhr) {
            console.log("getComparisonData success: " + status);
            if (setCompareData(data, communityNumber) !== "dupe") {
                $('.add-community-search').eq(communityNumber).hide();
            } else {
                $('.compare-search-error').eq(communityNumber).html('This community has already been added. Please try another location.').show();
            }
            displayCompareData();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("getComparisonData error: " + errorThrown);
            $('.compare-search-error').eq(communityNumber).html('Your search could not be completed. Please try another location.').show();
        },
        complete: function (jqXHR, textStatus) {
            console.log("getComparisonData complete: " + textStatus);
            $('.compare-search-button').eq(communityNumber).removeClass('searching');
            return false;
        }
    });
}

// initializeComparisonAutocomplete: Initializes google maps search places function with a restriction to only us locations.
function initializeComparisonAutocomplete() {
    var compareInputs = document.getElementsByClassName('compare-search-input');
    for (var i = 0; i < compareInputs.length; i++) {
        input = compareInputs[i];
        compareSearchBox[i] = new google.maps.places.Autocomplete(input, {
            types: ['(regions)'],
            componentRestriction: {country: 'us'}
        });
    }
}

function displayIndicatorInformation() {
    var title = $(this).html().replace(':', '');
    var description = $(this).parent().attr('data-title');
    var domain = $(this).closest('.domain_indicator').attr('id');
    $('#' + domain + '_title').html(title);
    $('#' + domain + '_description').html(description);
}

function round(number, precision) {
    var shift = function(number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
}

function countyStateSelectors() {
    var stateObject = {};
    $.getJSON('/static_qed/hwbi/disc/js/statecounty.json', function (data) {
        $.each(data, function(index, val) {
            stateObject[index] = val;
        });
        var stateSel = document.getElementById("stateSel");
        var countySel = document.getElementById("countySel");
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
        console.log(data);
        stateAbbr = data;
    });
    //on county selection, send ajax POST call sending state and county name to server
    $('#countySel').change(function () {
        var stateVal = $('#stateSel').val();
        var countyVal = $('#countySel').val();
        locationValue = JSON.stringify({
            "state": stateVal,
            "county": countyVal,
            "state_abbr" : stateAbbr[stateVal]
        });
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
