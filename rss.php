<?php
function get_items_xml($items) {
	$xml = "";
	foreach($items as $item)
	{
		$xml .= 
			'<item>
				<title><![CDATA[' . $item->title . ']]></title>
				<link><![CDATA[' . $item->url . ']]></link>
			</item>';
	}

	return $xml;
}
function get_items_from_file($file_name)
{
	$file_content = file_get_contents($file_name);

	$json = "[" . str_replace("\n{", ",{", $file_content) . "]";

	$items = json_decode($json);

	return $items;
}
function get_rss_xml_from_file($file_name)
{
	$items = get_items_from_file($file_name);

	$items_xml = get_items_xml($items);	
	$xml = 
		'<?xml version="1.0" encoding="utf-8"?>
		<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
			<channel>
				<title><![CDATA[Read That Shit]]></title>
				<link><![CDATA[readthatshit.com]]></link> 
				<description><![CDATA[Read That Shit]]></description>'
				. $items_xml .
			"</channel>
		</rss>";
	
	return $xml;
}

$rss_xml = get_rss_xml_from_file("database");
echo $rss_xml;
