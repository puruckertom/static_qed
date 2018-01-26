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
// var hwbi_indicator_data;
var hwbi_indicator_value_adjusted = {};

$(document).ready(function () {

    initializeTabs();

    // fix for Firefox UI
    $('#community-snapshot-tab-link').trigger("click");
    $('#about-tab-link').trigger("click");

    // Run cycleQuote after 500ms delay on page load.
    setTimeout(cycleQuote, 500);
    setTimeout(loadPage, 600);

    // Snapshot body
    setAccordion();
    setRankSliders();
    setTimeout(getScoreData, 600);
    $('#community_pdf').on("click", notImplementedAlert);
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
    $('.compare-search').on('click', getComparisonData);
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
    }
    else {
        $('#search_block').addClass('search_block');
        $('#search_block').removeClass('about_search');
        $('#report_pdf').show();
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
    var data_url = "/hwbi/disc/rest/scores?state=" + location['state'] + "&county=" + location['county'];
    $.ajax({
        url: data_url,
        type: "GET",
        success: function (data, status, xhr) {
            console.log("getScoreData success: " + status);
            setScoreData(data);
            setCompareData(data, 0);
            displayCompareData(JSON.parse(sessionStorage.getItem("compareCommunities")).length);
            $('#customize_location').html(location['county'] + " County, " + location['state']);
            hwbi_disc_data = JSON.parse(data);
            getIndicatorData();
            hwbi_indicator_value_adjusted = {};
            setCookie('EPAHWBIDISC', location_data, 1);
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
    var input = document.getElementById('search_field');
    searchBox = new google.maps.places.Autocomplete(input);
    searchBox.setComponentRestrictions({'country': ['us']});
    searchBox.addListener('place_changed', setLocationValue);
}

function setLocationValue() {
    var place = searchBox.getPlace();
    var county = place.address_components[1]['long_name'].replace(" County", "");
    var state = place.address_components[2]['long_name'];
    var json_value = {};
    json_value["county"] = county;
    json_value["state"] = state;
    locationValue = JSON.stringify(json_value);
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
    $('#location').html("Snapshot results for:<br>" + data["inputs"][1]["value"] + " County, " + data["inputs"][0]["value"]);
    $('#wellbeing-score-location').html("Nation: " + data["outputs"]["nationhwbi"].toFixed(1) + ", State: " +
        data["outputs"]["statehwbi"].toFixed(1));

    // Set location score
    var score = Math.round(data["outputs"]["hwbi"]);
    $('#wellbeing-score').html(score);
    document.getElementById('score_indicator_span').style.transform = "rotate(" + Math.round(score * 90 / 50) + "deg) skew(45deg, -45deg)";

    // Set Domain scores
    // Nature
    var nature_score = data["outputs"]["domains"][0]["score"].toFixed(1);
    $('#nature_score').html(nature_score);
    $('#nature_score_bar').attr('data-percent', nature_score + "%");
    $('#nature_location').html("[Nation: " + data["outputs"]["domains"][0]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][0]["stateScore"].toFixed(1) + "]");
    // Culture
    var cultural_score = data["outputs"]["domains"][1]["score"].toFixed(1);
    $('#cultural_score').html(cultural_score);
    $('#cultural_score_bar').attr('data-percent', cultural_score + "%");
    $('#cultural_location').html("[Nation: " + data["outputs"]["domains"][1]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][1]["stateScore"].toFixed(1) + "]");
    // Education
    var education_score = data["outputs"]["domains"][2]["score"].toFixed(1);
    $('#education_score').html(education_score);
    $('#education_score_bar').attr('data-percent', education_score + "%");
    $('#education_location').html("[Nation: " + data["outputs"]["domains"][2]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][2]["stateScore"].toFixed(1) + "]");
    // Education
    var health_score = data["outputs"]["domains"][3]["score"].toFixed(1);
    $('#health_score').html(health_score);
    $('#health_score_bar').attr('data-percent', health_score + "%");
    $('#health_location').html("[Nation: " + data["outputs"]["domains"][3]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][3]["stateScore"].toFixed(1) + "]");
    // Leisure Time
    var leisure_score = data["outputs"]["domains"][4]["score"].toFixed(1);
    $('#leisure_score').html(leisure_score);
    $('#leisure_score_bar').attr('data-percent', leisure_score + "%");
    $('#leisure_location').html("[Nation: " + data["outputs"]["domains"][4]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][4]["stateScore"].toFixed(1) + "]");
    // Living Standards
    var living_score = data["outputs"]["domains"][5]["score"].toFixed(1);
    $('#living-std_score').html(living_score);
    $('#living-std_score_bar').attr('data-percent', living_score + "%");
    $('#living-std_location').html("[Nation: " + data["outputs"]["domains"][5]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][5]["stateScore"].toFixed(1) + "]");
    // Safety and Security
    var safety_score = data["outputs"]["domains"][6]["score"].toFixed(1);
    $('#safety_score').html(safety_score);
    $('#safety_score_bar').attr('data-percent', safety_score + "%");
    $('#safety_location').html("[Nation: " + data["outputs"]["domains"][6]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][6]["stateScore"].toFixed(1) + "]");
    // Social Cohesion
    var cohesion_score = data["outputs"]["domains"][7]["score"].toFixed(1);
    $('#cohesion_score').html(cohesion_score);
    $('#cohesion_score_bar').attr('data-percent', cohesion_score + "%");
    $('#cohesion_location').html("[Nation: " + data["outputs"]["domains"][7]["stateScore"].toFixed(1) +
        ", State: " + data["outputs"]["domains"][7]["stateScore"].toFixed(1) + "]");

    setTimeout(loadSkillbar, 600);
}

function setAccordion() {
    for (acc_i = 0; acc_i < acc.length; acc_i++) {
        acc[acc_i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = $(this.parentNode).find('.domain-description')[0];
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

function loadSkillbar() {
    $('.domain-score-bar').each(function () {
        $(this).find('.score-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 2000);
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
    $('#nature-slider-bar').slider(sliderOptions);
    $('#cultural-slider-bar').slider(sliderOptions);
    $('#education-slider-bar').slider(sliderOptions);
    $('#health-slider-bar').slider(sliderOptions);
    $('#leisure-slider-bar').slider(sliderOptions);
    $('#living-std-slider-bar').slider(sliderOptions);
    $('#safety-slider-bar').slider(sliderOptions);
    $('#cohesion-slider-bar').slider(sliderOptions);

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

    var natureScore = hwbi_disc_data["outputs"]["domains"][0]["score"];
    var natureWeight = $('#nature-slider-bar').slider("value");
    var adjustedNatureScore = natureScore * natureWeight;
    var culturalScore = hwbi_disc_data["outputs"]["domains"][1]["score"];
    var culturalWeight = $('#cultural-slider-bar').slider("value");
    var adjustedCulturalScore = culturalScore * culturalWeight;
    var educationScore = hwbi_disc_data["outputs"]["domains"][2]["score"];
    var educationWeight = $('#education-slider-bar').slider("value");
    var adjustedEducationScore = educationScore * educationWeight;
    var healthScore = hwbi_disc_data["outputs"]["domains"][3]["score"];
    var healthWeight = $('#health-slider-bar').slider("value");
    var adjustedHealthScore = healthScore * healthWeight;
    var leisureScore = hwbi_disc_data["outputs"]["domains"][4]["score"];
    var leisureWeight = $('#leisure-slider-bar').slider("value");
    var adjustedLeisureScore = leisureScore * leisureWeight;
    var livingStdScore = hwbi_disc_data["outputs"]["domains"][5]["score"];
    var livingStdWeight = $('#living-std-slider-bar').slider("value");
    var adjustedLivingStdScore = livingStdScore * livingStdWeight;
    var safetyScore = hwbi_disc_data["outputs"]["domains"][6]["score"];
    var safetyWeight = $('#safety-slider-bar').slider("value");
    var adjustedSafetyScore = safetyScore * safetyWeight;
    var cohesionScore = hwbi_disc_data["outputs"]["domains"][7]["score"];
    var cohesionWeight = $('#cohesion-slider-bar').slider("value");
    var adjustedCohesionScore = cohesionScore * cohesionWeight;
    var totalScore = adjustedNatureScore + adjustedCulturalScore + adjustedEducationScore + adjustedHealthScore +
        adjustedLeisureScore + adjustedLivingStdScore + adjustedSafetyScore + adjustedCohesionScore;

    var newScore = totalScore / totalWeight;
    $('#wellbeing-score').html(Math.round(newScore));
    document.getElementById('score_indicator_span').style.transform = "rotate(" + Math.round(newScore * 90 / 50) + "deg) skew(45deg, -45deg)";
}

function sumArray(total, num) {
    return total + num;
}

function notImplementedAlert() {
    alert("This feature has not yet been implemented.");
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
        "Move slider left or right to change the indicator score to describe your community better.");
    showDomainIndicators(domainID);
}

function getDomainDescription(domainID) {
    if (domainID === "Connection") {
        return "Indicators for the Connection to Nature domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Culture") {
        return "Indicators for the Cultural Fulfillment domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Education") {
        return "Indicators for the Education domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Health") {
        return "Indicators for the Health domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Leisure") {
        return "Indicators for the Leisure Time domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Living") {
        return "Indicators for the Living Standards domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Safety") {
        return "Indicators for the Safety and Security domain<br>Info from Smith, et al. 2012<br>"
    }
    else if (domainID === "Social") {
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
    if (domainID === "Connection") {
        $('#connection_indicators').show();
    }
    else if (domainID === "Culture") {
        $('#culture_indicators').show();
    }
    else if (domainID === "Education") {
        $('#education_indicators').show();
    }
    else if (domainID === "Health") {
        $('#health_indicators').show();
    }
    else if (domainID === "Leisure") {
        $('#leisure_indicators').show();
    }
    else if (domainID === "Living") {
        $('#living_indicators').show();
    }
    else if (domainID === "Safety") {
        $('#safety_indicators').show();
    }
    else if (domainID === "Social") {
        $('#social_indicators').show();
    }
}

function getIndicatorData() {
    // TODO: hit api endpoint to get indicator data for selected county
    setIndicatorSliders();
}

function setIndicatorSliders() {
    // TODO: Set min/max/value as -/+ x of the value
    $('#nature_biophilia_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#nature_biophilia_value').html(50);
        },
        slide: function (event, ui) {
            $('#nature_biophilia_value').html(ui.value);
            calculateNewScore("Connection", "#connection_indicators");

        }
    });
    $('#culture_activity_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#culture_activity_value').html(50);
        },
        slide: function (event, ui) {
            $('#culture_activity_value').html(ui.value);
            calculateNewScore("Culture", "#culture_indicators");
        }
    });
    $('#education_knowledge_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#education_knowledge_value').html(50);
        },
        slide: function (event, ui) {
            $('#education_knowledge_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    $('#education_participation_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#education_participation_value').html(50);
        },
        slide: function (event, ui) {
            $('#education_participation_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    $('#education_social_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#education_social_value').html(50);
        },
        slide: function (event, ui) {
            $('#education_social_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    $('#health_healthcare_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#health_healthcare_value').html(50);
        },
        slide: function (event, ui) {
            $('#health_healthcare_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    $('#health_life_expectancy_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#health_life_expectancy_value').html(50);
        },
        slide: function (event, ui) {
            $('#health_life_expectancy_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    $('#health_lifestyle_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#health_lifestyle_value').html(50);
        },
        slide: function (event, ui) {
            $('#health_lifestyle_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    $('#health_personal_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#health_personal_value').html(50);
        },
        slide: function (event, ui) {
            $('#health_personal_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    $('#health_conditions_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#health_conditions_value').html(50);
        },
        slide: function (event, ui) {
            $('#health_conditions_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    $('#leisure_activity_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#leisure_activity_value').html(50);
        },
        slide: function (event, ui) {
            $('#leisure_activity_value').html(ui.value);
            calculateNewScore("Leisure", "#leisure_indicators");
        }
    });
    $('#leisure_time_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#leisure_time_value').html(50);
        },
        slide: function (event, ui) {
            $('#leisure_time_value').html(ui.value);
            calculateNewScore("Leisure", "#leisure_indicators");
        }
    });
    $('#leisure_working_age_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#leisure_working_age_value').html(50);
        },
        slide: function (event, ui) {
            $('#leisure_working_age_value').html(ui.value);
            calculateNewScore("Leisure", "#leisure_indicators");
        }
    });
    $('#living_basic_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#living_basic_value').html(50);
        },
        slide: function (event, ui) {
            $('#living_basic_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    $('#living_income_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#living_income_value').html(50);
        },
        slide: function (event, ui) {
            $('#living_income_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    $('#living_wealth_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#living_wealth_value').html(50);
        },
        slide: function (event, ui) {
            $('#living_wealth_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    $('#living_work_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#living_work_value').html(50);
        },
        slide: function (event, ui) {
            $('#living_work_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    $('#safety_actual_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#safety_actual_value').html(50);
        },
        slide: function (event, ui) {
            $('#safety_actual_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");

        }
    });
    $('#safety_perceived_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#safety_perceived_value').html(50);
        },
        slide: function (event, ui) {
            $('#safety_perceived_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");
        }
    });
    $('#safety_risk_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#safety_risk_value').html(50);
        },
        slide: function (event, ui) {
            $('#safety_risk_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");
        }
    });
    $('#social_attitude_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#social_attitude_value').html(50);
        },
        slide: function (event, ui) {
            $('#social_attitude_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    $('#social_democratic_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#social_democratic_value').html(50);
        },
        slide: function (event, ui) {
            $('#social_democratic_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    $('#social_family_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#social_family_value').html(50);
        },
        slide: function (event, ui) {
            $('#social_family_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    $('#social_engagement_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#social_engagement_value').html(50);
        },
        slide: function (event, ui) {
            $('#social_engagement_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    $('#social_support_slider').slider({
        min: 0,
        max: 100,
        value: 50,
        create: function (event, ui) {
            $('#social_support_value').html(50);
        },
        slide: function (event, ui) {
            $('#social_support_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
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
            return; // don't add the duplicate
        }
    }
    community.score = data["outputs"]["hwbi"].toFixed(1);
    community.nature_score = data["outputs"]["domains"][0]["score"].toFixed(1);
    community.cultural_score = data["outputs"]["domains"][1]["score"].toFixed(1);
    community.education_score = data["outputs"]["domains"][2]["score"].toFixed(1);
    community.health_score = data["outputs"]["domains"][3]["score"].toFixed(1);    
    community.leisure_score = data["outputs"]["domains"][4]["score"].toFixed(1);    
    community.living_score = data["outputs"]["domains"][5]["score"].toFixed(1);    
    community.safety_score = data["outputs"]["domains"][6]["score"].toFixed(1);    
    community.cohesion_score = data["outputs"]["domains"][7]["score"].toFixed(1);

    compareCommunities.push(community);
    sessionStorage.setItem('compareCommunities', JSON.stringify(compareCommunities));
}

function displayCompareData() {
    var compareCommunities = JSON.parse(sessionStorage.getItem("compareCommunities"));

    for (var i = 0; i < compareCommunities.length; i++) {
        var community = compareCommunities[i];
        
        $('#community-button-' + i).hide();
        $('#community-close-button-' + i).show();
        $('#community-button-'  + (+i + 1))
            .prop('disabled', false)
            .removeClass('button-disabled');

        $('#community-location-' + i).html(community.location);
        $('#compare-score-' + i).html(community.score);
        $('#compare-nature-' + i).html(community.nature_score);
        $('#compare-cultural-' + i).html(community.cultural_score);
        $('#compare-education-' + i).html(community.education_score);
        $('#compare-health-' + i).html(community.health_score);
        $('#compare-leisure-' + i).html(community.leisure_score);
        $('#compare-living-' + i).html(community.living_score);
        $('#compare-safety-' + i).html(community.safety_score);
        $('#compare-cohesion-' + i).html(community.cohesion_score);
    }
    $('.add-community-search').hide();
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
        $('#community-button-'  + (+i + 1))
            .prop('disabled', true)
            .addClass('button-disabled');
        $('#community-close-button-' + i).hide();
        
        $('#community-location-' + i).empty();
        $('#compare-score-' + i).empty();
        $('#compare-nature-' + i).empty();
        $('#compare-cultural-' + i).empty();
        $('#compare-education-' + i).empty();
        $('#compare-health-' + i).empty();
        $('#compare-leisure-' + i).empty();
        $('#compare-living-' + i).empty();
        $('#compare-safety-' + i).empty();
        $('#compare-cohesion-' + i).empty();
    }
}

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
    var location = {};
    location["county"] = county;
    location["state"] = state;
    var data_url = "/hwbi/disc/rest/scores?state=" + location['state'] + "&county=" + location['county'];
    $.ajax({ // get score data
        url: data_url,
        type: "GET",
        success: function (data, status, xhr) {
            console.log("getComparisonData success: " + status);
            setCompareData(data, communityNumber);
            displayCompareData();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("getComparisonData error: " + errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("getComparisonData complete: " + textStatus);
            $('.add-community-search').eq(communityNumber).hide();
            $('#compare-score-' + communityNumber).empty();
            return false;
        }
    });
}

// initializeComparisonAutocomplete: Initializes google maps search places function with a restriction to only us locations.
function initializeComparisonAutocomplete() {
    var compareInputs = document.getElementsByClassName('compare-search-input');
    for (var i = 0; i < compareInputs.length; i++) {
        input = compareInputs[i];
        compareSearchBox[i] = new google.maps.places.Autocomplete(input);
        compareSearchBox[i].setComponentRestrictions({'country': ['us']});
    }
}