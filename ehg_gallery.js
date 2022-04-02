const body = $response.body + `var b = document.createElement('button');
b.onclick=function() {
(function($) {
    var PRELOAD = true;

    if (typeof window.photoswipe !== 'undefined')
        return;

    window.photoswipe = true;
    var console = null;
    // Don't run if jQuery isn't loaded
    if (typeof $ === 'undefined') {
        var done = false;
        var s = document.createElement("script");
        var v = '1.10.2';
        s.type = "text/javascript";
        s.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        s.onload = s.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                alert("loaded jquery");
                _main();
            }
        }
        document.head.appendChild(s);
    } else {
        _main();
    }

    function _main() {
        $ = window.jQuery;
        $.ajaxSetup({
            cache: true
        });
        $.getScript('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/v4.1.3/dist/photoswipe.min.js')
            .done(function() {
                // run our functions from here
                $.getScript('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/v4.1.3/dist/photoswipe-ui-default.min.js')
                    .done(function() {
                        $('<link/>', {
                            rel: 'stylesheet',
                            type: 'text/css',
                            href: 'https://cdn.rawgit.com/dimsemenov/PhotoSwipe/v4.1.3/dist/photoswipe.css'
                        }).appendTo('head');
                        $('<link/>', {
                            rel: 'stylesheet',
                            type: 'text/css',
                            href: 'https://cdn.rawgit.com/dimsemenov/PhotoSwipe/v4.1.3/dist/default-skin/default-skin.css'
                        }).appendTo('head');
                        $('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>')
                            .appendTo('body');
                        setTimeout(main, 200);
                    }).fail(function() {
                        alert('ERROR: UI JS not loaded!');
                    })
            })
            .fail(function() {
                alert('ERROR: Core JS not loaded!');
            });
    }

    function getImageLinks(link) {
        var res = [];
        var prefix = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=",
            suffix = "&container=focus&gadget=a&no_expand=1&resize_w=0&rewriteMime=image%2F*";
        //if (link.indexOf(':1024') === -1) {
        //    res.push(prefix + encodeURIComponent(link) + suffix);
        //}
        //res.push('//images.weserv.nl/?url=' + link.replace(/^https?:\/\//i, ''));
        res.push(link);
        return res;
    }

    function htmlDecode(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    // Our code will go here.
    function main() {
        alert('main');
        var images = $('#gdt').find('img'),
            total = images.length,
            complete = 0,
            reg = /<img id="img" src="((?:(?!").)*)"/,
            reg1 = /var\s+xres\s*=\s*(\d+);/,
            reg2 = /var\s+yres\s*=\s*(\d+);/,
            urls = [],
            promises = [];
        images.each(function(index, value) {
            var url = $(this).closest('a').attr('href');
            var promise = new Promise(function(resolve, reject) {
                $.get(url)
                    .done(function(msg) {
                        var link = htmlDecode(reg.exec(msg)[1]);
                        var images_src = getImageLinks(link);
                        var image_id = 0;
                        var w = parseInt(reg1.exec(msg)[1]);
                        var h = parseInt(reg2.exec(msg)[1]);
                        resolve({
                            src: images_src[image_id],
                            w: w,
                            h: h
                        });
                        return;
                        $('<img src="' + images_src[image_id] + '">')
                            .on('load', function() {
                                resolve({
                                    src: $(this).attr('src'),
                                    w: w,
                                    h: h
                                });
                            })
                            .on('error', function() {
                                $(this).attr('src', images_src[++image_id]);
                                if (image_id >= images_src.length) resolve({
                                    src: link,
                                    w: w,
                                    h: h
                                });
                            });
                    })
                    .fail(function() {
                        resolve({
                            src: '',
                            w: 1,
                            h: 1
                        });
                    });
            });
            promises.push(promise);
        });
        Promise.all(promises).then(function(urls) {
            initGallery(urls);
        });

        function initGallery(urls) {
            var gallery = null;
            var onThumbnailsClick = function(e) {
                var index = parseInt(this.getAttribute('data-pswp-uid')) - 1;
                if (index >= 0) {
                    var options = {
                        index: index
                    };
                    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                }
                return false;
            };
            //console.log(urls);
            var pswpElement = document.querySelectorAll('.pswp')[0];

            // loop through all gallery elements and bind events
            var galleryElements = document.querySelectorAll('#gdt img');

            for (var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // build items array
            var items = [];
            for (var i = 0, l = urls.length; i < l; i++) {
                if (typeof urls[i] !== 'undefined') {
                    items.push({
                        src: urls[i].src,
                        w: urls[i].w,
                        h: urls[i].h
                    });
                } else {
                    items.push({
                        src: '',
                        w: 1,
                        h: 1
                    });
                }
            }
            // define options (if needed)
            var options = {
                // optionName: 'option value'
                // for example:
                index: 0 // start at first slide
            };

            // Initializes and opens PhotoSwipe
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        }
    }
}(window.jQuery));
};
b.innerText = 'Read Now 3'
document.getElementById('gd5').appendChild(b);`

$done({ body })
