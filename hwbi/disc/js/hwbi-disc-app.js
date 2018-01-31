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
    $('.compare-search-button').on('click', getComparisonData);
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
            setScoreData(data);
            setCompareData(data, 0);
            displayCompareData(JSON.parse(sessionStorage.getItem("compareCommunities")).length);
            $('#customize_location').html(location.county + " County, " + location.state);
            hwbi_disc_data = JSON.parse(data);
            setTimeout(getIndicatorData, 1200);
            hwbi_indicator_value_adjusted = {};
            setCookie('EPAHWBIDISC', location_data, 1);
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
    var input = document.getElementById('search_field');
    searchBox = new google.maps.places.Autocomplete(input, {
            types: ['(cities)'],
            componentRestriction : { country: 'us'}
        });
    // searchBox.setComponentRestrictions({'country': ['us']});
    searchBox.addListener('place_changed', setLocationValue);
}

function setLocationValue() {
    var place = searchBox.getPlace();
    var county = place.address_components[1].long_name.replace(" County", "");
    var state = place.address_components[2].long_name;
    var stateAbbr = place.address_components[2].short_name;
    var json_value = {};
    json_value["county"] = county;
    json_value["state"] = state;
    json_value["state_abbr"] = stateAbbr;
    locationValue = JSON.stringify(json_value);
    $('#search_button').trigger('click');
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
    $('#wellbeing-score-location').html("Nation: " + data.outputs.nationhwbi.toFixed(1) + ", State: " +
        data.outputs.statehwbi.toFixed(1));

    // Set location score
    var score = data.outputs.hwbi.toFixed(1);
    $('#wellbeing-score').html(score);
    document.getElementById('score_indicator_span').style.transform = "rotate(" + Math.round(score * 90 / 50) + "deg) skew(45deg, -45deg)";

    // Set Domain scores
    // Nature
    var nature_score = data.outputs.domains[0].score.toFixed(1);
    $('#nature_score').html(nature_score);
    $('#nature_score_bar').attr('data-percent', nature_score + "%");
    $('#nature_location').html("[Nation: " + data.outputs.domains[0].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[0].stateScore.toFixed(1) + "]");
    // Culture
    var cultural_score = data.outputs.domains[1].score.toFixed(1);
    $('#cultural_score').html(cultural_score);
    $('#cultural_score_bar').attr('data-percent', cultural_score + "%");
    $('#cultural_location').html("[Nation: " + data.outputs.domains[1].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[1].stateScore.toFixed(1) + "]");
    // Education
    var education_score = data.outputs.domains[2].score.toFixed(1);
    $('#education_score').html(education_score);
    $('#education_score_bar').attr('data-percent', education_score + "%");
    $('#education_location').html("[Nation: " + data.outputs.domains[2].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[2].stateScore.toFixed(1) + "]");
    // Education
    var health_score = data.outputs.domains[3].score.toFixed(1);
    $('#health_score').html(health_score);
    $('#health_score_bar').attr('data-percent', health_score + "%");
    $('#health_location').html("[Nation: " + data.outputs.domains[3].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[3].stateScore.toFixed(1) + "]");
    // Leisure Time
    var leisure_score = data.outputs.domains[4].score.toFixed(1);
    $('#leisure_score').html(leisure_score);
    $('#leisure_score_bar').attr('data-percent', leisure_score + "%");
    $('#leisure_location').html("[Nation: " + data.outputs.domains[4].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[4].stateScore.toFixed(1) + "]");
    // Living Standards
    var living_score = data.outputs.domains[5].score.toFixed(1);
    $('#living-std_score').html(living_score);
    $('#living-std_score_bar').attr('data-percent', living_score + "%");
    $('#living-std_location').html("[Nation: " + data.outputs.domains[5].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[5].stateScore.toFixed(1) + "]");
    // Safety and Security
    var safety_score = data.outputs.domains[6].score.toFixed(1);
    $('#safety_score').html(safety_score);
    $('#safety_score_bar').attr('data-percent', safety_score + "%");
    $('#safety_location').html("[Nation: " + data.outputs.domains[6].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[6].stateScore.toFixed(1) + "]");
    // Social Cohesion
    var cohesion_score = data.outputs.domains[7].score.toFixed(1);
    $('#cohesion_score').html(cohesion_score);
    $('#cohesion_score_bar').attr('data-percent', cohesion_score + "%");
    $('#cohesion_location').html("[Nation: " + data.outputs.domains[7].nationScore.toFixed(1) +
        ", State: " + data.outputs.domains[7].stateScore.toFixed(1) + "]");

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
    $('#wellbeing-score').html(newScore.toFixed(1));
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
    var biophilia = hwbi_indicator_data.outputs[0].score.toFixed(2);
    $('#nature_biophilia_slider').slider({
        min: 0,
        max: 100,
        value: biophilia,
        create: function (event, ui) {
            $('#nature_biophilia_value').html(biophilia);
        },
        slide: function (event, ui) {
            $('#nature_biophilia_value').html(ui.value);
            calculateNewScore("Connection", "#connection_indicators");

        }
    });
    var culture_activity = (hwbi_indicator_data.outputs[1].score).toFixed(2);
    $('#culture_activity_slider').slider({
        min: 0,
        max: 100,
        value: culture_activity,
        create: function (event, ui) {
            $('#culture_activity_value').html(culture_activity);
        },
        slide: function (event, ui) {
            $('#culture_activity_value').html(ui.value);
            calculateNewScore("Culture", "#culture_indicators");
        }
    });
    var education_knowledge = (hwbi_indicator_data.outputs[2].score).toFixed(2);
    $('#education_knowledge_slider').slider({
        min: 0,
        max: 100,
        value: education_knowledge,
        create: function (event, ui) {
            $('#education_knowledge_value').html(education_knowledge);
        },
        slide: function (event, ui) {
            $('#education_knowledge_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    var education_participation = (hwbi_indicator_data.outputs[3].score).toFixed(2);
    $('#education_participation_slider').slider({
        min: 0,
        max: 100,
        value: education_participation,
        create: function (event, ui) {
            $('#education_participation_value').html(education_participation);
        },
        slide: function (event, ui) {
            $('#education_participation_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    var education_social = (hwbi_indicator_data.outputs[4].score).toFixed(2);
    $('#education_social_slider').slider({
        min: 0,
        max: 100,
        value: education_social,
        create: function (event, ui) {
            $('#education_social_value').html(education_social);
        },
        slide: function (event, ui) {
            $('#education_social_value').html(ui.value);
            calculateNewScore("Education", "#education_indicators");
        }
    });
    var health_healthcare = (hwbi_indicator_data.outputs[5].score).toFixed(2);
    $('#health_healthcare_slider').slider({
        min: 0,
        max: 100,
        value: health_healthcare,
        create: function (event, ui) {
            $('#health_healthcare_value').html(health_healthcare);
        },
        slide: function (event, ui) {
            $('#health_healthcare_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_life_exp = (hwbi_indicator_data.outputs[6].score).toFixed(2);
    $('#health_life_expectancy_slider').slider({
        min: 0,
        max: 100,
        value: health_life_exp,
        create: function (event, ui) {
            $('#health_life_expectancy_value').html(health_life_exp);
        },
        slide: function (event, ui) {
            $('#health_life_expectancy_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_lifestyle = (hwbi_indicator_data.outputs[7].score).toFixed(2);
    $('#health_lifestyle_slider').slider({
        min: 0,
        max: 100,
        value: health_lifestyle,
        create: function (event, ui) {
            $('#health_lifestyle_value').html(health_lifestyle);
        },
        slide: function (event, ui) {
            $('#health_lifestyle_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_personal = (hwbi_indicator_data.outputs[8].score).toFixed(2);
    $('#health_personal_slider').slider({
        min: 0,
        max: 100,
        value: health_personal,
        create: function (event, ui) {
            $('#health_personal_value').html(health_personal);
        },
        slide: function (event, ui) {
            $('#health_personal_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var health_conditions = (hwbi_indicator_data.outputs[9].score).toFixed(2);
    $('#health_conditions_slider').slider({
        min: 0,
        max: 100,
        value: health_conditions,
        create: function (event, ui) {
            $('#health_conditions_value').html(health_conditions);
        },
        slide: function (event, ui) {
            $('#health_conditions_value').html(ui.value);
            calculateNewScore("Health", "#health_indicators");
        }
    });
    var leisure_activity = (hwbi_indicator_data.outputs[10].score).toFixed(2);
    $('#leisure_activity_slider').slider({
        min: 0,
        max: 100,
        value: leisure_activity,
        create: function (event, ui) {
            $('#leisure_activity_value').html(leisure_activity);
        },
        slide: function (event, ui) {
            $('#leisure_activity_value').html(ui.value);
            calculateNewScore("Leisure", "#leisure_indicators");
        }
    });
    var leisure_time = (hwbi_indicator_data.outputs[11].score).toFixed(2);
    $('#leisure_time_slider').slider({
        min: 0,
        max: 100,
        value: leisure_time,
        create: function (event, ui) {
            $('#leisure_time_value').html(leisure_time);
        },
        slide: function (event, ui) {
            $('#leisure_time_value').html(ui.value);
            calculateNewScore("Leisure", "#leisure_indicators");
        }
    });
    var leisure_working_age = (hwbi_indicator_data.outputs[12].score).toFixed(2);
    $('#leisure_working_age_slider').slider({
        min: 0,
        max: 100,
        value: leisure_working_age,
        create: function (event, ui) {
            $('#leisure_working_age_value').html(leisure_working_age);
        },
        slide: function (event, ui) {
            $('#leisure_working_age_value').html(ui.value);
            calculateNewScore("Leisure", "#leisure_indicators");
        }
    });
    var living_basic = (hwbi_indicator_data.outputs[13].score).toFixed(2);
    $('#living_basic_slider').slider({
        min: 0,
        max: 100,
        value: living_basic,
        create: function (event, ui) {
            $('#living_basic_value').html(living_basic);
        },
        slide: function (event, ui) {
            $('#living_basic_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    var living_income = (hwbi_indicator_data.outputs[14].score).toFixed(2);
    $('#living_income_slider').slider({
        min: 0,
        max: 100,
        value: living_income,
        create: function (event, ui) {
            $('#living_income_value').html(living_income);
        },
        slide: function (event, ui) {
            $('#living_income_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    var living_wealth = (hwbi_indicator_data.outputs[15].score).toFixed(2);
    $('#living_wealth_slider').slider({
        min: 0,
        max: 100,
        value: living_wealth,
        create: function (event, ui) {
            $('#living_wealth_value').html(living_wealth);
        },
        slide: function (event, ui) {
            $('#living_wealth_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    var living_work = (hwbi_indicator_data.outputs[16].score).toFixed(2);
    $('#living_work_slider').slider({
        min: 0,
        max: 100,
        value: living_work,
        create: function (event, ui) {
            $('#living_work_value').html(living_work);
        },
        slide: function (event, ui) {
            $('#living_work_value').html(ui.value);
            calculateNewScore("Living", "#living_indicators");
        }
    });
    var safety_actual = (hwbi_indicator_data.outputs[17].score).toFixed(2);
    $('#safety_actual_slider').slider({
        min: 0,
        max: 100,
        value: safety_actual,
        create: function (event, ui) {
            $('#safety_actual_value').html(safety_actual);
        },
        slide: function (event, ui) {
            $('#safety_actual_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");

        }
    });
    var safety_perceived = (hwbi_indicator_data.outputs[18].score).toFixed(2);
    $('#safety_perceived_slider').slider({
        min: 0,
        max: 100,
        value: safety_perceived,
        create: function (event, ui) {
            $('#safety_perceived_value').html(safety_perceived);
        },
        slide: function (event, ui) {
            $('#safety_perceived_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");
        }
    });
    var safety_risk = (hwbi_indicator_data.outputs[19].score).toFixed(2);
    $('#safety_risk_slider').slider({
        min: 0,
        max: 100,
        value: safety_risk,
        create: function (event, ui) {
            $('#safety_risk_value').html(safety_risk);
        },
        slide: function (event, ui) {
            $('#safety_risk_value').html(ui.value);
            calculateNewScore("Safety", "#safety_indicators");
        }
    });
    var social_attitude = (hwbi_indicator_data.outputs[20].score).toFixed(2);
    $('#social_attitude_slider').slider({
        min: 0,
        max: 100,
        value: social_attitude,
        create: function (event, ui) {
            $('#social_attitude_value').html(social_attitude);
        },
        slide: function (event, ui) {
            $('#social_attitude_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    var social_democratic = (hwbi_indicator_data.outputs[21].score).toFixed(2);
    $('#social_democratic_slider').slider({
        min: 0,
        max: 100,
        value: social_democratic,
        create: function (event, ui) {
            $('#social_democratic_value').html(social_democratic);
        },
        slide: function (event, ui) {
            $('#social_democratic_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    var social_family = (hwbi_indicator_data.outputs[22].score).toFixed(2);
    $('#social_family_slider').slider({
        min: 0,
        max: 100,
        value: social_family,
        create: function (event, ui) {
            $('#social_family_value').html(social_family);
        },
        slide: function (event, ui) {
            $('#social_family_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    var social_engagement = (hwbi_indicator_data.outputs[23].score).toFixed(2);
    $('#social_engagement_slider').slider({
        min: 0,
        max: 100,
        value: social_engagement,
        create: function (event, ui) {
            $('#social_engagement_value').html(social_engagement);
        },
        slide: function (event, ui) {
            $('#social_engagement_value').html(ui.value);
            calculateNewScore("Social", "#social_indicators");
        }
    });
    var social_support = (hwbi_indicator_data.outputs[24].score).toFixed(2);
    $('#social_support_slider').slider({
        min: 0,
        max: 100,
        value: social_support,
        create: function (event, ui) {
            $('#social_support_value').html(social_support);
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
            return "dupe"; // don't add the duplicate
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
        $('#community-button-' + (+i + 1))
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
            types: ['(cities)'],
            componentRestriction : { country: 'us'}
        });
    }
}