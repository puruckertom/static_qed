jQuery(document).ready(function(){
	//cache DOM elements
	var mainContent = $('.main-content'),
		header = $('.main-header'),
		sidebar = $('.sidenav'),
        searchForm = $('.search');
        
    $('.has-children > a').on('click', function(event) {
        var selectedItem = $(this);
        event.preventDefault();
        if(selectedItem.parent('li').hasClass('selected')) {
            selectedItem.parent('li').removeClass('selected');
        }
        else {
            sidebar.find('.has-children.selected').removeClass('selected');
            selectedItem.parent('li').addClass('selected');
        }
    });

    $('.sidenav > ul > li > a').on('click', function(event) {
        var selectedItem = $(this);
        if(selectedItem.parent('li').hasClass('active')) {
            selectedItem.parent('li').removeClass('active')
        } else {
            $('.sidenav > ul > li.active').removeClass('active');
            selectedItem.parent('li').addClass('active');
        }
    });

    $('.submenu > li > a').on('click', function(e) {
        var selectedItem = $(this);
        $('.submenu > li > a.active-sub').removeClass('active-sub');
        selectedItem.addClass('active-sub');
    })

    $(document).on('click', function(event){
        if(!$(event.target).is('.has-children a')) {
            sidebar.find('.has-children.selected').removeClass('selected');
        }
    });


    $('.search-icon-home').on('click', function() {
        $('#community-snapshot-tab').addClass('show');
    });

    $('.sidenav > ul > li > a').on('click', function(e) {
        var clicked = $(this);
        if(!$(e.target).hasClass('show')) {
            sidebar.find('a.show').removeClass('show');
            if($(clicked) == $('#customize-tab-link')) {
                $('#customize-tab').addClass('show');
            }
            else if ($(clicked) == $('#compare-tab-link')) {
                $('#compare-tab').addClass('show');
            }
            else if ($(clicked) == $('#resources-tab-link')) {
                $('#resources-tab').addClass('show');
            }
        }
    })

});
