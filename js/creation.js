$(document).ready(function() {
	var ERROR_LABELS = {
		"LIST NAME ALREADY USED": "Este nombre (o uno muy parecido) ya se ha usado. Sé más original y vuelve a intentarlo ;)."
	};
	
	var form = $("#save_form");

	var formSent = function(response) {
		var has_errors = ((response.errors != null) && (response.errors.length > 0));
		if(has_errors) {
			var error_list = $("#error_list");
			error_list.empty();
			
			$(response.errors).each(function() {
				var error_text = ERROR_LABELS[this];
				var list_item = $("<li>", { "class": "error", "html": error_text } );
				error_list.append(list_item);
			});
			
			return;
		}	
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