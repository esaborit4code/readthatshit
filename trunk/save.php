<?php
function save_entry($title, $url)
{
	$database_file_name = "database";
	$database_file_resource = fopen($database_file_name, 'a');

	$string_data = json_encode(array("title" => $title, "url" => $url));

	fwrite($database_file_resource, $string_data . "\n");	
	fclose($database_file_resource);

	return $string_data;
}

$string_data = save_entry($_POST["title"], $_POST["url"]);
echo $string_data;
