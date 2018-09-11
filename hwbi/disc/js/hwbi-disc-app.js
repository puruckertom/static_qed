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
var disc_indicator_changes = {};

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
            // zeroScoreData();
            var indicatorData = data;
            data = JSON.stringify(formatDomainData(JSON.parse(data)));
            setScoreData(data);
            setCompareData(data, 0);
            displayCompareData(JSON.parse(sessionStorage.getItem("compareCommunities")).length);
            $('#customize_location').html(location.county + " County, " + location.state);
            hwbi_disc_data = JSON.parse(data);
            hwbi_indicator_data = formatIndicatorData(setIndicatorData(indicatorData));
            setIndicatorSliders(); // set sliders 
            hwbi_indicator_value_adjusted = {};
            setCookie('EPAHWBIDISC', location_data, 0.5);
            $('html, body').animate({
                scrollTop: $('#disc-tabs').offset().top
            }, 'slow');
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
    $('#reportlocation').html("Report for " + data.inputs[1].value + " County, " + data.inputs[0].value);

    // $('#wellbeing-score-location').html("Nation: " + data.outputs.nationhwbi.toFixed(1) + ", State: " +
    //     data.outputs.statehwbi.toFixed(1));

    // Set location score
    var score = round(data.outputs.hwbi, 1);
    $('#wellbeing-score').html(score);
    document.getElementById('score_indicator_span').style.transform = "rotate(" + Math.round(score * 90 / 50) + "deg) skew(45deg, -45deg)";
    $('#report-wellbeing-score').html(score);

    // Set Domain scores
    var environment_score = round(data.outputs.domains[0].score, 1);
    $('#environment_score').html(environment_score);
    $('#environment_score_bar').attr('data-percent', environment_score + "%");
    //$('#environment_location').html("[Nation: " + round(data.outputs.domains[0].nationScore, 1) +
    //    ", State: " + data.outputs.domains[0].stateScore.toFixed(1) + "]");
    $('#environment_score_summary').html(environment_score);

    var community_score = round(data.outputs.domains[1].score, 1);
    $('#community_score').html(community_score);
    $('#community_score_bar').attr('data-percent', community_score + "%");
    // $('#community_location').html("[Nation: " + round(data.outputs.domains[1].nationScore, 1) +
    //     ", State: " + data.outputs.domains[1].stateScore.toFixed(1) + "]");
    $('#community_score_summary').html(community_score);

    var education_score = round(data.outputs.domains[2].score, 1);
    $('#education_score').html(education_score);
    $('#education_score_bar').attr('data-percent', education_score + "%");
    // $('#education_location').html("[Nation: " + round(data.outputs.domains[2].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[2].stateScore, 1) + "]");
    $('#education_score_summary').html(education_score);

    var health_score = round(data.outputs.domains[3].score, 1);
    $('#health_score').html(health_score);
    $('#health_score_bar').attr('data-percent', health_score + "%");
    // $('#health_location').html("[Nation: " + round(data.outputs.domains[3].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[3].stateScore, 1) + "]");
    $('#health_score_summary').html(health_score);

    var resourceMgmt_score = round(data.outputs.domains[4].score, 1);
    $('#resource-mgmt_score').html(resourceMgmt_score);
    $('#resource-mgmt_score_bar').attr('data-percent', resourceMgmt_score + "%");
    // $('#resource-mgmt_location').html("[Nation: " + round(data.outputs.domains[4].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[4].stateScore, 1) + "]");
    $('#resource-mgmt_score_summary').html(resourceMgmt_score);

    var hazard_score = round(data.outputs.domains[5].score, 1);
    $('#hazard_score').html(hazard_score);
    $('#hazard_score_bar').attr('data-percent', hazard_score + "%");
    // $('#hazard_location').html("[Nation: " + round(data.outputs.domains[5].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[5].stateScore, 1) + "]");
    $('#hazard_score_summary').html(hazard_score);

    var economy_score = round(data.outputs.domains[6].score, 1);
    $('#economy_score').html(economy_score);
    $('#economy_score_bar').attr('data-percent', economy_score + "%");
    // $('#economy_location').html("[Nation: " + round(data.outputs.domains[6].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[6].stateScore, 1) + "]");
    $('#economy_score_summary').html(economy_score);

    var resilience_score = round(data.outputs.domains[7].score, 1);
    $('#resilience_score').html(resilience_score);
    $('#resilience_score_bar').attr('data-percent', resilience_score + "%");
    // $('#resilience_location').html("[Nation: " + round(data.outputs.domains[7].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[7].stateScore, 1) + "]");
    $('#resilience_score_summary').html(resilience_score);

    var culture_score = round(data.outputs.domains[8].score, 1);
    $('#culture_score').html(culture_score);
    $('#culture_score_bar').attr('data-percent', culture_score + "%");
    // $('#culture_location').html("[Nation: " + round(data.outputs.domains[8].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[8].stateScore, 1) + "]");
    $('#culture_score_summary').html(culture_score);

    var safety_score = round(data.outputs.domains[9].score, 1);
    $('#safety_score').html(safety_score);
    $('#safety_score_bar').attr('data-percent', safety_score + "%");
    // $('#safety_location').html("[Nation: " + round(data.outputs.domains[9].nationScore, 1) +
    //     ", State: " + round(data.outputs.domains[9].stateScore, 1) + "]");   
    $('#safety_score_summary').html(safety_score);

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
    hwbi_disc_data["outputs"]["domains"][0]["weight"] = environmentWeight;
    var adjustedEnvironmentScore = environmentScore * environmentWeight;
    
    var communityScore = hwbi_disc_data["outputs"]["domains"][1]["score"];
    var communityWeight = $('#community-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][1]["weight"] = communityWeight;
    var adjustedCommunityScore = communityScore * communityWeight;
    
    var educationScore = hwbi_disc_data["outputs"]["domains"][2]["score"];
    var educationWeight = $('#education-slider-bar').slider("value");
    var adjustedEducationScore = educationScore * educationWeight;
    hwbi_disc_data["outputs"]["domains"][2]["weight"] = educationWeight;
    var adjustedEducationScore = educationScore * educationWeight;
    
    var healthScore = hwbi_disc_data["outputs"]["domains"][3]["score"];
    var healthWeight = $('#health-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][3]["weight"] = healthWeight;
    var adjustedHealthScore = healthScore * healthWeight;

    var resourceMgmtScore = hwbi_disc_data["outputs"]["domains"][4]["score"];
    var resourceMgmtWeight = $('#resource-mgmt-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][4]["weight"] = resourceMgmtWeight;
    var adjustedResourceMgmtScore = resourceMgmtScore * resourceMgmtWeight;
    
    var hazardScore = hwbi_disc_data["outputs"]["domains"][5]["score"];
    var hazardWeight = $('#hazard-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][5]["weight"] = hazardWeight;
    var adjustedHazardScore = hazardScore * hazardWeight;
    
    var economyScore = hwbi_disc_data["outputs"]["domains"][6]["score"];
    var economyWeight = $('#economy-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][6]["weight"] = economyWeight;
    var adjustedEconomyScore = economyScore * economyWeight;

    var resilienceScore = hwbi_disc_data["outputs"]["domains"][7]["score"];
    var resilienceWeight = $('#resilience-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][7]["weight"] = resilienceWeight;
    var adjustedResilienceScore = resilienceScore * resilienceWeight;

    var cultureScore = hwbi_disc_data["outputs"]["domains"][8]["score"];
    var cultureWeight = $('#culture-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][8]["weight"] = cultureWeight;
    var adjustedCultureScore = cultureScore * cultureWeight;

    var safetyScore = hwbi_disc_data["outputs"]["domains"][9]["score"];
    var safetyWeight = $('#safety-slider-bar').slider("value");
    hwbi_disc_data["outputs"]["domains"][9]["weight"] = safetyWeight;
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

    // for (var indicator in hwbi_indicator_data.outputs) {
    //     console.log(indicator)
    //     var indicatorValue = round(hwbi_indicator_data.outputs[indicator].score, 0);
    //     var indicatorId = indicator.replace(/ /g,"_");
    //     console.log(indicatorValue)
    //     console.log(indicatorId)
    //     $('#' + indicatorId + '_value').html(indicatorValue);
    //     $('#' + indicatorId + '_slider').slider({
    //         min: 0,
    //         max: 100,
    //         value: indicatorValue,
    //         slide: function (event, ui) {
    //             $('#' + indicatorId + '_value').html(ui.value);
    //             disc_indicator_changes[""] = ui.value;
    //             calculateNewScore("environment", "#environment_indicators");
    //         }
    //     });
    // }

    // restore printable table change values and arrows to default
    $('.updatedindicator').html(''); // reset indicator changes
    $('#printable tbody .separator').html('-');
    $('.updateddomain').html(''); // reset domain changes
    $('.changed').html('-')

    var environment_communication = round(hwbi_indicator_data.outputs["communication infrastructure"].score, 0);
    $('#environment_communication_value').html(environment_communication);
    $('#environment_communication_slider').slider({
        min: 0,
        max: 100,
        value: environment_communication,
        slide: function (event, ui) {
            $('#environment_communication_value').html(ui.value);
            disc_indicator_changes["communication infrastructure"] = ui.value;
            calculateNewScore("environment", "#environment_indicators");
            $('#communication_infrastructure_adj').html(disc_indicator_changes["communication infrastructure"]);
        }
    });
    $('#communication_infrastructure').html(environment_communication);

    var environment_housing = round(hwbi_indicator_data.outputs["housing characteristics"].score, 0);
    $('#environment_housing_value').html(environment_housing);
    $('#environment_housing_slider').slider({
        min: 0,
        max: 100,
        value: environment_housing,
        slide: function (event, ui) {
            $('#environment_housing_value').html(ui.value);
            disc_indicator_changes["housing characteristics"] = ui.value;
            calculateNewScore("environment", "#environment_indicators");
            $('#housing_characteristics_adj').html(disc_indicator_changes["housing characteristics"]);

        }
    });
    $('#housing_characteristics').html(environment_housing);

    var environment_transportation = round(hwbi_indicator_data.outputs["transportation infrastructure"].score, 0);
    $('#environment_transportation_value').html(environment_transportation);
    $('#environment_transportation_slider').slider({
        min: 0,
        max: 100,
        value: environment_transportation,
        slide: function (event, ui) {
            $('#environment_transportation_value').html(ui.value);
            disc_indicator_changes["transportation infrastructure"] = ui.value;
            calculateNewScore("environment", "#environment_indicators");
            $('#transportation_infrastructure_adj').html(disc_indicator_changes["transportation infrastructure"]);

        }
    });
    $('#transportation_infrastructure').html(environment_transportation);

    var environment_utility = round(hwbi_indicator_data.outputs["utility infrastructure"].score, 0);
    $('#environment_utility_value').html(environment_utility);
    $('#environment_utility_slider').slider({
        min: 0,
        max: 100,
        value: environment_utility,
        slide: function (event, ui) {
            $('#environment_utility_value').html(ui.value);
            disc_indicator_changes["utility infrastructure"] = ui.value;
            calculateNewScore("environment", "#environment_indicators");
            $('#utility_infrastructure_adj').html(disc_indicator_changes["utility infrastructure"]);

        }
    });
    $('#utility_infrastructure').html(environment_utility);

    var environment_vacant = round(hwbi_indicator_data.outputs["vacant structures"].score, 0);
    $('#environment_vacant_value').html(environment_vacant);
    $('#environment_vacant_slider').slider({
        min: 0,
        max: 100,
        value: environment_vacant,
        slide: function (event, ui) {
            $('#environment_vacant_value').html(ui.value);
            disc_indicator_changes["vacant structures"] = ui.value;
            calculateNewScore("environment", "#environment_indicators");
            $('#vacant_structures_adj').html(disc_indicator_changes["vacant structures"]);

        }
    });
    $('#vacant_structures').html(environment_vacant);

    var community_attitude = round(hwbi_indicator_data.outputs["attitude toward others and the community"].score, 0);
    $('#community_attitude_value').html(community_attitude);
    $('#community_attitude_slider').slider({
        min: 0,
        max: 100,
        value: community_attitude,
        slide: function (event, ui) {
            $('#community_attitude_value').html(ui.value);
            disc_indicator_changes["attitude toward others and the community"] = ui.value;
            calculateNewScore("community", "#community_indicators");
            $('#attitude_adj').html(disc_indicator_changes["attitude toward others and the community"]);
        }
    });
    $('#attitudes').html(community_attitude);

    var community_democratic = round(hwbi_indicator_data.outputs["democratic engagement"].score, 0);
    $('#community_democratic_value').html(community_democratic);
    $('#community_democratic_slider').slider({
        min: 0,
        max: 100,
        value: community_democratic,
        slide: function (event, ui) {
            $('#community_democratic_value').html(ui.value);
            disc_indicator_changes["democratic engagement"] = ui.value;
            calculateNewScore("community", "#community_indicators");
            $('#democratic_engagement_adj').html(disc_indicator_changes["democratic engagement"]);
        }
    });
    $('#democratic_engagement').html(community_democratic);

    var community_family = round(hwbi_indicator_data.outputs["family bonding"].score, 0);
    $('#community_family_value').html(community_family);
    $('#community_family_slider').slider({
        min: 0,
        max: 100,
        value: community_family,
        slide: function (event, ui) {
            $('#community_family_value').html(ui.value);
            disc_indicator_changes["family bonding"] = ui.value;
            calculateNewScore("community", "#community_indicators");
            $('#family_bonding_adj').html(disc_indicator_changes["family bonding"]);
        }
    });
    $('#family_bonding').html(community_family);

    var community_social_eng = round(hwbi_indicator_data.outputs["social engagement"].score, 0);
    $('#community_social_eng_value').html(community_social_eng);
    $('#community_social_eng_slider').slider({
        min: 0,
        max: 100,
        value: community_social_eng,
        slide: function (event, ui) {
            $('#community_social_eng_value').html(ui.value);
            disc_indicator_changes["social engagement"] = ui.value;
            calculateNewScore("community", "#community_indicators");
            $('#social_engagement_adj').html(disc_indicator_changes["social engagement"]);
        }
    });
    $('#social_engagement').html(community_social_eng);

    var community_support = round(hwbi_indicator_data.outputs["social support"].score, 0);
    $('#community_support_value').html(community_support);
    $('#community_support_slider').slider({
        min: 0,
        max: 100,
        value: community_support,
        slide: function (event, ui) {
            $('#community_support_value').html(ui.value);
            disc_indicator_changes["social support"] = ui.value;
            calculateNewScore("community", "#community_indicators");
            $('#social_support_adj').html(disc_indicator_changes["social support"]);
        }
    });
    $('#social_support').html(community_support);

    var education_knowledge = round(hwbi_indicator_data.outputs["basic educational knowledge and skills of youth"].score, 0);
    $('#education_knowledge_value').html(education_knowledge);
    $('#education_knowledge_slider').slider({
        min: 0,
        max: 100,
        value: education_knowledge,
        slide: function (event, ui) {
            $('#education_knowledge_value').html(ui.value);
            disc_indicator_changes["basic educational knowledge and skills of youth"] = ui.value;
            calculateNewScore("Education", "#education_indicators");
            $('#educational_knowledge_adj').html(disc_indicator_changes["basic educational knowledge and skills of youth"]);
        }
    });
    $('#educational_knowledge').html(education_knowledge);

    var education_participation = round(hwbi_indicator_data.outputs["participation and attainment"].score, 0);
    $('#education_participation_value').html(education_participation);
    $('#education_participation_slider').slider({
        min: 0,
        max: 100,
        value: education_participation,
        slide: function (event, ui) {
            $('#education_participation_value').html(ui.value);
            disc_indicator_changes["participation and attainment"] = ui.value;
            calculateNewScore("Education", "#education_indicators");
            $('#participation_attainment_adj').html(disc_indicator_changes["participation and attainment"]);
        }
    });
    $('#participation_attainment').html(education_participation);

    var education_social = round(hwbi_indicator_data.outputs["social, emotional and developmental aspects"].score, 0);
    $('#education_social_value').html(education_social);
    $('#education_social_slider').slider({
        min: 0,
        max: 100,
        value: education_social,
        slide: function (event, ui) {
            $('#education_social_value').html(ui.value);
            disc_indicator_changes["social, emotional and developmental aspects"] = ui.value;
            calculateNewScore("Education", "#education_indicators");
            $('#social_emotional_developmental_adj').html(disc_indicator_changes["social, emotional and developmental aspects"]);
        }
    });
    $('#social_emotional_developmental').html(education_social);

    var health_healthcare = round(hwbi_indicator_data.outputs["healthcare"].score, 0);
    $('#health_healthcare_value').html(health_healthcare);
    $('#health_healthcare_slider').slider({
        min: 0,
        max: 100,
        value: health_healthcare,
        slide: function (event, ui) {
            $('#health_healthcare_value').html(ui.value);
            disc_indicator_changes["healthcare"] = ui.value;
            calculateNewScore("Health", "#health_indicators");
            $('#healthcare_adj').html(disc_indicator_changes["healthcare"]);
        }
    });
    $('#healthcare').html(health_healthcare);

    var health_life_exp = round(hwbi_indicator_data.outputs["life expectancy and mortality"].score, 0);
    $('#health_life_expectancy_value').html(health_life_exp);
    $('#health_life_expectancy_slider').slider({
        min: 0,
        max: 100,
        value: health_life_exp,
        slide: function (event, ui) {
            $('#health_life_expectancy_value').html(ui.value);
            disc_indicator_changes["life expectancy and mortality"] = ui.value;
            calculateNewScore("Health", "#health_indicators");
            $('#life_exp_adj').html(disc_indicator_changes["life expectancy and mortality"]);
        }
    });
    $('#life_exp').html(health_life_exp);

    var health_lifestyle = round(hwbi_indicator_data.outputs["lifestyle and behavior"].score, 0);
    $('#health_lifestyle_value').html(health_lifestyle);
    $('#health_lifestyle_slider').slider({
        min: 0,
        max: 100,
        value: health_lifestyle,
        slide: function (event, ui) {
            $('#health_lifestyle_value').html(ui.value);
            disc_indicator_changes["lifestyle and behavior"] = ui.value;
            calculateNewScore("Health", "#health_indicators");
            $('#lifestyle_behavior_adj').html(disc_indicator_changes["lifestyle and behavior"]);
        }
    });
    $('#lifestyle_behavior').html(health_lifestyle);

    var health_personal = round(hwbi_indicator_data.outputs["personal well-being"].score, 0);
    $('#health_personal_value').html(health_personal);
    $('#health_personal_slider').slider({
        min: 0,
        max: 100,
        value: health_personal,
        slide: function (event, ui) {
            $('#health_personal_value').html(ui.value);
            disc_indicator_changes["personal well-being"] = ui.value;
            calculateNewScore("Health", "#health_indicators");
            $('#personal_wellbeing_adj').html(disc_indicator_changes["personal well-being"]);
        }
    });
    $('#personal_wellbeing').html(health_personal);

    var health_services = round(hwbi_indicator_data.outputs["social services"].score, 0);
    $('#health_services_value').html(health_services);
    $('#health_services_slider').slider({
        min: 0,
        max: 100,
        value: health_services,
        slide: function (event, ui) {
            $('#health_services_value').html(ui.value);
            disc_indicator_changes["social services"] = ui.value;
            calculateNewScore("Health", "#health_indicators");
            $('#social_services_adj').html(disc_indicator_changes["social services"]);
        }
    });
    $('#social_services').html(health_services);

    var health_characteristics = round(hwbi_indicator_data.outputs["health characteristics"].score, 0);
    $('#health_characteristics_value').html(health_characteristics);
    $('#health_characteristics_slider').slider({
        min: 0,
        max: 100,
        value: health_characteristics,
        slide: function (event, ui) {
            $('#health_characteristics_value').html(ui.value);
            disc_indicator_changes["health characteristics"] = ui.value;
            calculateNewScore("Health", "#health_indicators");
            $('#health_characteristics_adj').html(disc_indicator_changes["health characteristics"]);
        }
    });
    $('#health_characteristics').html(health_characteristics);

    var resource_mgmt_condition = round(hwbi_indicator_data.outputs["condition"].score, 0);
    $('#resource-mgmt_condition_value').html(resource_mgmt_condition);
    $('#resource-mgmt_condition_slider').slider({
        min: 0,
        max: 100,
        value: resource_mgmt_condition,
        slide: function (event, ui) {
            $('#resource-mgmt_condition_value').html(ui.value);
            disc_indicator_changes["condition"] = ui.value;
            calculateNewScore("resource-mgmt", "#resource-mgmt_indicators");
            $('#condition_adj').html(disc_indicator_changes["condition"]);
        }
    });
    $('#condition').html(resource_mgmt_condition);

    var resource_mgmt_ecosystem = round(hwbi_indicator_data.outputs["extent of ecosystem types"].score, 0);
    $('#resource-mgmt_ecosystem_value').html(resource_mgmt_ecosystem);
    $('#resource-mgmt_ecosystem_slider').slider({
        min: 0,
        max: 100,
        value: resource_mgmt_ecosystem,
        slide: function (event, ui) {
            $('#resource-mgmt_ecosystem_value').html(ui.value);
            disc_indicator_changes["extent of ecosystem types"] = ui.value;
            calculateNewScore("resource-mgmt", "#resource-mgmt_indicators");
            $('#ecosystem_types_adj').html(disc_indicator_changes["extent of ecosystem types"]);
        }
    });
    $('#ecosystem_types').html(resource_mgmt_ecosystem);

    var hazard_exposure = round(hwbi_indicator_data.outputs["exposure"].score, 0);
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
            disc_indicator_changes["exposure"] = ui.value;
            calculateNewScore("hazard", "#hazard_indicators");
            $('#exposure_adj').html(disc_indicator_changes["exposure"]);
        }
    });
    $('#exposure').html(hazard_exposure);

    var hazard_loss = round(hwbi_indicator_data.outputs["loss"].score, 0);
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
            disc_indicator_changes["loss"] = ui.value;
            calculateNewScore("hazard", "#hazard_indicators");
            $('#loss_adj').html(disc_indicator_changes["loss"]);
        }
    });
    $('#loss').html(hazard_loss);

    var economy_necessities = round(hwbi_indicator_data.outputs["basic necessities"].score, 0);
    $('#economy_necessities_value').html(economy_necessities);
    $('#economy_necessities_slider').slider({
        min: 0,
        max: 100,
        value: economy_necessities,
        slide: function (event, ui) {
            $('#economy_necessities_value').html(ui.value);
            disc_indicator_changes["basic necessities"] = ui.value;
            calculateNewScore("economy", "#economy_indicators");
            $('#basic_necessities_adj').html(disc_indicator_changes["basic necessities"]);
        }
    });
    $('#basic_necessities').html(economy_necessities);

    var economy_diversity = round(hwbi_indicator_data.outputs["economic diversity"].score, 0);
    $('#economy_diversity_value').html(economy_diversity);
    $('#economy_diversity_slider').slider({
        min: 0,
        max: 100,
        value: economy_diversity,
        slide: function (event, ui) {
            $('#economy_diversity_value').html(ui.value);
            disc_indicator_changes["economic diversity"] = ui.value;
            calculateNewScore("economy", "#economy_indicators");
            $('#economic_diversity_adj').html(disc_indicator_changes["economic diversity"]);
        }
    });
    $('#economic_diversity').html(economy_diversity);
    
    var economy_socio = round(hwbi_indicator_data.outputs["socio-economics"].score, 0);
    $('#economy_socio_value').html(economy_socio);
    $('#economy_socio_slider').slider({
        min: 0,
        max: 100,
        value: economy_socio,
        slide: function (event, ui) {
            $('#economy_socio_value').html(ui.value);
            disc_indicator_changes["socio-economics"] = ui.value;
            calculateNewScore("economy", "#economy_indicators");
            $('#socio_economics_adj').html(disc_indicator_changes["socio-economics"]);
        }
    });
    $('#socio_economics').html(economy_socio);

    var economy_wealth = round(hwbi_indicator_data.outputs["wealth"].score, 0);
    $('#economy_wealth_value').html(economy_wealth);
    $('#economy_wealth_slider').slider({
        min: 0,
        max: 100,
        value: economy_wealth,
        slide: function (event, ui) {
            $('#economy_wealth_value').html(ui.value);
            disc_indicator_changes["wealth"] = ui.value;
            calculateNewScore("economy", "#economy_indicators");
            $('#wealth_adj').html(disc_indicator_changes["wealth"]);
        }
    });
    $('#wealth').html(economy_wealth);

    var economy_work = round(hwbi_indicator_data.outputs["work"].score, 0);
    $('#economy_work_value').html(economy_work);
    $('#economy_work_slider').slider({
        min: 0,
        max: 100,
        value: economy_work,
        slide: function (event, ui) {
            $('#economy_work_value').html(ui.value);
            disc_indicator_changes["work"] = ui.value;
            calculateNewScore("economy", "#economy_indicators");
            $('#work_adj').html(disc_indicator_changes["work"]);
        }
    });
    $('#work').html(economy_work);

    var resilience_community = round(hwbi_indicator_data.outputs["community preparedness"].score, 0);
    $('#resilience_community_value').html(resilience_community);
    $('#resilience_community_slider').slider({
        min: 0,
        max: 100,
        value: resilience_community,
        slide: function (event, ui) {
            $('#resilience_community_value').html(ui.value);
            disc_indicator_changes["community preparedness"] = ui.value;
            calculateNewScore("resilience", "#resilience_indicators");
            $('#community_preparedness_adj').html(disc_indicator_changes["community preparedness"]);
        }
    });
    $('#community_preparedness').html(resilience_community);

    var resilience_conservation = round(hwbi_indicator_data.outputs["natural resource conservation"].score, 0);
    $('#resilience_conservation_value').html(resilience_conservation);
    $('#resilience_conservation_slider').slider({
        min: 0,
        max: 100,
        value: resilience_conservation,
        slide: function (event, ui) {
            $('#resilience_conservation_value').html(ui.value);
            disc_indicator_changes["natural resource conservation"] = ui.value;
            calculateNewScore("resilience", "#resilience_indicators");
            $('#resource_conservation_adj').html(disc_indicator_changes["natural resource conservation"]);
        }
    });
    $('#resource_conservation').html(resilience_conservation);

    var resilience_personal = round(hwbi_indicator_data.outputs["personal preparedness"].score, 0);
    $('#resilience_personal_value').html(resilience_personal);
    $('#resilience_personal_slider').slider({
        min: 0,
        max: 100,
        value: resilience_personal,
        slide: function (event, ui) {
            $('#resilience_personal_value').html(ui.value);
            disc_indicator_changes["personal preparedness"] = ui.value;
            calculateNewScore("resilience", "#resilience_indicators");
            $('#personal_preparedness_adj').html(disc_indicator_changes["personal preparedness"]);
        }
    });
    $('#personal_preparedness').html(resilience_personal);

    var culture_activity = round(hwbi_indicator_data.outputs["activity participation"].score, 0);
    $('#culture_activity_value').html(culture_activity);
    $('#culture_activity_slider').slider({
        min: 0,
        max: 100,
        value: culture_activity,
        slide: function (event, ui) {
            $('#culture_activity_value').html(ui.value);
            disc_indicator_changes["activity participation"] = ui.value;
            calculateNewScore("culture", "#culture_indicators");
            $('#activity_participation_adj').html(disc_indicator_changes["activity participation"]);
        }
    });
    $('#activity_participation').html(culture_activity);

    var culture_biophilia = round(hwbi_indicator_data.outputs["biophilia"].score, 0);
    $('#culture_biophilia_value').html(culture_biophilia);
    $('#culture_biophilia_slider').slider({
        min: 0,
        max: 100,
        value: culture_biophilia,
        slide: function (event, ui) {
            $('#culture_biophilia_value').html(ui.value);
            disc_indicator_changes["biophilia"] = ui.value;
            calculateNewScore("culture", "#culture_indicators");
            $('#biophilia_adj').html(disc_indicator_changes["biophilia"]);
        }
    });
    $('#biophilia').html(culture_biophilia);

    var culture_time = round(hwbi_indicator_data.outputs["time spent"].score, 0);
    $('#culture_time_value').html(culture_time);
    $('#culture_time_slider').slider({
        min: 0,
        max: 100,
        value: culture_time,
        slide: function (event, ui) {
            $('#culture_time_value').html(ui.value);
            disc_indicator_changes["time spent"] = ui.value;
            calculateNewScore("culture", "#culture_indicators");
            $('#time_spent_adj').html(disc_indicator_changes["time spent"]);
        }
    });
    $('#time_spent').html(culture_time);

    var culture_adults = round(hwbi_indicator_data.outputs["working age adults"].score, 0);
    $('#culture_adults_value').html(culture_adults);
    $('#culture_adults_slider').slider({
        min: 0,
        max: 100,
        value: culture_adults,
        slide: function (event, ui) {
            $('#culture_adults_value').html(ui.value);
            disc_indicator_changes["working age adults"] = ui.value;
            calculateNewScore("culture", "#culture_indicators");
            $('#working_adults_adj').html(disc_indicator_changes["working age adults"]);
        }
    });
    $('#working_adults').html(culture_adults);

    var safety_actual = round(hwbi_indicator_data.outputs["actual safety"].score, 0);
    $('#safety_actual_value').html(safety_actual);
    $('#safety_actual_slider').slider({
        min: 0,
        max: 100,
        value: safety_actual,
        slide: function (event, ui) {
            $('#safety_actual_value').html(ui.value);
            disc_indicator_changes["actual safety"] = ui.value;
            calculateNewScore("Safety", "#safety_indicators");
            $('#actual_safety_adj').html(disc_indicator_changes["actual safety"]);
        }
    });
    $('#actual_safety').html(safety_actual);

    var safety_perceived = round(hwbi_indicator_data.outputs["perceived safety"].score, 0);
    $('#safety_perceived_value').html(safety_perceived);
    $('#safety_perceived_slider').slider({
        min: 0,
        max: 100,
        value: safety_perceived,
        slide: function (event, ui) {
            $('#safety_perceived_value').html(ui.value);
            disc_indicator_changes["perceived safety"] = ui.value;
            calculateNewScore("Safety", "#safety_indicators");
            $('#perceived_safety_adj').html(disc_indicator_changes["perceived safety"]);
        }
    });
    $('#perceived_safety').html(safety_perceived);

    var safety_risk = round(hwbi_indicator_data.outputs["risk"].score, 0);
    $('#safety_risk_value').html(safety_risk);
    $('#safety_risk_slider').slider({
        min: 0,
        max: 100,
        value: safety_risk,
        slide: function (event, ui) {
            $('#safety_risk_value').html(ui.value);
            disc_indicator_changes["risk"] = ui.value;
            calculateNewScore("Safety", "#safety_indicators");
            $('#risk_adj').html(disc_indicator_changes["risk"]);
        }
    });
    $('#risk').html(safety_risk);

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

    $('#environment_adj').html(round(hwbi_indicator_value_adjusted["environment"], 1));
    $('#community_adj').html(round(hwbi_indicator_value_adjusted["community"], 1));
    $('#education_adj').html(round(hwbi_indicator_value_adjusted["Education"], 1));
    $('#health_adj').html(round(hwbi_indicator_value_adjusted["Health"], 1));
    $('#resource-mgmt_adj').html(round(hwbi_indicator_value_adjusted["resource-mgmt"], 1));
    $('#hazard_adj').html(round(hwbi_indicator_value_adjusted["hazard"], 1));
    $('#economy_adj').html(round(hwbi_indicator_value_adjusted["economy"], 1));
    $('#resilience_adj').html(round(hwbi_indicator_value_adjusted["resilience"], 1));
    $('#culture_adj').html(round(hwbi_indicator_value_adjusted["culture"], 1));
    $('#safety_adj').html(round(hwbi_indicator_value_adjusted["Safety"], 1));
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
    var location = parsePlaceResponse(place);
    var data_url = "/hwbi/disc/rest/indicators/scores/?county=" + location.county + "&state_abbr=" + location.state_abbr;
    $.ajax({ // get score data
        url: data_url,
        type: "GET",
        beforeSend: function () {
            $('.compare-search-button').eq(communityNumber).addClass('searching');
            $('.compare-search-error').hide();
        },
        success: function (data, status, xhr) {
            data = JSON.stringify(formatDomainData(JSON.parse(data)));
            if (setCompareData(data, communityNumber) !== "dupe") {
                $('.add-community-search').eq(communityNumber).hide();
            } else {
                $('.compare-search-error').eq(communityNumber).html('This community has already been added. Please try another location.').show();
            }
            displayCompareData();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.compare-search-error').eq(communityNumber).html('Your search could not be completed. Please try another location.').show();
        },
        complete: function (jqXHR, textStatus) {
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

function formatDomainData(data) {
    var indicators = setIndicatorData(JSON.stringify(data));
    for (var domain in discDomains) {
        var sum = 0;
        var count = 0;
        for (var index in discDomains[domain]) {
            for (var i = 0; i < discDomains[domain][index].length; i++) {        
                if (indicators.hasOwnProperty(discDomains[domain][index][i].toLowerCase())) {
                    if (indicators[discDomains[domain][index][i]].hasOwnProperty("score")) {
                        var score = indicators[discDomains[domain][index][i]].score;
                        sum += score;
                        count++;
                    }
                }
            }
        }
        discDomains[domain].score = (count === 0 ? 0 : sum / count);
        if (discDomains[domain].score == 0) {
            toast("No data found for " + location.county + " County, " + location.state)
            return {};
        }
    }
    data.outputs = {"domains" : [] };
    data.outputs.domains.push({ "score" : discDomains["built environment"].score, weight: 1, description: "Built Environment", domainID : 'environment' });
    data.outputs.domains.push({ "score" : discDomains["community involvement"].score, weight: 1, description: "Community Involvement", domainID : 'community' });
    data.outputs.domains.push({ "score" : discDomains["education"].score, weight: 1, description: "Education", domainID : 'Education' });
    data.outputs.domains.push({ "score" : discDomains["health"].score, weight: 1, description: "Health", domainID : 'Health' });
    data.outputs.domains.push({ "score" : discDomains["environmental resource management"].score, weight: 1, description: "Environmental Resource Management", domainID : 'resource-mgmt' });
    data.outputs.domains.push({ "score" : discDomains["hazard vulnerability"].score, weight: 1, description: "Hazard Vulnerability", domainID : 'hazard' });
    data.outputs.domains.push({ "score" : discDomains["local economy"].score, weight: 1, description: "Local Economy", domainID : 'economy' });
    data.outputs.domains.push({ "score" : discDomains["resilience planning"].score, weight: 1, description: "Resilience Planning", domainID : 'resilience' });
    data.outputs.domains.push({ "score" : discDomains["local culture"].score, weight: 1, description: "Local Culture", domainID : 'culture' });
    data.outputs.domains.push({ "score" : discDomains["safety and security"].score, weight: 1, description: "Safety and Security", domainID : 'safety' });
    data.outputs.hwbi = 0;
    for (var i = 0; i < data.outputs.domains.length; i++) {
        data.outputs.hwbi += data.outputs.domains[i].score;
    }
    data.outputs.hwbi /= data.outputs.domains.length;
    data.outputs.nationhwbi = 52.7943325;
    return data;
}

function formatIndicatorData(indicators) {
    var data = {};
    var inputs = []; // build inputs
    var meta_state = {
        'name': 'state',
        'value': indicators["activity participation"].stateID,
        'description': 'US State'
    };
    var meta_county = {
        'name': 'county',
        'value': indicators["activity participation"].county,
        'description': 'County'
    };
    inputs.push(meta_state);
    inputs.push(meta_county);
    data.inputs = inputs;
    data.outputs = indicators;
    return data;
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
    if (state === '' || county === '' || state_abbr === '') {
        return toast("Unable to find location. Please try another!");
    }
    var location = {};
    location["county"] = county;
    location["state"] = state;
    location["state_abbr"] = state_abbr;
    return location;
}

function setIndicatorData(indicatorData) {
    var outputs = JSON.parse(indicatorData).outputs;
    var indicators = {};
    for (var i = 0; i < outputs.length; i++) {
        var row = outputs[i];
        if (row.score <= 1 && row.score >= 0) {
            row.score *= 100;
        }
        row.score = round(row.score, 0);
        indicators[row.indicator.toLowerCase()] = row;
    }
    return indicators;
}

function relevantIndicatorsDomains() {
    for (var indicator in disc_indicator_changes) { 
        var difference = disc_indicator_changes[indicator] - hwbi_indicator_data.outputs[indicator].score;
        if (difference > 0) {
            console.log("User specified indicator " + indicator + " is important!");
        }
    }
    for (var i = 0; i < hwbi_disc_data.outputs.domains.length; i++) {
        if (hwbi_disc_data.outputs.domains[i].weight > 1) {
            console.log("User specified domain " + hwbi_disc_data.outputs.domains[i].description + " is important!");
        }
    }
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