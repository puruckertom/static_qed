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
    });

    $(document).on('click', function(event){
        if (!$(event.target).is('.has-children a')) {
            sidebar.find('.has-children.selected').removeClass('selected');
        }
    });

    $('.sidenav > ul > li > a').on('click', function(e) {
        var clicked = $(this);
        
        if (clicked.parent('li').hasClass('active')) {
            clicked.parent('li').removeClass('active');
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
                $('#customize-tab').addClass('show');
            }
            else if ($(clicked).attr("id") === $('#compare-tab-link').attr("id")) {
                $('#compare-tab').addClass('show');
            }
            else if ($(clicked).attr("id") === $('#resources-tab-link').attr("id")) {
                $('#resources-tab').addClass('show');
            }
        }
    });
});
