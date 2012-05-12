<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ReadThatShit</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var form = $("#save_form");

	var formSent = function(response) {
		$("#save_result_message").text("\"" + response.title + "\" saved!");
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
</script>

</head>

<body>
<form method="post" action="save.php" id="save_form">
<label for="title">Título:</label><input type="text" id="title" name="title" />
<label for="url">URL:</label><input type="text" id="url" name="url" />
<input type="submit" value="Guardar" />
</form>
<div id="save_result_message"></div>
</body>

</html>
