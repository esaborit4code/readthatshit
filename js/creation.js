$(document).ready(function() {
	var form = $("#save_form");
	var error_list = $("#error_list");

	var clearErrorList = function() {		
		error_list.empty();
		error_list.hide();
	};
	
	var formSent = function(response) {
		var has_errors = ((response.errors != null) && (response.errors.length > 0));
		if(!has_errors) {			
			return;
		}
		
		$(response.errors).each(function() {
			var error_text = LABELS[this];
			var list_item = $("<li>", { "class": "item", "html": error_text } );
			error_list.append(list_item);
		});
		
		error_list.fadeIn();
	};

	var sendFormByAjax = function(form) {
		var url = form.attr("action");
		var data = form.serialize();
		$.ajax({
			url: url,
			data: data,
			type: "post",
			dataType: "json"
		}).success(formSent);
		
		clearErrorList();
	};

	form.submit(function(event) {
		event.preventDefault();
		sendFormByAjax($(this));
	});
});