$(document).ready(function() {
	var current_page_id_suffix = "_current";
	var content_element = $("#content");
	var pages_element = $("#pages");
	var current_page = $(content_element.children()[0]);

	var navigateTo = function(content_id) {
		var new_page = $("#" + content_id);

		var page_not_exists = (new_page == null);
		if (page_not_exists) {
			return;
		}
		
		var page_is_being_showed = (current_page.attr("id") == (new_page.attr("id") + current_page_id_suffix);
		if (page_is_being_showed) {
			return;
		}

		hideCurrentPage();
		showPage(new_page);
	};

	var hideCurrentPage = function() {
		hidePage(current_page);
	};

	var showPage = function(page) {
		var id = page.attr("id");
		var new_id = id + current_page_id_suffix;
		page.attr("id", new_id);

		content_element.append(page);
		current_page = page;
	};

	var hidePage = function(page) {
		var id = page.attr("id");
		var new_id = id.replace(current_page_id_suffix, "");
		page.attr("id", new_id);

		pages_element.append(page);
	};

	$(window).bind('hashchange', function(event) {
		var hash_value = window.location.hash.replace("#", "");
		navigateTo(hash_value);
	});

	showPage(current_page);
});