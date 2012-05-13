<?php
$database_folder_path = "database";

function get_items_xml($items) {
	$xml = "";
	foreach($items as $item)
	{
		$xml .= '
		<item>
		<title><![CDATA[' . $item->title . ']]></title>
		<link><![CDATA[' . $item->url . ']]></link>
		</item>';
	}

	return $xml;
}

function get_list($machine_friendly_name) {
	global $database_folder_path;

	$list_file_name = $database_folder_path . "/" . $machine_friendly_name;

	$json_string = file_get_contents($list_file_name);

	$list = json_decode($json_string);

	return $list;
}

function get_rss_for_list($machine_friendly_name) {
	$list = get_list($machine_friendly_name);

	$items_xml = get_items_xml($list->items);
	$xml =
	'<?xml version="1.0" encoding="utf-8"?>
	<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
	<title><![CDATA[' . $list->title . ']]></title>
	<link><![CDATA[readthatshit.com/list.html#' . $machine_friendly_name . ']]></link>
	<description><![CDATA[' . $list->description . ']]></description>'
	. $items_xml .
	"</channel>
	</rss>";

	return $xml;
}

$rss_xml = get_rss_for_list($_GET["list"]);
echo $rss_xml;
