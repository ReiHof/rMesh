<?php


$file = mb_convert_encoding($_GET['file'], 'UTF-8', 'UTF-8');


if (file_exists($file)) {
	header('Content-Type: application/octet-stream');
	header('Content-Disposition: attachment; filename="'.basename($file).'"');
	header('Content-Length: ' . filesize($file));
	readfile($file);
	exit;
} else {
	header($_SERVER["SERVER_PROTOCOL"].' 304 Not Modified');
}

?>