jQuery(document).ready(function() {
	//cache DOM elements
	var mainContent = $('.main-content'),
		header = $('.main-header'),
		sidebar = $('.sidenav'),
        searchForm = $('.search');
        
    $('.has-children > a').on('click', function(event) {
        var selectedItem = $(this);
        event.preventDefault();
        if (selectedItem.parent('li').hasClass('selected')) {
            selectedItem.parent('li').removeClass('selected');
        }
        else {
            sidebar.find('.has-children.selected').removeClass('selected');
            selectedItem.parent('li').addClass('selected');
        }
    });

    $('.submenu > li > a').on('click', function(e) {
        var selectedItem = $(this);
        $('.submenu > li > a.active-sub').removeClass('active-sub');
        selectedItem.addClass('active-sub');
        $('.disc-body').removeClass('show');
        var tab = selectedItem.attr('href');
        $(tab).addClass('show');
    });

    $(document).on('click', function(event){
        if (!$(event.target).is('.has-children a')) {
            sidebar.find('.has-children.selected').removeClass('selected');
        }
    });

    $('.sidenav > ul > li > a').on('click', function(e) {
        var clicked = $(this);
        
        if (clicked.parent('li').hasClass('active')) {
            //clicked.parent('li').removeClass('active');
        } else {
            $('.sidenav > ul > li.active').removeClass('active');
            clicked.parent('li').addClass('active');
        }

        if (!$(e.target).hasClass('show')) {
            $('.disc-body').removeClass('show');
            sidebar.find('a.show').removeClass('show');
            if ($(clicked).attr("id") === $('#community-snapshot-tab-link').attr("id")) {
                $('#community-snapshot-tab').addClass('show');
            }
            if ($(clicked).attr("id") === $('#customize-tab-link').attr("id")) {
                var tab = $('#customize-tab-link').next('.submenu').find('a.active-sub').attr('href'); // Display the tab of the active child link
                $(tab).addClass('show');
            }
            else if ($(clicked).attr("id") === $('#customize-domains-services-link').attr("id")) {
                $('#customize-domains-services').addClass('show');
            }
            else if ($(clicked).attr("id") === $('#scenarios-tab-link').attr("id")) {
                $('#scenarios-tab').addClass('show');
            }
            else if ($(clicked).attr("id") === $('#compare-tab-link').attr("id")) {
                $('#compare-tab').addClass('show');
            }
            else if ($(clicked).attr("id") === $('#resources-tab-link').attr("id")) {
                $('#resources-tab').addClass('show');
            }
        }
    });

    /*moves window down so content doesnt appear under search bar on #page load*/
    var shiftWindow = function() { /* scrollBy(0, -75) */
        $(window).scrollTop(0);
    };
    if (window.location.hash) shiftWindow();
    window.addEventListener("hashchange", shiftWindow);

    $('.returntop').css('display','none');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.returntop:hidden').stop(true, true).fadeIn('fast');
        } else {
            $('.returntop').stop(true, true).fadeOut('fast');
        }
    });

    /*un-focus services slider on mouse-up*/
    $('.thumb').mouseup(function() {
        $('input[type="range"]').blur();
    })


    /* toggle indicator metric accordion */
    // $('.accordion-metrics').click(function() {
    var acc_m = document.getElementsByClassName("accordion-metrics");
    var i;
    

    for (i = 0; i < acc_m.length; i++) {
        acc_m[i].addEventListener("click", function() {
            this.classList.toggle('active-metric');
            var metric_panel = this.nextElementSibling;
            // metric_panel = metric_panel.nextElementSibling;
                /* Toggle between hiding and showing the active panel */
            if(metric_panel.style.display==='block') {
                metric_panel.style.display='none';
                /* if($('.accordion-metrics').hasClass('active-metric')) {
                    $(this).removeClass('active-metric');
                } */
            }
            else {
                metric_panel.style.display='block';
                // $('.accordion-metrics').addClass('active-metric');
            }
        
        });
    }

    $('.indicator_slider').addClass('hide');

    /*removes active class and display:block style for metrics on modal close*/
    $('.close').click(function() {
        $('.accordion-metrics').removeClass('active-metric');
        $('.metric-accordion-panel').css('display', 'none');
    });

    /**
     * Close the modal if there is a click registered on the background of the modal.
     * @param {event} e - The click event.
     * @listens click
     */
    /* document.querySelectorAll('.modal-overlay, .overlay').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('overlay')) {
                document.querySelector(location.hash + ' > div > a.close').click();
            }
        });
    }); */

    $('.card a, .service-card a').click(function() {
        $(this).parent().find('.modal-overlay').addClass('modal-active');
        $('body').css('overflow-y', 'hidden');
    });
       
    $('.card-list .close, .services-card-list .close').click(function() {
        $(this).parent().parent().removeClass('modal-active');
        $('body').css('overflow-y', 'unset');
    })
        

    $('#s-menu-economic').addClass('show');

    $('#1').click(function() {
        var econ = $('#s-menu-economic');
        
        if (!$(econ).hasClass('show')) {
            $("div[id^='s-menu']").removeClass('show')
            
        }

    econ.toggleClass('show');
    
        if ($("div[id^='s-menu']").hasClass('show')) {
            $('.filterDiv').removeClass('show');
            $('.container-back').removeClass('show');
        }

    });

    $('#2').click(function() {
        var ecosys = $('#s-menu-ecosystem');
        
        if (!$(ecosys).hasClass('show')) {
            $("div[id^='s-menu']").removeClass('show')
            
        }

    ecosys.toggleClass('show');
    
        if ($("div[id^='s-menu']").hasClass('show')) {
            $('.filterDiv').removeClass('show');
            $('.container-back').removeClass('show');
        }
    });

    $('#3').click(function() {
        var soc = $('#s-menu-social');
        
        if (!$(soc).hasClass('show')) {
            $("div[id^='s-menu']").removeClass('show');
            
        }
    soc.toggleClass('show');
    
        if ($("div[id^='s-menu']").hasClass('show')) {
            $('.filterDiv').removeClass('show');
            $('.container-back').removeClass('show');
        }
    });
});
    

var l_tab = 1;
var max;

function tabsOnClick(id){
    var li = document.getElementById(id);
    var div = document.getElementById('tab'+id);


    for(var i=1; i<=3; i++){
        document.getElementById(i).className = '';
        document.getElementById("tab"+i).style.display = "none";
    }
    
    li.className += 'current-tab';
    div.style.display = "block";	
}


//3 functions for filtering results of slinky menu
filterSelection('all')
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName('filterDiv');
    if (c == 'all') c = '';
    for (i = 0; i < x.length; i++) {
        removeShow(x[i], 'show');
        if (x[i].className.indexOf(c) > -1) addShow(x[i], 'show');
    }
}

function addShow(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += ' ' + arr2[i];
        }
    }
}

function removeShow(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1); 
      }
    }
    element.className = arr1.join(" ");
  }


function createMetricTitles() {
    let titles = $('div.services #service_indicator_title');

    $("div[id^='s-menu'] ul li ul li a").click(function(e) {
        e.stopPropagation();
        var target = e.target,
            text = target.textContent || target.innerText
        titles.html(text);
    });
    

    $('div.services-nav').click(function() {
        titles.html('');
    });

    $('.container-back').addClass('show');
}

/* function createMetricTitles() {
    let titles = $('#tab1 div #service_indicator_title, #tab2 div #service_indicator_title, #tab3 div #service_indicator_title');

    $("div[id^='s-menu'] ul li ul li a").click(function(e) {
        e.stopPropagation();
        var target = e.target,
            text = target.textContent || target.innerText
        titles.html(text);
    });
    

    $('div.services-nav').click(function() {
        titles.html('');
    });
} */

// radial bar chart click function to show/hide descriptions

$(function() {

    $('#desc1 , #desc2 , #desc3').addClass('hide');

    $('div#chart').click(function() {
        var econ = $('#desc1');
        
        if (!$(econ).hasClass('show')) {
            $("div[id^='desc']").removeClass('show').addClass('hide');
            $('#chart2, #chart3').removeClass('transparent');
        }

        econ.toggleClass('show').removeClass('hide');
        $('#chart, #chart2 , #chart3').addClass('transparent');
        $('#chart').removeClass('transparent');
        
        
        if ($("div[id^='desc']").hasClass('show')) {
            $(econ).addClass('hide');
        }

        if(!$('#desc1 , #desc2 , #desc3').hasClass('show')) {
            $('#chart, #chart2, #chart3').removeClass('transparent');
        }

    });

    $('div#chart2').click(function() {
        var ecosys = $('#desc2');
        
        if (!$(ecosys).hasClass('show')) {
            $("div[id^='desc']").removeClass('show').addClass('hide');
            $('#chart, #chart3').removeClass('transparent');
        }

        ecosys.toggleClass('show').removeClass('hide');
        $('#chart, #chart2 , #chart3').addClass('transparent');
        $('#chart2').removeClass('transparent');
        
        if ($("div[id^='desc']").hasClass('show')) {
            $(ecosys).addClass('hide');
        }

        if(!$('#desc1 , #desc2 , #desc3').hasClass('show')) {
            $('#chart, #chart2, #chart3').removeClass('transparent');
        }

    });

    $('div#chart3').click(function() {
        var soc = $('#desc3');
        
        if (!$(soc).hasClass('show')) {
            $("div[id^='desc']").removeClass('show').addClass('hide');
            $('#chart, #chart2').removeClass('transparent');
        }

        soc.toggleClass('show').removeClass('hide');
        $('#chart, #chart2 , #chart3').addClass('transparent');
        $('#chart3').removeClass('transparent');
        
        
        if ($("div[id^='desc']").hasClass('show')) {
            $(soc).addClass('hide');
        }

        if(!$('#desc1 , #desc2 , #desc3').hasClass('show')) {
            $('#chart, #chart2, #chart3').removeClass('transparent');
        }

    });

    
});

//add tracking tooltip on hover
$(function() {
    $(document).tooltip({track: true, show: null, hide: null});
});

//show resource on pdf report if checkbox checked
$('input:checkbox').change(function() {
    $(this).parent().toggleClass('show', $(this).is(':checked'));
});

//append community snapshot tab to pdf report, show 'printable' div on report
function copyDivs() {
    $('#printable').html('');
    $('#community-snapshot-tab').clone().appendTo('#printable');
    $('#printable #community-snapshot-tab').addClass('show');
};

$(function() {
    if (!$('.services-tabs li').hasClass('current-tab')) {
        $('.notab-desc').addClass('show');
    } else {
        $('.notab-desc').removeClass('show');
    }
});

function serviceTabContainerReturn() {
    $('.services-tabs li.current-tab').trigger('click');
};

//starts walkthrough when question mark glyph is clicked
function initializeWalkthrough() {
    if ($('.snapshot').hasClass('active')) {
        startIntro();
    } else if ($('.compare').hasClass('active')) {
        startCompareIntro();
    } else if ($('.customize').hasClass('active') && $('#customize-indicators-metrics-link').hasClass('active-sub')) {
        startCustomizeIntro();
    } else if ($('.customize').hasClass('active') && $('#customize-ranking-link').hasClass('active-sub')) {
        startRankingIntro();
    } else if ($('.customize').hasClass('active') && $('#customize-domains-services-link').hasClass('active-sub')) {
        startCustomizeServicesIntro();
    } else if ($('.scenarios').hasClass('active')) {
        startScenarioIntro();
    } else if ($('.resources').hasClass('active')) {
        startResourcesIntro();
    } else {
        return
    }
}

//tutorial for compare page
function startCompareIntro() {
    var introNext = introJs();
        introNext.setOptions({
        steps: [
            {
                intro: "This is the compare page. Here you can compare the DISC score of the county you entered with surrounding counties."
            },
            ],
        doneLabel: 'Continue'
        });

    introNext.setOption('showStepNumbers', false).setOption('disableInteraction', true).start().oncomplete(function() {
        $('.compare').removeClass('active');
        $('.customize').addClass('active');
        $('#customize-indicators-metrics-link').trigger('click');
        setTimeout(startCustomizeIntro, 500);
    });
};

//tutorial for customize - quality of life section
function startCustomizeIntro() {
    var intro = introJs();
    intro.setOptions({
    steps: [
        {
            intro: "This is the Customize - Quality of Life page. Here you can customize your HWBI scores if you wish, but it is not required."
        },
        {
            element: document.querySelector('.card1'),
            intro: "These are cards that correlate with each HWBI domain. Click one to start customizing the specific domain.",
            position: 'right',
            scrollToElement: false
        },
        
        ],
    doneLabel: 'Continue',
    scrollToElement: false
    });
    
    intro.setOption('showStepNumbers', false).setOption('disableInteraction', true)    
    intro.start().onafterchange(function(targetElement) {
        if (this._currentStep === 1) {
            $(window).scrollTop(0)
        }
            
        }).oncomplete(function() {
        window.location.href = '#connection-to-nature-modal';
        setTimeout(startCustomizeModal, 500);
    });
    
};

//tutorial for customize - quality of life modal
function startCustomizeModal() {
    var introNext = introJs();
        introNext.setOptions({
        steps: [
            {
                intro: "Here is a modal window. This is where you customize each indicator for the specified domain."
            },
            /* {
                element: document.querySelector('#connection-to-nature_indicators').querySelector(' .indicator_data-title'),
                intro: "This is an indicator. Click here to reveal the metrics associated with this specific indicator and move the slider left or right to manipulate the value."
            },
            {
                element: document.querySelector('#connection-to-nature-modal').querySelector('.reset-hwbi-custom-btn'),
                intro: "Use this button to reset all the customized values back to their baseline."
            }, */
            ],
        doneLabel: 'Continue',
        scrollToElement: false
        });

        /* introNext.onchange(function(targetElement) {

            // Find the parent having the introjs-fixParent class
            $parentElement = $(targetElement).parents(".introjs-fixParent");

            $parentElement.removeClass('introjs-fixParent');
        }); */
    
    introNext.setOption('showStepNumbers', false).setOption('disableInteraction', true).start().oncomplete(function() {
        $('.close').trigger('click');
        $('#customize-ranking-link').trigger('click');
        setTimeout(startRankingIntro, 500);
    });
};

//tutorial for customize - priority ranking page
function startRankingIntro() {
    var introNext = introJs();
        introNext.setOptions({
        steps: [
            {
                intro: "This is the Priority Ranking page. You can change the ranking of each community characteristic's importance based on your preferences. The graph shows a visual representation of these rankings."
            },
            {
                element: document.querySelector('.ranking-list-container'),
                intro: "Use the up or down arrows to modify the ranking values."
            },
            ],
        doneLabel: 'Continue'
        });

    introNext.setOption('showStepNumbers', false).setOption('disableInteraction', true).start().oncomplete(function() {
        $('#customize-domains-services-link').trigger('click');
        setTimeout(startCustomizeServicesIntro, 500);
    });
};

//tutorial for customize-services page
function startCustomizeServicesIntro() {
    var intro = introJs();
    intro.setOptions({
    steps: [
        {
            intro: "This is the Customize - Services page. Here you can customize your Services scores if you wish, but it is not required."
        }
        ],
    doneLabel: 'Continue',
    scrollToElement: false
    });
    
    intro.setOption('showStepNumbers', false).setOption('disableInteraction', true)    
    intro.start().oncomplete(function() {
        $('.customize').removeClass('active');
        $('.scenarios').addClass('active');
        $('#scenarios-tab-link').trigger('click');
        setTimeout(startScenarioIntro, 500);
    });
    
};

//tutorial for scenario page
function startScenarioIntro() {
    var introNext = introJs();
        introNext.setOptions({
        steps: [
            {
                intro: "This is the Scenario page."
            },
            {
                element: document.querySelector('.services'),
                intro: "You can select between Economic, Ecosystem, and Social and see the domains associated with each. Clicking on a domain will show a list of constituent metrics that contribute to the domain score."
            },
            {
                element: document.querySelector('#aster'),
                intro: "This is an aster plot showing your DISC score and a visualization of each HWBI domain, which changes dynamically as you edit the service metrics."
            },
            {
                element: document.querySelector('#scenario-btns'),
                intro: "Use these buttons to either reset your scenario back to the baseline values, or load the values previously customized on the 'Customize Data' page."
            }
            ],
        doneLabel: 'Continue'
        });

    introNext.setOption('showStepNumbers', false).setOption('disableInteraction', true).start().onafterchange(function(targetElement) {
        if (this._currentStep === 3) {
            $(window).scrollTop(0)
        }
            
        }).oncomplete(function() {
        $('#resources-tab-link').trigger('click');
        setTimeout(startResourcesIntro, 500);
    });
};

//tutorial for resources page
function startResourcesIntro() {
    var introNext = introJs();
        introNext.setOptions({
        steps: [
            {
                intro: "This is the Resources page."
            },
            {
                element: document.querySelector('.economic-resources-section').querySelectorAll('.accordion-metrics')[0],
                intro: "Click on a link to reveal resources related to that indicator."
            },
            {
                element: document.querySelector('.economic-resources-section').querySelectorAll('.metric-accordion-panel')[0].querySelectorAll('ul li')[0],
                intro: "Check any of the checkboxes beside the links that you are interested in saving."
            },
            {
                element: document.querySelector('#report_pdf'),
                intro: "Click this button to save a PDF of your Community Snapshot page, as well as all the links you selected to save."
            }
            ],
        doneLabel: 'Done'
        });
    
    introNext.setOption('showStepNumbers', false).setOption('disableInteraction', true).start().onchange(function(targetElement) {
        if (this._currentStep === 2) {
            if (!$('.economic-resources-section .accordion-metrics:eq(0)').hasClass('active-metric')) {
                $('.economic-resources-section .accordion-metrics:eq(0)').trigger('click');
            }
            
        }
        if (this._currentStep === 3) {
            if ($('.economic-resources-section .accordion-metrics:eq(0)').hasClass('active-metric')) {
                $('.economic-resources-section .accordion-metrics:eq(0)').trigger('click');
            }
        }
    }).onafterchange(function(targetElement) {
        if (this._currentStep) {
            $(window).scrollTop(0)
        }
    })
};

function resourceLabelCheck() {
    let econchecked = $('div.economic-resources-section input:checkbox:checked');
    let envchecked = $('div.environment-resources-section input:checkbox:checked');
    let socchecked = $('div.social-resources-section input:checkbox:checked');
    let addchecked = $('div.additional-resources-section input:checkbox:checked');

    if ($(econchecked).length > 0) {
        $('div.economic-resources-section h3').removeClass('no-print');
    } else {
        $('div.economic-resources-section h3').addClass('no-print');
    }

    if ($(envchecked).length > 0) {
        $('div.environment-resources-section h3').removeClass('no-print');
    } else {
        $('div.environment-resources-section h3').addClass('no-print');
    }

    if ($(socchecked).length > 0) {
        $('div.social-resources-section h3').removeClass('no-print');
    } else {
        $('div.social-resources-section h3').addClass('no-print');
    }

    if ($(addchecked).length > 0) {
        $('div.additional-resources-section h3').removeClass('no-print');
    } else {
        $('div.additional-resources-section h3').addClass('no-print');
    }
}
