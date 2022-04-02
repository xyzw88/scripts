console.log('egh.js');

function api_call(b,a,c){b.open("POST",api_url);b.setRequestHeader("Content-Type","application/json");b.withCredentials=true;b.onreadystatechange=c;b.send(JSON.stringify(a))}function api_response(b){if(b.readyState==4){if(b.status==200){var a=JSON.parse(b.responseText);if(a.login!=undefined){top.location.href=login_url}else{return a}}else{alert("Server communication failed: "+b.status+" ("+b.responseText+")")}}return false}function hookEvent(b,a,c){if(typeof(b)=="string"){b=document.getElementById(b)}if(b==null){return}if(b.addEventListener){if(a=="mousewheel"){b.addEventListener("DOMMouseScroll",c,false)}b.addEventListener(a,c,false)}else{if(b.attachEvent){b.attachEvent("on"+a,c)}}}function cancelEvent(a){a=a?a:window.event;if(a.stopPropagation){a.stopPropagation()}if(a.preventDefault){a.preventDefault()}a.cancelBubble=true;a.cancel=true;a.returnValue=false;return false}if(typeof KeyEvent=="undefined"){var KeyEvent={DOM_VK_SPACE:32,DOM_VK_PAGE_UP:33,DOM_VK_PAGE_DOWN:34,DOM_VK_LEFT:37,DOM_VK_UP:38,DOM_VK_RIGHT:39,DOM_VK_DOWN:40,DOM_VK_A:65,DOM_VK_D:68,DOM_VK_R:82,DOM_VK_S:83,DOM_VK_W:87,DOM_VK_NUMPAD2:98,DOM_VK_NUMPAD4:100,DOM_VK_NUMPAD5:101,DOM_VK_NUMPAD6:102,DOM_VK_NUMPAD8:104}}var tag_xhr=undefined;var selected_tag=undefined;var selected_link=undefined;function toggle_tagmenu(a,b){if(tag_xhr!=undefined){return false}if(selected_link!=undefined&&selected_link!=b){_toggle_tagmenu(selected_tag,selected_link);selected_tag=undefined;selected_link=undefined}if(selected_link==b){selected_tag=undefined;selected_link=undefined}else{selected_tag=a;selected_link=b}if(a!=undefined&&b!=undefined){return _toggle_tagmenu(a,b)}}function _refresh_tagmenu_act(a,b){var c="";var d="";if(b.className!="tup"){c=' <img src="https://ehgt.org/g/mr.gif" class="mr" alt="&gt;" /> <a href="#" onclick="tag_vote_up(); return false">'+(b.className==""?"Vote Up":"Withdraw Vote")+"</a>"}if(b.className!="tdn"){d=' <img src="https://ehgt.org/g/mr.gif" class="mr" alt="&gt;" /> <a href="#" onclick="tag_vote_down(); return false">'+(b.className==""?"Vote Down":"Withdraw Vote")+"</a>"}document.getElementById("tagmenu_act").innerHTML=c+d+' 		<img src="https://ehgt.org/g/mr.gif" class="mr" alt="&gt;" /> <a href="#" onclick="tag_show_galleries(); return false">Show Tagged Galleries</a> 		<img src="https://ehgt.org/g/mr.gif" class="mr" alt="&gt;" /> <a href="#" onclick="tag_define(); return false">Show Tag Definition</a> 		<img src="https://ehgt.org/g/mr.gif" class="mr" alt="&gt;" /> <a href="#" onclick="toggle_tagmenu(undefined, undefined); return false">Add New Tag</a> '}function _toggle_tagmenu(a,c){var b=c.style.color=="";if(b){_refresh_tagmenu_act(a,c)}c.style.color=b?"blue":"";document.getElementById("tagmenu_new").style.display=b?"none":"";document.getElementById("tagmenu_act").style.display=b?"":"none";return false}function tag_from_field(a){var a=document.getElementById("newtagfield").value;document.getElementById("newtagbutton").disabled="disabled";send_vote(a,1)}function tag_vote_up(){send_vote(selected_tag,1)}function tag_vote_down(){send_vote(selected_tag,-1)}function tag_show_galleries(){top.location.href=base_url+"tag/"+selected_tag.replace(/ /g,"+")}function tag_define(){popUp("https://ehwiki.org/wiki/"+selected_tag.replace(/[a-z]+:\s?/gi,""),1024,700)}function wait_roller_set(){document.getElementById("waitroller").style.visibility="visible"}function wait_roller_unset(){document.getElementById("waitroller").style.visibility="hidden"}function send_vote(b,a){if(tag_xhr!=undefined){return}wait_roller_set();tag_xhr=new XMLHttpRequest();var c={method:"taggallery",apiuid:apiuid,apikey:apikey,gid:gid,token:token,tags:b,vote:a};api_call(tag_xhr,c,tag_update_vote)}function tag_update_vote(){var a=api_response(tag_xhr);if(a!=false){tag_xhr=undefined;wait_roller_unset();if(a.error!=undefined){alert("Could not vote for tag: "+a.error)}document.getElementById("newtagfield").value="";document.getElementById("newtagbutton").disabled="";if(a.tagpane!=undefined){document.getElementById("taglist").innerHTML=a.tagpane}toggle_tagmenu(undefined,undefined)}}var rate_xhr=undefined;var rating=undefined;function update_rating_image(b){b=Math.round(b);var a=-80+Math.ceil(b/2)*16;var c=b%2==1?-21:-1;document.getElementById("rating_image").style.backgroundPosition=a+"px "+c+"px"}function rating_set(b){if(rate_xhr!=undefined){return}rating=b;rate_xhr=new XMLHttpRequest();var a={method:"rategallery",apiuid:apiuid,apikey:apikey,gid:gid,token:token,rating:rating};api_call(rate_xhr,a,rating_update)}function rating_update(){var a=api_response(rate_xhr);if(a!=false){if(a.error!=undefined){alert("Could not rate gallery: "+a.error);document.getElementById("rating_label").innerHTML="Rating failed."}if(a.rating_avg!=undefined){average_rating=a.rating_avg;display_rating=a.rating_usr;document.getElementById("rating_image").className=a.rating_cls;document.getElementById("rating_count").innerHTML=a.rating_cnt;document.getElementById("rating_label").innerHTML="Thanks for rating!";update_rating_image(rating)}setTimeout(function(){rate_xhr=undefined;rating_reset()},500)}}function rating_show(a){if(rate_xhr==undefined){update_rating_image(a);document.getElementById("rating_label").innerHTML="Rate as "+(a/2).toFixed(1)+" stars"}}function rating_reset(){if(rate_xhr==undefined){update_rating_image(Math.round(display_rating*2));document.getElementById("rating_label").innerHTML=average_rating==0?"Not Yet Rated":"Average: "+average_rating.toFixed(2)}}function display_comment_field(){document.getElementById("formdiv").style.display="";var a=0;if(!document.documentElement.scrollTop){a=document.body.scrollTop}else{a=document.documentElement.scrollTop}window.scrollTo(0,a+99999)}var comment_xhr=undefined;function vote_comment_up(a){document.getElementById("comment_vote_up_"+a).style.color="red";vote_comment(a,1)}function vote_comment_down(a){document.getElementById("comment_vote_down_"+a).style.color="red";vote_comment(a,-1)}function vote_comment(c,a){if(comment_xhr!=undefined){return}comment_xhr=new XMLHttpRequest();var b={method:"votecomment",apiuid:apiuid,apikey:apikey,gid:gid,token:token,comment_id:c,comment_vote:a,};api_call(comment_xhr,b,comment_update);comment_fadeout(c)}var comment_faded=false;var update_comment_id=undefined;var update_comment_score=undefined;var update_comment_vote_up=undefined;var update_comment_vote_down=undefined;function comment_update(){var a=api_response(comment_xhr);if(a!=false){if(a.error!=undefined){alert("Could not vote for comment: "+a.error)}if(a.comment_id!=undefined){update_comment_id=a.comment_id;update_comment_score=(a.comment_score>=0?"+":"")+a.comment_score;update_comment_vote_up=(a.comment_vote>0?"blue":"");update_comment_vote_down=(a.comment_vote<0?"blue":"");comment_fadein(a.comment_id)}comment_xhr=undefined}}function comment_fadeout(d){var c=document.getElementById("comment_score_"+d);var a=parseFloat(c.style.opacity);var b=Math.max(0,a-0.05);c.style.opacity=b;if(b>0){setTimeout(function(){comment_fadeout(d)},10)}else{c.style.visibility="hidden";comment_faded=true}}function comment_fadein(d){var c=document.getElementById("comment_score_"+d);var a=parseFloat(c.style.opacity);var b=0;if(comment_faded){if(update_comment_id!=undefined){document.getElementById("comment_score_"+update_comment_id).innerHTML=update_comment_score;document.getElementById("comment_vote_up_"+update_comment_id).style.color=update_comment_vote_up;document.getElementById("comment_vote_down_"+update_comment_id).style.color=update_comment_vote_down;update_comment_id=undefined;update_comment_score=undefined;update_comment_vote_up=undefined;update_comment_vote_down=undefined;c.style.visibility="visible"}b=Math.min(1,a+0.05);c.style.opacity=b}if(b<1){setTimeout(function(){comment_fadein(d)},10)}else{comment_faded=false}}function edit_comment(b){if(comment_xhr!=undefined){return}comment_xhr=new XMLHttpRequest();var a={method:"geteditcomment",apiuid:apiuid,apikey:apikey,gid:gid,token:token,comment_id:b};api_call(comment_xhr,a,make_comment_editable)}function make_comment_editable(){var a=api_response(comment_xhr);if(a!=false){if(a.error!=undefined){alert("Could not get editable comment: "+a.error)}if(a.comment_id!=undefined){document.getElementById("comment_"+a.comment_id).innerHTML=a.editable_comment}comment_xhr=undefined}}function sp(a){document.location=base_url+"g/"+gid+"/"+token+"/"+(a>0?"?p="+a:"")}var dotagpop=true;function pop_tagaccept(){if(dotagpop){var a=document.createElement("div");a.id="tagpopup";a.innerHTML='<h1>A Quick Note About Tagging</h1><p>While tagging is relatively straight-forward, there are a number of established guidelines that determine when adding a particular tag is proper and when it is not. Before you put any significant amount of effort into it, we therefore ask that you skim through the <a href="https://ehwiki.org/wiki/Tagging">Basic Tagging Guidelines</a> and <a href="https://ehwiki.org/wiki/Fetish_Listing">Fetish Listing</a>. This will likely save both you and the tagging moderators from doing unnecessary work. In particular, you should note the following:</p><p>- These are galleries, not individual images. <strong>Do not tag stuff that is only featured in a few images.</strong></p><p>- If a tag is ambiguous or frequently misused, you may have to specify a <strong>namespace</strong>; <a href="https://ehwiki.org/wiki/namespace">see the Wiki</a>.</p><p>- The <a href="https://ehwiki.org/wiki/Power">power</a> with which you can affect tagging is determined by a number of factors, such as your account age and whether or not you are active on the <a href="https://forums.e-hentai.org/">forums</a>.</p><p>- The forums is also where <a href="https://forums.e-hentai.org/index.php?showforum=74">everything about tagging is discussed</a>. If you have any comments, suggestions or questions about tagging, this is where you should take it.</p><h2 onclick="set_tagaccept()" style="cursor:pointer">Alright Already</h2>';var b=document.getElementById("gd3");b.parentNode.insertBefore(a,b);dotagpop=false}}function set_tagaccept(){var a=new Date();a.setTime(a.getTime()+(365*24*60*60*1000));document.cookie="tagaccept=1; expires="+a.toGMTString()+"; path=/";document.getElementById("gd3").parentNode.removeChild(document.getElementById("tagpopup"))}document.onkeydown=function(b){if(b.altKey||b.ctrlKey||b.metaKey){return}var a=(window.event)?b.keyCode:b.which;if(selected_tag!=undefined){switch(a){case KeyEvent.DOM_VK_D:case KeyEvent.DOM_VK_NUMPAD6:tag_define();cancelEvent(b);break;case KeyEvent.DOM_VK_A:case KeyEvent.DOM_VK_NUMPAD4:tag_show_galleries();cancelEvent(b);break;case KeyEvent.DOM_VK_W:case KeyEvent.DOM_VK_NUMPAD8:tag_vote_up();cancelEvent(b);break;case KeyEvent.DOM_VK_S:case KeyEvent.DOM_VK_NUMPAD2:tag_vote_down();cancelEvent(b);break;case KeyEvent.DOM_VK_SPACE:case KeyEvent.DOM_VK_NUMPAD5:toggle_tagmenu(undefined,undefined);cancelEvent(b);break}}};
var b = document.createElement('button');
b.onclick=function() {
(function($) {
    "use strict";

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
        $.getScript('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.min.js')
            .done(function() {
                // run our functions from here
                $.getScript('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe-ui-default.min.js')
                    .done(function() {
                        $('<link/>', {
                            rel: 'stylesheet',
                            type: 'text/css',
                            href: 'https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.css'
                        }).appendTo('head');
                        $('<link/>', {
                            rel: 'stylesheet',
                            type: 'text/css',
                            href: 'https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/default-skin/default-skin.css'
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
            //console.log(items);
            // define options (if needed)
            var options = {
                // optionName: 'option value'
                // for example:
                index: 0 // start at first slide
            };

            // Initializes and opens PhotoSwipe
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
            //window.gallery = gallery;
            //console.log('Everything\'s good');
        }
    }
}(window.jQuery));
};
b.innerText = 'Read Now 3'
document.getElementById('gd5').appendChild(b);

var c = document.createElement('div', { 'style': 'position: fixed; bottom: 0; width: 100%; background: black; color: white' });
document.body.appendChild(c);

