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
    var shiftWindow = function() { scrollBy(0, -75) };
    if (location.hash) shiftWindow();
    window.addEventListener("hashchange", shiftWindow);

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

    $('#1').click(function() {
        var econ = $('#s-menu-economic');
        
        if (!$(econ).hasClass('show')) {
            $("div[id^='s-menu']").removeClass('show')
            
        }

    econ.toggleClass('show');
        if ($("div[id^='s-menu']").hasClass('show')) {
            $('.filterDiv').removeClass('show');
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
        }
    });

    $('#3').click(function() {
        var soc = $('#s-menu-social');
        
        if (!$(soc).hasClass('show')) {
            $("div[id^='s-menu']").removeClass('show')
        }
    soc.toggleClass('show');
        if ($("div[id^='s-menu']").hasClass('show')) {
            $('.filterDiv').removeClass('show');
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

$(function() {
    $(document).tooltip({track: true, show: null, hide: null});
});
