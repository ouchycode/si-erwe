<?php

$publicPath = getcwd();

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

$file = $publicPath.$uri;

// Serve static assets directly with explicit headers. On PHP's built-in web
// server a router's header() calls are dropped when it returns false, so we
// stream the file ourselves. Images under /storage and /images are immutable
// (uploads always get new filenames), so we let the browser cache them for a
// year to avoid re-downloads on every page navigation.
if ($uri !== '/' && !str_ends_with($uri, '.php') && is_file($file)) {
    $mimes = [
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'webp' => 'image/webp',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'avif' => 'image/avif',
        'pdf' => 'application/pdf',
        'doc' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls' => 'application/vnd.ms-excel',
        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'zip' => 'application/zip',
    ];
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));

    if (str_starts_with($uri, '/storage/') || str_starts_with($uri, '/images/')) {
        header('Cache-Control: public, max-age=31536000, immutable');
        header('Expires: '.gmdate('D, d M Y H:i:s', time() + 31536000).' GMT');
    }
    header('Content-Type: '.($mimes[$ext] ?? 'application/octet-stream'));
    header('Content-Length: '.filesize($file));

    readfile($file);

    return true;
}

$formattedDateTime = date('D M j H:i:s Y');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$remoteAddress = $_SERVER['REMOTE_ADDR'].':'.$_SERVER['REMOTE_PORT'];

file_put_contents('php://stdout', "[$formattedDateTime] $remoteAddress [$requestMethod] URI: $uri\n");

require_once $publicPath.'/index.php';