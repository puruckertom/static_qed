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
    
    });

    $('#2').click(function() {
        var ecosys = $('#s-menu-ecosystem');
        
        if (!$(ecosys).hasClass('show')) {
            $("div[id^='s-menu']").removeClass('show')
            
        }
        ecosys.toggleClass('show');
        
    });

    $('#3').click(function() {
        var soc = $('#s-menu-social');
        
        if (!$(soc).hasClass('show')) {
            $("div[id^='s-menu']").removeClass('show')
            
        }
        soc.toggleClass('show');
    
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


