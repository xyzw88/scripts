let body = $request.body;
body = body.replace('/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)', '/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)')

$done({body});
