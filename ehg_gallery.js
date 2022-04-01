const body = $response.body + `var b = document.createElement('button');
b.onclick=function() {
var s = document.createElement('script');s.type="text/javascript";s.src="https://dl.dropboxusercontent.com/s/iod3v8xudx1u3dx/ehen_bookmarlet.js";document.head.appendChild(s);
};
b.innerText = 'Read Now'
document.getElementById('gd5').appendChild(b);`

$done({ body })
