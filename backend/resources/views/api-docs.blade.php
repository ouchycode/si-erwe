<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <title>Dokumentasi API — Sekretariat RW 004 Pabuaran</title>
    <link rel="stylesheet" href="/vendor/swagger-ui/swagger-ui.css">
    <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin: 0; background: #fafafa; }
        .topbar { padding: 14px 24px; background: #0f766e; color: #fff; font-family: 'Helvetica Neue', Arial, sans-serif; }
        .topbar h1 { margin: 0; font-size: 18px; font-weight: 600; }
        .topbar p { margin: 2px 0 0; font-size: 12px; opacity: 0.85; }
    </style>
</head>
<body>
    <div class="topbar">
        <h1>Dokumentasi API — Sekretariat RW 004 Pabuaran</h1>
        <p>REST API SI-RW12 | Base URL: <code>/api</code></p>
    </div>
    <div id="swagger-ui"></div>
    <script src="/vendor/swagger-ui/swagger-ui-bundle.js"></script>
    <script src="/vendor/swagger-ui/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function () {
            window.ui = SwaggerUIBundle({
                url: '/api/docs/spec',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
                plugins: [SwaggerUIBundle.plugins.DownloadUrl],
                layout: 'StandaloneLayout',
            });
        };
    </script>
</body>
</html>
