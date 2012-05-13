<?php
$database_folder_path = "database";

function get_list($machine_friendly_name) {
	global $database_folder_path;

	$list_file_name = $database_folder_path . "/" . $machine_friendly_name;

	$json_string = file_get_contents($list_file_name);

	$list = json_decode($json_string);

	return $list;
}

function save_list($machine_friendly_name, $list) {
	global $database_folder_path;

	$json_string = json_encode($list);

	$list_file_name = $database_folder_path . "/" . $machine_friendly_name;

	$file_handle = fopen($list_file_name, 'w');

	fwrite($file_handle, $json_string);
	fclose($file_handle);
}

function add_entry($machine_friendly_name, $title, $url)
{
	$list = get_list($machine_friendly_name);

	$item = array("title" => $title, "url" => $url);

	$list->items[] = $item;

	save_list($machine_friendly_name, $list);

	$item_json_string = json_encode($item);

	return $item_json_string;
}

$string_data = add_entry($_POST["machine_friendly_name"], $_POST["title"], $_POST["url"]);
echo $string_data;
