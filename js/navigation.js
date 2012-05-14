$(document).ready(function() {
	var CURRENT_PAGE_ID_SUFFIX = "_current";

	var content_element = $("#content");
	var pages_element = $("#pages");

	var current_page = null;

	var navigateTo = function(page_id) {

		var page_id_is_valid = isValidPageId(page_id);

		if (!page_id_is_valid) {
			return;
		}

		var new_page = $("#" + page_id);

		var page_is_being_showed = (current_page != null && current_page.attr("id") == (new_page.attr("id") + CURRENT_PAGE_ID_SUFFIX));
		if (page_is_being_showed) {
			return;
		}

		hideCurrentPage();
		showPage(new_page);
	};

	var hideCurrentPage = function() {
		if (current_page != null) {
			hidePage(current_page);
		}
	};

	var showPage = function(page) {
		var id = page.attr("id");
		var new_id = id + CURRENT_PAGE_ID_SUFFIX;
		page.attr("id", new_id);

		content_element.append(page);
		current_page = page;
	};

	var hidePage = function(page) {
		var id = page.attr("id");
		var new_id = id.replace(CURRENT_PAGE_ID_SUFFIX, "");
		page.attr("id", new_id);

		pages_element.append(page);
	};

	var getDefaultPageId = function() {
		var default_page = $(pages_element.children()[0]);
		return default_page.attr("id");
	};

	var isValidPageId = function(page_id) {
		var page = $("#" + page_id);

		var page_id_is_valid = (page.length > 0);

		return page_id_is_valid;
	};

	var navigateToDefault = function() {

		var default_page_id = getDefaultPageId();
		navigateTo(default_page_id);
	};

	var startNavigation = function() {
		var current_hash_value = getCurrentHashValue();
		var hash_is_a_valid_page_id = isValidPageId(current_hash_value);
		if (hash_is_a_valid_page_id) {
			navigateTo(current_hash_value);
			return;
		}

		navigateToDefault();
	};

	var getCurrentHashValue = function() {
		return window.location.hash.replace("#", "");
	};

	var changeToPageInHash = function() {
		var hash_value = getCurrentHashValue();
		navigateTo(hash_value);
	};

	$(window).bind('hashchange', changeToPageInHash);

	startNavigation();
});