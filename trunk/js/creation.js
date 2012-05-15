$(document).ready(function() {
	var form = $("#save_form");

	var formSent = function(response) {
		var has_errors = ((response.errors != null) && (response.errors.length > 0));
		if(!has_errors) {
			return;
		}
		
		var error_list = $("#error_list");
		error_list.empty();
		error_list.hide();
		
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
	};

	form.submit(function(event) {
		event.preventDefault();
		sendFormByAjax($(this));
	});
});