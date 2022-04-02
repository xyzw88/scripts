/*    'use strict';*/
var app = angular.module('app', ['ng', 'ngRoute', 'ui.bootstrap']);

// 路由
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl'
        })
        .when('/home/:coluId', {
            templateUrl: 'tpl/home.html',
            controller: 'homeCtrl'
        })
        // 文章详情
        .when('/detail', {
            templateUrl: 'tpl/components/detail.html',
            controller: 'detailCtrl',
            cache: false
        })
        .when('/detail/:fileId', {
            templateUrl: 'tpl/components/detail.html',
            controller: 'detailCtrl',
            cache: false
        })
        // 组图详情
        .when('/detailPicture', {
            templateUrl: 'tpl/components/multipuDetail.html',
            controller: 'detailCtrl'
        })
        .when('/detailPicture/:fileId', {
            templateUrl: 'tpl/components/multipuDetail.html',
            controller: 'detailCtrl'
        })
        // 活动进行中详情
        .when('/actIng', {
            templateUrl: 'tpl/components/detailActCtrl.html',
            controller: 'detailActCtr',
            cache: false
        })
        .when('/actIng/:fileId', {
            templateUrl: 'tpl/components/detailActCtrl.html',
            controller: 'detailActCtr',
            cache: false
        })
        // 活动未开始已结束详情
        .when('/actNoSt', {
            templateUrl: 'tpl/components/actNoStart.html',
            controller: 'detailActCtr',
            cache: false
        })
        .when('/actNoSt/:fileId', {
            templateUrl: 'tpl/components/actNoStart.html',
            controller: 'detailActCtr',
            cache: false
        })
        //直播
        .when('/detailLive', {
            templateUrl: 'tpl/components/detailLiveCtrl.html',
            controller: 'detailLiveCtrl'
        })
        .when('/detailLive/:linkID', {
            templateUrl: 'tpl/components/detailLiveCtrl.html',
            controller: 'detailLiveCtrl'
        })
        .when('/detailLive/:fileId/:linkID', {
            templateUrl: 'tpl/components/detailLiveCtrl.html',
            controller: 'detailLiveCtrl'
        })
        //专题
        .when('/speci', {
            templateUrl: 'tpl/components/speci.html',
            controller: 'specCtrl'
        })
        .when('/speci/:fileId/:linkID', {
            templateUrl: 'tpl/components/speci.html',
            controller: 'specCtrl'
        })
        //专题2
        .when('/detailSpec', {
            templateUrl: 'tpl/components/detailSpec.html',
            controller: 'detailSpecCtr'
        })
        .when('/detailSpec/:columnId', {
            templateUrl: 'tpl/components/detailSpec.html',
            controller: 'detailSpecCtr'
        })
        //视频
        .when('/detailVideo', {
            templateUrl: 'tpl/components/detaVed.html',
            controller: 'detailVedioCtr'
        })
        .when('/detailVideo/:fileId', {
            templateUrl: 'tpl/components/detaVed.html',
            controller: 'detailVedioCtr'
        })
        //首页推荐
        .when('/moreModule', {
            templateUrl: 'tpl/components/moreModule.html',
            controller: 'moreModuleCtr'
        })
        .when('/moreModule/:moduleId', {
            templateUrl: 'tpl/components/moreModule.html',
            controller: 'moreModuleCtr'
        })
        //全局搜索
        .when('/search', {
            templateUrl: 'tpl/components/searchContents.html',
            controller: 'moreModuleCtr'
        })
        .otherwise({ redirectTo: '/home' });
});

app.controller('parentCtrl',
    ['$scope', '$location', '$http', '$rootScope', '$routeParams', '$sce', '$window', '$interval', function ($scope, $location, $http, $rootScope, $routeParams, $sce, $window, $interval) {
        //活动状态判断
        $scope.curreTime = new Date().getTime();
        $scope.timeTransform = function (time) {
            return new Date(time).getTime();
        };
        // 首页的columnId
        $scope.idds= 74
        //loading提示
        $("#globalLoading").css({ opacity: '1' });

        $scope.sceControl = $sce.trustAsResourceUrl;
        $scope.jump = function (arg) {
            $("body").animate({ scrollTop: 0 }, 300);
            $location.path(arg, { cache: true }, { reload: true });
        };

        //h5稿件跳转
        $scope.h5Jump = function (argUrl, articleId) {
            //点击数 阅读数统计
            _commonMethods.statistical({id: articleId});
            if (argUrl.indexOf('uid=') > -1) {
                argUrl = argUrl + doGetCookie('uid_fouNder');
            }
            window.open(argUrl, '_blank')
        };

        //文章详情组图新窗口打开
        $scope.detail = function (fileId) {
            localStorage.setItem("loadKey", currentPageId);
            //全局分享和跳转链接
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            window.open(url + '/detail/' + fileId, '_blank')
        };
        //文章详情组图新窗口打开
        $scope.detailPicture = function (fileId) {
            localStorage.setItem("loadKey", currentPageId);
            //全局分享和跳转链接
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            window.open(url + '/detailPicture/' + fileId, '_blank')
        };
        //活动详情新窗口打开（未开始和已结束）
        $scope.detailActNoStart = function (fileId) {
            localStorage.setItem("loadKey", currentPageId);
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            window.open(url + '/actNoSt/' + fileId, '_blank')
        };
        //活动详情新窗口打开（活动进行中ng）
        $scope.detailActIng = function (fileId) {
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            localStorage.setItem("loadKey", currentPageId);
            window.open(url + '/actIng/' + fileId, '_blank')
        };
        //专题详情页1
        $scope.detailSpeci = function (fileId) {
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            localStorage.setItem("loadKey", currentPageId);
            window.open(url + '/speci/' + fileId, '_blank')
        };
        //专题详情页2
        $scope.detailSpecTwo = function (fileId) {
            localStorage.setItem("loadKey", currentPageId);
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            window.open(url + '/detailSpec/' + fileId, '_blank')
        };
        //视频详情新窗口打开
        $scope.detailVideo = function (fileId) {
            localStorage.setItem("loadKey", currentPageId);
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            window.open(url + '/detailVideo/' + fileId, '_blank')
        };
        //直播详情新窗口打开
        $scope.detailLive = function (fileId) {
            var curPaht = window.location.href;
            var indexSpac = curPaht.indexOf("#");
            var url = curPaht.slice(0, indexSpac + 1);
            localStorage.setItem("loadKey", currentPageId);
            window.open(url + '/detailLive/' + fileId, '_blank')
        };

        //评论点击跳转到指定位置
        $scope.commentJump = function () {
            if ($scope.siteConfigAuditType == 2 || $scope.currentDiscussClosed == 1) {
                return
            } else if ($scope.siteConfigAuditType != 2 && $scope.currentDiscussClosed != 1) {
                var scrollDistance = $(".commet_count").offset().top;
                $("body").animate({ scrollTop: scrollDistance }, 300);
            }

        };
        //评论点赞图标
        $scope.commentImg = function (list) {
            setTimeout(function() {
                $.each(list, function(index, val) {
                    if (doGetCookie('articleIdComm' + val.id)) {
                        $('.comm_hot_con img[data-id="' + val.id + '"]').prop('src', 'static/thuAc.png');
                    } else {
                        $('.comm_hot_con img[data-id="' + val.id + '"]').prop('src', 'static/thub.png');
                    }
                    if (val.topDiscuss && val.topDiscuss.list) {
                        $.each(val.topDiscuss.list, function(index, val) {
                            if (doGetCookie('articleIdComm' + val.id)) {
                                $('.comm_hot_con img[data-id="' + val.id + '"]').prop('src', 'static/thuAc.png');
                            } else {
                                $('.comm_hot_con img[data-id="' + val.id + '"]').prop('src', 'static/thub.png');
                            }
                        });
                    }
                });
            }, 350); 
        }
        //回到顶部
        $(".baToTop").hide();
        //注释($(".baToTop"))
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 0) {
                $(".baToTop").show();
            } else {
                $(".baToTop").hide();
            }
        });
        
        $scope.goBackTop = function () {
            // 这是jq的写法
            // $("body").animate({scrollTop: 0}, 300);
            // 这是angular的写法
            angular.element("html,body").animate({ scrollTop: 0 }, 300);
        };

        //文章详情刷新
        $scope.refreshDetailAll = function () {
            location.reload(true)
        };

        //获取全局配置信息
        $scope.getCommentInfo = function () {
            $http.jsonp(commInfo + '&jsoncallback=JSON_CALLBACK'
            ).success(function (data, header, config, status) {
                if (data.siteConfig.discuss) {
                    $scope.siteConfig = data.siteConfig.discuss;
                    //评论框提示语
                    siteConfig.defaultHint = $scope.siteConfig.defaultHint;
                    //官方评论用户名
                    siteConfig.defaultName = $scope.siteConfig.defaultName;
                    $scope.defaultName = $scope.siteConfig.defaultName;
                    //官方评论头像
                    siteConfig.defaultIcon = $scope.siteConfig.defaultIcon;
                    $scope.siteConfigDefaultIcon = $scope.siteConfig.defaultIcon;
                    //是否关闭全站评论功能
                    $scope.siteConfigAuditType = $scope.siteConfig.auditType;
                    //全局评论颜色问题
                    $scope.commStyleColor = $scope.siteConfig.styleColor;
                    commentStyle = $scope.commStyleColor;
                    $rootScope.changeComStyle();

                    //评论是否允许上传图片
                    $scope.commentShowPic = data.siteConfig.discuss.showPic;
                } else {
                    //评论框提示语
                    siteConfig.defaultHint = "评论一下吧";
                    //官方评论用户名
                    siteConfig.defaultName = "官方评论";
                    $scope.defaultName = "官方评论";
                    //官方评论头像
                    siteConfig.defaultIcon = 'static/58.png';
                    $scope.siteConfigDefaultIcon = 'static/58.png';
                    //是否关闭全站评论功能
                    $scope.siteConfigAuditType = 1;
                    //全局评论颜色问题
                    $scope.commStyleColor = "black";
                    commentStyle = "black";
                    $rootScope.changeComStyle();

                    //评论是否允许上传图片
                    $scope.commentShowPic = true;
                }
                if (data) {
                    if(/Android|webOS|iPhone|iPad|Macintosh|iPod|BlackBerry/i.test(navigator.userAgent)) {
                        //说明是移动端
                        if (location.hash && location.hash.split('/')) {
                            var mType = location.hash.split('/')[1];
                            var mFileId= location.hash.split('/')[2];
                            var mTwoId= location.hash.split('/')[3];
                            var templateURL = data.templateURL;
                            switch (mType) {
                                case 'detail':
                                    location.href = templateURL + '/dist/index.html#/newsDetail/' + mFileId + '/0?isShare=true';
                                    break;
                                case 'detailPicture':
                                    location.href = templateURL + '/dist/index.html#/imageDetail/' + mFileId + '/0?isShare=true';
                                    break;
                                case 'detailVideo':
                                    location.href = templateURL + '/dist/index.html#/videoDetail/' + mFileId + '/0?isShare=true';
                                    break;
                                case 'detailLive':
                                    location.href = templateURL + '/dist/index.html#/liveDetail/' + mFileId + '/' + mTwoId + '?isShare=true';
                                    break;
                                case 'speci':
                                    location.href = templateURL + '/dist/index.html#/specDetail/' + mFileId + '/' + mTwoId + '?isShare=true';
                                    break;
                                default:
                                    location.href = templateURL + '/dist/index.html';
                                    break;
                            }
                        }
                    }
                }
            }).error(function (data, header, config, status) {
            });
        };
        $scope.getCommentInfo();

        //导航栏全部按钮显示与隐藏
        $scope.showNavChannelList = true;
        // 获取导航cache:true
        $scope.getNavCou = function () {
            $http.jsonp(navUrl + '&jsoncallback=JSON_CALLBACK'
            ).success(function (data, header, config, status) {
                $scope.navData = data;
                window.firstPageColumns = data.columns[0].columnId;
                //只需要显示指定栏目类型
                for (var i = 0; i < data.columns.length; i++) {
                    if (data.columns[i].columnStyle == '101' || data.columns[i].columnStyle == '225' || data.columns[i].columnStyle == '201' || data.columns[i].columnStyle == '203' || data.columns[i].columnStyle == '202' || data.columns[i].columnStyle == '221' || data.columns[i].columnStyle == '227') {
                        navArr.push(data.columns[i])
                    }
                }
                //循环完成后如果导航栏的个数小于8，隐藏全部按钮
                if (navArr.length < 13) {
                    $scope.showNavChannelList = false;
                }

                //获取应该显示的栏目id
                var loadNavColu = localStorage.getItem("loadKey");
                $http.jsonp(navAllUrl + '&jsoncallback=JSON_CALLBACK')
                .success(function (data, header, config, status) {
                    for (var i = 0; i < data.columns.length; i++) {
                        if (data.columns[i].columnId == 10631) {
                            $scope.navData.columns.push(data.columns[i]);
                            navArr.push(data.columns[i]);
                            if (loadNavColu) {
                                $scope.chanNav(loadNavColu);
                            } else {
                                $scope.chanNav(firstPageColumns);
                            }
                        }
                    }
                });
            }).error(function (data, header, config, status) {
            });
        };
        $scope.getNavCou();

        //获取排行榜
        $scope.getRankTop10 = function () {
            $http.jsonp(rankDataUrl + '&jsoncallback=JSON_CALLBACK'
            ).success(function (data, header, config, status) {
                $scope.rankHotData = []
                if(data && data.list){
                    $scope.rankHotData = data.list.splice(0, Math.min(data.list.length,10))
                }
            }).error(function (data, header, config, status) {
            });
        }
        $scope.getRankTop10();
         //获取视频直播排行榜
         $scope.articleHotVideoFun = function () {
            $http.jsonp(articleHotVideo + '&articleType=6&columnId=76&jsoncallback=JSON_CALLBACK'
            ).success(function (data, header, config, status) {
                $scope.articleHotVideo = []
                if(data && data.list){
                    $scope.articleHotVideo = data.list.splice(0, Math.min(data.list.length,4))
                }
            }).error(function (data, header, config, status) {
            });
        }
        $scope.articleHotVideoFun();
        // 根据不同的类型，去不同的详情页
        $scope.toScriptDetail = function (item) {
            switch(item.articleType){
                case 0: $scope.detail(item.fileId); break;
                case 3: $scope.detailSpeci(item.fileId+'/'+item.linkID); break;
                case 1: $scope.detailPicture(item.fileId); break;
                case 4: $scope.h5Jump(item.url); break;
                case 6: $scope.detailLive(item.fileId+'/'+item.linkID); break;
                case 2: $scope.detailVideo(item.fileId); break;
                default: $scope.detail(item.fileId);
            }
        }
        window.timer_founder = function () {
            //用户是否已登录
            window.stopTimer_Founder = $interval(function () {
                $scope.uid_fouNder = doGetCookie('uid_fouNder');
                uid_fouNder = doGetCookie('uid_fouNder');
                mid_fouNder = doGetCookie('mid_fouNder');
                username_fouNder = doGetCookie('username_fouNder');
                $scope.username_fouNder = doGetCookie('username_fouNder');
                username_fouNder = doGetCookie('username_fouNder');
                if (!$scope.uid_fouNder) {
                } else {
                    if (doGetCookie('mid_fouNder') != undefined || doGetCookie('mid_fouNder') != null || doGetCookie('mid_fouNder') != '') {
                        var mid = doGetCookie('mid_fouNder');
                        $('.userPhtons img').attr('src', amucUrl + 'member/getPortrait?uid=' + mid);
                    }
                    //取消定时器
                    $interval.cancel(window.stopTimer_Founder)
                }
            }, 3000);
        };
        timer_founder();
        // 点击导航更新视图根据点击传入columId号
        bannerCount = 0;
        // 轮播图个数
        $scope.chanNav = function (coluId) {
            //记录id方便加载更多使用
            $scope.currentPageId = coluId;
            localStorage.setItem("loadKey", coluId);
            //测试
            currentPageId = coluId;
            var navIndex = lightIndex;
            for (var i = 0; i < navArr.length; i++) {
                if (coluId == navArr[i].columnId) {
                    navIndex = i;
                    lightIndex = navIndex;
                    break;
                }
            }

            $(".homeNavTextUl li").eq(navIndex).siblings().css({ color: '#ffffff', fontSize: '0.18rem' });
            $(".homeNavTextUl li").each(function (index, element) {
                $(element).css("background", "#df0a20");
            });
            $("#homeNavChannelTextUl li").each(function (index, element) {
                $(element).css("background", "#ffffff");
                $(element).find('a').css({ color: "#000000", fontSize: '0.18rem' });
            });
            $(".homeNavTextUl li").eq(navIndex).css({ color: '#ffffff', fontSize: '0.18rem', background: "#C70014" });
            $("#homeNavChannelTextUl li").eq(lightIndex).css({ background: "#C70014" });
            $("#homeNavChannelTextUl li").eq(lightIndex).find('a').css({ color: "#ffffff", fontSize: '0.18rem' });
            ////导航栏点击移动的位置
            //if($('#homeNavTextUl li').length-navIndex>7){
            //    var ulMoveLeft=0.11*navIndex;
            //    $("#homeNavTextUl").animate({left:-ulMoveLeft+'rem'},500);
            //}

            //轮播js
            $scope.myInterval = 2000;
            $scope.noWrapSlides = false;
            $scope.active = 0;

            //判断是否有轮播图看topCount,决定是否隐藏banner
            $http.jsonp(navUrl + '&jsoncallback=JSON_CALLBACK'
            ).success(function (data, header, config, status) {
                $scope.columDataAll = data;
                var datlist = $scope.columDataAll.columns;
                for (var i = 0; i < datlist.length; i++) {
                    if (datlist[i].columnId == coluId || coluId == 10631) {
                        //根据columnStyle判断加载哪种模板
                        if(coluId == 10631) {
                            $scope.columnStyle = 225;
                        } else {
                            $scope.columnStyle = datlist[i].columnStyle;
                        }
                        if (!datlist[i].topCount) {
                            $scope.topCountShow = false;
                            getlist();
                        } else if (datlist[i].topCount) {
                            // 轮播图个数
                            bannerCount = datlist[i].topCount;
                            // 含有轮播图处理,只从前20条拿取还是所有数据中判断？？目前是前20条，如果是所有，下面链接换成所有数据请求链接
                            $http.jsonp(articalDataUrl + 'columnId=' + coluId + '&lastFileId=0&page=0&version=0&jsoncallback=JSON_CALLBACK'
                            ).success(function (datas, header, config, status) {
                                if(datas){
                                    if(datas.carousel&&datas.carousel.length){
                                        $scope.bannerObj = datas.carousel;
                                        $scope.topCountShow = true;
                                    }else{
                                        $scope.bannerObj=[];
                                        $scope.topCountShow = false;
                                    }
                                };
                                getlist();
                            }).error(function (data1, header, config, status) {
                            });
                        }
                    }
                }

                //实现跳转，获取稿件数据,需要先去除轮播图含有的对象，如果直播活动也放在里面？也要切除轮播图中的数据columnId='+coluId +'&lastFileId=0&count=20&rowNumber=0&version=0&jsoncallback=JSON_CALLBACK
                function getlist() {
                    $http.jsonp(articalDataUrl + 'columnId=' + coluId + '&page=0&lastFileId=0&jsoncallback=JSON_CALLBACK'
                    ).success(function (data, header, config, status) {

                        // 插入模块
                        $scope.modules = data.modules;
                        var parentMudulesObj = $scope.modules;
                        // 实际模块个数，决定滑块个数,决定是否显示
                        $scope.infaceModules = [];
                        //判断实际个数，只要type=0的普通类型稿件
                        for (var n = 0; n < parentMudulesObj.length; n++) {
                            if (parentMudulesObj[n].type == 0) {
                                $scope.infaceModules.push(parentMudulesObj[n]);
                                window.infaceModules.push(parentMudulesObj[n]);
                            }
                        }

                        //根据moduleID关联拿取数据
                        //创建最终返回数据对象数据
                        $scope.childGetMouds = [];
                        for (var p = 0; p < $scope.infaceModules.length; p++) {
                            (function (p) {
                                $http.jsonp(moduleView + 'id=' + $scope.infaceModules[p].moduleID + '&userID=3&jsoncallback=JSON_CALLBACK'
                                ).success(function (modulData, header, config, status) {
                                    $scope.childGetMouds[p] = modulData;
                                    window.childGetMouds[p] = modulData;
                                });
                            })(p);
                        }
                        if (p == $scope.infaceModules.length) {

                        }

                        //切除banner对象，普通稿件数据
                        var datas = data.list;
                        if (bannerCount) {
                            // 新增 if($scope.bannerObj)
                            if ($scope.bannerObj) {
                                for (var i = 0; i < $scope.bannerObj.length; i++) {
                                    for (var j = 0; j < datas.length; j++) {
                                        if (datas[j].fileId == $scope.bannerObj[i].fileId) {
                                            datas.splice(j, 1);
                                        }
                                    }
                                }
                            }

                        }
                        //普通稿件切换banner对象后数据
                        // if ($scope.columnStyle != 221 && $scope.columnStyle != 225 && $scope.columnStyle != 203) {
                            $scope.Hdata = datas; //所有数据中去除banner中对象
                            //大于20条有加载更多功能
                            if ($scope.Hdata.length + bannerCount >= 20) {
                                //加载更多页数设置为0
                                artiPageNum = 0;
                                //显示加载更多按钮
                                $scope.loadMoreButtonOne = true;
                                $scope.noLoadMoreButton = false;
                                //最后一篇文章id号
                                $scope.lastArticlFileId = $scope.Hdata[$scope.Hdata.length - 1].fileId;
                                // 文章页数
                            } else {
                                $scope.noLoadMoreButton = true;
                                $scope.loadMoreButtonOne = false;
                            }
                        // }
                        //直播切换banner对象后数据
                        if ($scope.columnStyle != 203) {
                            if ($scope.columnStyle == 101) {
                                $http
                                .jsonp(articalDataUrl + 'columnId=' + 10631 + '&page=0&lastFileId=0&jsoncallback=JSON_CALLBACK')
                                .success(function (data, header, config, status) {
                                    $scope.Livedata = data.list;
                                    //加载更多页数设置为0
                                    livePageNum = 0;
                                    if ($scope.Livedata.length + bannerCount >= 20) {
                                        $scope.lastLiveFileId = $scope.Livedata[$scope.Livedata.length - 1].fileId;
                                        //显示直播加载更多按钮
                                        // $scope.loadMoreButtonOne = true;
                                        // $scope.noLoadMoreButton = false;
                                    } else {
                                        // $scope.noLoadMoreButton = true;
                                        // $scope.loadMoreButtonOne = false;
                                    }
                                })
                            } else {
                                $scope.Livedata = datas;
                                //加载更多页数设置为0
                                livePageNum = 0;
                                if ($scope.Livedata.length + bannerCount >= 20) {
                                    $scope.lastLiveFileId = $scope.Livedata[$scope.Livedata.length - 1].fileId;
                                    //显示直播加载更多按钮
                                    // $scope.loadMoreButtonOne = true;
                                    // $scope.noLoadMoreButton = false;
                                } else {
                                    // $scope.noLoadMoreButton = true;
                                    // $scope.loadMoreButtonOne = false;
                                }
                            }
                        }
                        //视频切换banner对象后数据
                        if ($scope.columnStyle != 225) {
                            vedioPageNum = 0;
                            if($scope.columnStyle == 101){
                                /* $http
                                .jsonp(articalDataUrl + 'columnId=' + 50 + '&page=0&lastFileId=0&jsoncallback=JSON_CALLBACK')
                                .success(function (data, header, config, status) {
                                    $scope.vedioData = data.list;
                                      //最后视频id
                                    if ($scope.vedioData.length + bannerCount >= 20) {
                                        $scope.lastVedioFileId = $scope.vedioData[$scope.vedioData.length - 1].fileId;
                                        //显示直播加载更多按钮
                                        // $scope.loadMoreButtonOne = true;
                                        // $scope.noLoadMoreButton = false;
                                    } else {
                                        // $scope.loadMoreButtonOne = false;
                                        // $scope.noLoadMoreButton = true;
                                    }
                                }) */
                            }else{
                                $scope.vedioData = datas;
                                  //最后视频id
                                if ($scope.vedioData.length + bannerCount >= 20) {
                                    $scope.lastVedioFileId = $scope.vedioData[$scope.vedioData.length - 1].fileId;
                                    //显示直播加载更多按钮
                                    // $scope.loadMoreButtonOne = true;
                                    // $scope.noLoadMoreButton = false;
                                } else {
                                    // $scope.loadMoreButtonOne = false;
                                    // $scope.noLoadMoreButton = true;
                                }
                            }
        
                        }

                    }).error(function (data, header, config, status) {
                    });
                }

                if ($scope.columnStyle == 221) {
                    //活动列表数据
                    $http.jsonp(actDataUrl + 'page=0&siteID=' + siteId + '&jsoncallback=JSON_CALLBACK'
                    ).success(function (data) {

                        $scope.ActHdata = data.list;
                        if ($scope.ActHdata.length + bannerCount >= 20) {
                            //显示直播加载更多按钮
                            $scope.actPageNumb = 1;
                            // $scope.loadMoreButtonOne = true;
                            // $scope.noLoadMoreButton = false;
                        } else {
                            // $scope.noLoadMoreButton = true;
                            // $scope.loadMoreButtonOne = false;
                        }
                    }).error(function (data, header, config, status) {
                    });
                };

            }).error(function (data, header, config, status) {
            });

            //loading提示
            $("#globalLoading").animate({
                opacity: '0'
            }, 500);

            global_data.currColumnId = coluId;
        };
        //切换栏目
        $scope.changeNav = function(coluId){
            $scope.chanNav(coluId);
            $scope.getRankTop10();
            $scope.jump('/home/'+coluId);
            // 切换的时候把columnId赋值
            $scope.idds= coluId
            try{
                if(window._myScroll && coluId){
                    window._myScroll.scrollToElement('#nav_li_' + coluId, 500);
                }
            }catch(e){}
        }

        artiPageNum = 0;
        //加载更多按钮
        $scope.loadMore = function (coluId, columnStyle) {
            //loading提示
            $("#globalLoading").css({
                opacity: '1'
            });
            artiPageNum++;
            // 活动视频直播调用接口不同，要做判断
            if (columnStyle != 221 && columnStyle != 225 && columnStyle != 203 && columnStyle != 202) {
                $http.jsonp(articalDataUrl + 'columnId=' + coluId + '&page=' + artiPageNum + '&lastFileId=' + $scope.lastArticlFileId + '&jsoncallback=JSON_CALLBACK'
                ).success(function (data, header, config, status) {
                    $scope.lastArticlFileId = data.list[data.list.length - 1].fileId;
                    $scope.Hdata = $scope.Hdata.concat(data.list);
                    if (data.list.length < 20) {
                        //没有更多，隐藏按钮
                        $scope.loadMoreButtonOne = false;
                        $scope.noLoadMoreButton = true;
                    } else {
                        $scope.loadMoreButtonOne = true;
                        $scope.noLoadMoreButton = false;
                    }

                }).error(function (data, header, config, status) {
                });
            }
            if (columnStyle == 225) {
                //直播列表
                livePageNum++;
                $http.jsonp(liveDataUrl + 'columnId=' + coluId + '&page=' + livePageNum + '&lastFileId=' + $scope.lastLiveFileId + '&jsoncallback=JSON_CALLBACK'
                ).success(function (data, header, config, status) {
                    $scope.Livedata = $scope.Livedata.concat(data.list);
                    $scope.lastLiveFileId = data.list[data.list.length - 1].fileId;
                    if (data.list.length < 20) {
                        //     //没有更多，隐藏按钮
                        $scope.loadMoreButtonOne = false;
                        $scope.noLoadMoreButton = true;
                    } else {
                        $scope.loadMoreButtonOne = true;
                        $scope.noLoadMoreButton = false;
                    }
                }).error(function (data, header, config, status) {
                });
            }
            else if (columnStyle == 203) {
                //视频列表数据
                vedioPageNum++;
                $http.jsonp(vedioDataUrl + 'columnId=' + coluId + '&page=' + vedioPageNum + '&lastFileId=' + $scope.lastVedioFileId + '&jsoncallback=JSON_CALLBACK'
                ).success(function (data, header, config, status) {
                    $scope.vedioData = $scope.vedioData.concat(data.list);
                    $scope.lastVedioFileId = data.list[data.list.length - 1].fileId;
                    if (data.list.length < 20) {
                        //     //没有更多，隐藏按钮
                        $scope.loadMoreButtonOne = false;
                        $scope.noLoadMoreButton = true;
                    } else {
                        $scope.loadMoreButtonOne = true;
                        $scope.noLoadMoreButton = false;
                    }
                }).error(function (data, header, config, status) {
                });
            }
            else if (columnStyle == 202) {
                $http.jsonp(articalDataUrl + 'columnId=' + coluId + '&page=' + artiPageNum + '&lastFileId=' + $scope.lastArticlFileId + '&jsoncallback=JSON_CALLBACK'
                ).success(function (data, header, config, status) {
                    $scope.lastArticlFileId = data.list[data.list.length - 1].fileId;
                    $scope.Hdata = $scope.Hdata.concat(data.list);
                    if (data.list.length < 20) {
                        //没有更多，隐藏按钮
                        $scope.loadMoreButtonOne = false;
                        $scope.noLoadMoreButton = true;
                    } else {
                        $scope.loadMoreButtonOne = true;
                        $scope.noLoadMoreButton = false;
                    }

                }).error(function (data, header, config, status) {
                });
            }
            else if (columnStyle == 221) {
                //活动列表数据
                $http.jsonp(actDataUrl + 'page=' + $scope.actPageNumb + '&siteID=' + siteId + '&jsoncallback=JSON_CALLBACK'
                ).success(function (data, header, config, status) {
                    $scope.ActHdata = $scope.ActHdata.concat(data.list);
                    if (data.list.length < 20) {
                        //     //没有更多，隐藏按钮
                        $scope.loadMoreButtonOne = false;
                        $scope.noLoadMoreButton = true;
                    } else {
                        $scope.loadMoreButtonOne = true;
                        $scope.noLoadMoreButton = false;
                    }
                    $scope.actPageNumb++;
                }).error(function (data, header, config, status) {
                });
            }

            //loading提示
            $("#globalLoading").animate({
                opacity: '0'
            }, 500);

        };


        //跳转回主页
        $scope.home = function () {
            $scope.chanNav(firstPageColumns);
            try{
                if(window._myScroll && firstPageColumns){
                    window._myScroll.scrollToElement('#nav_li_' + firstPageColumns, 500);
                }
            }catch(e){}
            $location.path('/home', { cache: true }, { reload: true });
        }

        //频道回退按钮
        $scope.goBack = function () {
            $window.history.back();
        }

        //全局详情展开功能
        window.detailLaunch = function () {
            $(".detailConStyle").removeClass('detailsHidde');
            $('.DetailConMor').css("display", "none");
        };

        // 点赞收藏初始图标
        $rootScope.detailAddPraseImag = "static/13.png";
        $rootScope.detailAddStorImag = "static/15.png";
        //点赞小图标
        $rootScope.detailAddPraseImagSmall = "static/thub.png";
        $rootScope.detailAddStorImagSmall = "static/18.png";

        $scope.hasMoreSearch = false;
        $scope.nohasMoreSearch = false;
        //全局搜索
        var searchStart = 0, searchStartCount = 20;
        $scope.serchAtr = function () {
            // if ($scope.showSerInput) {
                // if ($("#artSearch").val()) {
                    searchStart = 0;
                    searchStartCount = 20;
                    //搜索数据artSearVal
                    var artSearchVal = $("#artSearch").val();
                    //判空，这里如果输入为空则不检索
                    if(!artSearchVal){
                      $("#artSearch").focus();
                      return false;
                    }
                    $location.path('/search');
                    sessionStorage.setItem("artSearch", artSearchVal)
                    $scope.artSearVal = sessionStorage.getItem("artSearch");
                    $http.jsonp(articalSearch + '&key=' + $scope.artSearVal + '&start=0&count=20&jsoncallback=JSON_CALLBACK'
                    ).success(function (data, header, config, status) {
                        $scope.serchHdata = data;
                        //大于20条可以显示加载更多按钮
                        if (data.length > 0) {
                            $scope.hasMoreSearch = true;
                            $scope.nohasMoreSearch = false;
                        } else {
                            $scope.hasMoreSearch = false;
                            $scope.nohasMoreSearch = true;
                        }
                        searchArr = $scope.serchHdata;
                        // $scope.showSerInput = false;
                        $("#artSearch").val("");
                    }).error(function (data, header, config, status) {
                    });
                // } else {
                //     //alert("请输入需要搜索的内容");
                //     $scope.showSerInput = false;
                // }

            // } else {

            //     $scope.showSerInput = true;
            // }

        }

        //全局搜索加载更多
        $scope.serchAtrLoadMore = function () {
            searchStart += 20;
            $http.jsonp(articalSearch + '&key=' + $scope.artSearVal + '&start=' + searchStart + '&count=' + searchStartCount + '&jsoncallback=JSON_CALLBACK'
            ).success(function (data, header, config, status) {
                $scope.serchHdata = $scope.serchHdata.concat(data);
                //大于20条可以显示加载更多按钮
                if (data.length > 0) {
                    $scope.hasMoreSearch = true;
                    $scope.nohasMoreSearch = false;
                } else {
                    $scope.hasMoreSearch = false;
                    $scope.nohasMoreSearch = true;
                }
            }).error(function (data, header, config, status) {
            });

        };

        //全局搜索刷新功能

        if (sessionStorage.getItem("artSearch")) {
            $scope.artSearVal = sessionStorage.getItem("artSearch");
            $http.jsonp(articalSearch + '&key=' + $scope.artSearVal + '&start=0&count=20&jsoncallback=JSON_CALLBACK'
            ).success(function (data, header, config, status) {
                $scope.serchHdata = data;
                //大于20条可以显示加载更多按钮
                if (data.length > 0) {
                    $scope.hasMoreSearch = true;
                    $scope.nohasMoreSearch = false;
                } else {
                    $scope.hasMoreSearch = false;
                    $scope.nohasMoreSearch = true;
                }
                searchArr = $scope.serchHdata;
                // $scope.showSerInput = false;
                $("#artSearch").val("");
            }).error(function (data, header, config, status) {
            });
        }


        //全局样式，没有评论的情况下需要添加的颜色
        $rootScope.changeComStyle = function () {
            if (commentStyle == 'blue') {
                $('.detailActComm span').css({ borderLeft: "2px solid #2E97E9", color: '#2E97E9' });
                $('.commt_con a').each(function () {
                    $(this).css({ color: '#2E97E9' })
                })
                $('#commt_com_repla a').each(function () {
                    $(this).css({ color: '#2E97E9' })
                })
                $('.com-childen-more').each(function () {
                    $(this).css({ color: '#2E97E9' })
                })
                $('.comm_heade_btn button').css({ background: '#2E97E9' });
                $('.reportComText button').css({ background: '#2E97E9' });
                $('.reportComTextReply button').css({ background: '#2E97E9' });
                $('.comBtnTwo').css({ border: '1px solid #2E97E9', color: '#2E97E9' })
                $('#commeInputs').css({ border: '1px solid #2E97E9' })
                $('.commet_count_num').css({ color: '#2E97E9' })
                $('.comm_hot_tit a').css({ color: '#2E97E9' })
            } else if (commentStyle == 'red') {

                $('.detailActComm span').css({ borderLeft: "2px solid #f24548", color: '#f24548' });
                $('.commt_con a').each(function () {
                    $(this).css({ color: '#f24548' })
                })
                $('#commt_com_repla a').each(function () {
                    $(this).css({ color: '#f24548' })
                })
                $('.com-childen-more').each(function () {
                    $(this).css({ color: '#f24548' })
                })
                $('.comm_heade_btn button').css({ background: '#f24548' });
                $('.reportComText button').css({ background: '#f24548' });
                $('.reportComTextReply button').css({ background: '#f24548' });
                $('.comBtnTwo').css({ border: '1px solid #f24548', color: '#f24548' })
                $('#commeInputs').css({ border: '1px solid #f24548' })
                $('.commet_count_num').css({ color: '#f24548' })
                $('.comm_hot_tit a').css({ color: '#f24548' })
            } else if (commentStyle == 'orange') {
                $('.detailActComm span').css({ borderLeft: "2px solid #fdb92c", color: '#fdb92c' });
                $('.commt_con a').each(function () {
                    $(this).css({ color: '#fdb92c' })
                })
                $('#commt_com_repla a').each(function () {
                    $(this).css({ color: '#fdb92c' })
                })
                $('.com-childen-more').each(function () {
                    $(this).css({ color: '#fdb92c' })
                })
                $('.comm_heade_btn button').css({ background: '#fdb92c' });
                $('.reportComText button').css({ background: '#fdb92c' });
                $('.reportComTextReply button').css({ background: '#fdb92c' });
                $('.comBtnTwo').css({ border: '1px solid #fdb92c', color: '#fdb92c' })
                $('#commeInputs').css({ border: '1px solid #fdb92c' })
                $('.commet_count_num').css({ color: '#fdb92c' })
                $('.comm_hot_tit a').css({ color: '#fdb92c' })
            } else if (commentStyle == 'black') {
                $('.detailActComm span').css({ borderLeft: "2px solid black", color: 'black' });
                $('.commt_con a').each(function () {
                    $(this).css({ color: 'black' })
                })
                $('#commt_com_repla a').each(function () {
                    $(this).css({ color: 'black' })
                })
                $('.com-childen-more').each(function () {
                    $(this).css({ color: 'black' })
                })
                $('.comm_heade_btn button').css({ background: 'black' });
                $('.reportComText button').css({ background: 'black' });
                $('.reportComTextReply button').css({ background: 'black' });
                $('.comBtnTwo').css({ border: '1px solid black', color: 'black' })
                $('#commeInputs').css({ border: '1px solid black' })
                $('.commet_count_num').css({ color: 'black' })
                $('.comm_hot_tit a').css({ color: 'black' })
            } else if (commentStyle == 'green') {
                $('.detailActComm span').css({ borderLeft: "2px solid #5ECE5E", color: '#5ECE5E' });
                $('.commt_con a').each(function () {
                    $(this).css({ color: '#5ECE5E' })
                })
                $('#commt_com_repla a').each(function () {
                    $(this).css({ color: '#5ECE5E' })
                })
                $('.com-childen-more').each(function () {
                    $(this).css({ color: '#5ECE5E' })
                });
                $('.comm_heade_btn button').css({ background: '#5ECE5E' });
                $('.reportComText button').css({ background: '#5ECE5E' });
                $('.reportComTextReply button').css({ background: '#5ECE5E' });
                $('.comBtnTwo').css({ border: '1px solid #5ECE5E', color: '#5ECE5E' })
                $('#commeInputs').css({ border: '1px solid #5ECE5E' })
                $('.commet_count_num').css({ color: '#5ECE5E' })
                $('.comm_hot_tit a').css({ color: '#5ECE5E' })
            } else if (commentStyle == 'gray') {
                $('.detailActComm span').css({ borderLeft: "2px solid #999", color: '#999' });
                $('.commt_con a').each(function () {
                    $(this).css({ color: '#999' })
                })
                $('#commt_com_repla a').each(function () {
                    $(this).css({ color: '#999' })
                })
                $('.com-childen-more').each(function () {
                    $(this).css({ color: '#999' })
                })
                $('.comm_heade_btn button').css({ background: '#999' });
                $('.reportComText button').css({ background: '#999' });
                $('.reportComTextReply button').css({ background: '#999' });
                $('.comBtnTwo').css({ border: '1px solid #999', color: '#999' })
                $('#commeInputs').css({ border: '1px solid #999' })
                $('.commet_count_num').css({ color: '#999' })
                $('.comm_hot_tit a').css({ color: '#999' })
            }

        }

    }]);
/**
 * 指令
 * */
//时间显示样式
app.filter('fomatTime', function () {
    return function (valueTime) {
        if (!valueTime.replace) return false;
        var oldData = new Date(valueTime.replace(/-/g, "/"));
        var newData = new Date();
        var diffTime = Math.abs(oldData - new Date());
        if (diffTime > 7 * 24 * 3600 * 1000) {
            var dayNum = valueTime.slice(5, 16);
            return dayNum;
            // return "";

        } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
            var time = newData.getTime() - oldData.getTime();
            var dayNum = Math.floor(time / (24 * 60 * 60 * 1000));
            return dayNum + "天前";
            // return "";

        } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
            var time = newData.getTime() - oldData.getTime();
            var dayNum = Math.floor(time / (60 * 60 * 1000));
            return dayNum + "小時前";

        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
            var time = newData.getTime() - oldData.getTime();
            var dayNum = Math.floor(time / (60 * 1000));
            // return dayNum + "分钟前";
            return "剛剛";

        }
    };
});

//主播视频时长转换
app.filter('durationTime', function () {
    return function (value) {
        if (value) {
            var theTime = parseInt(value);// 秒
            var theTime1 = 0;// 分
            var theTime2 = 0;// 小时
            if (theTime > 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (theTime1 > 60) {
                    theTime2 = parseInt(theTime1 / 60);
                    theTime1 = parseInt(theTime1 % 60);
                }
            }

            var result = "" + parseInt(theTime) + "";

            if (result >= 0 && result <= 9) {
                result = "0" + result;
            } else {
                result = "" + result;
            }

            if (theTime1 > 0) {

                if (parseInt(theTime1) >= 1 && parseInt(theTime1) <= 9) {
                    result = "0" + parseInt(theTime1) + ":" + result;
                } else {
                    result = "" + parseInt(theTime1) + ":" + result;
                }

            } else {
                result = "00" + ":" + result;
            }
            if (theTime2 > 0) {
                if (parseInt(theTime2) > 0) {
                    if (parseInt(theTime2) >= 1 && parseInt(theTime2) <= 9) {
                        result = "0" + parseInt(theTime2) + ":" + result;
                    } else {
                        result = "" + parseInt(theTime2) + ":" + result;
                    }

                }

            }
            //注释(result);
            return result;
        } else {
            var result = "00" + ":" + "00";
            return result;
        }

    }
});

//活动详情，年月时分
app.filter('actHour', function () {
    /*return function (value) {
        if (value) {
            var dayNum = value.slice(5, 16);
            return dayNum;
        }
    };*/
    return function (valueTime) {
        if (!valueTime.replace) return false;
        var oldData = new Date(valueTime.replace(/-/g, "/"));
        var newData = new Date();
        var diffTime = Math.abs(oldData - new Date());
        if (diffTime > 24 * 3600 * 1000) {
            var dayNum = valueTime.slice(5, 16);
            return dayNum;
        }else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
            var time = newData.getTime() - oldData.getTime();
            var dayNum = Math.floor(time / (60 * 60 * 1000));
            return dayNum + "小時前";
        } else if (diffTime < 3600 * 1000 && diffTime > 3 * 60 * 1000) {
            var time = newData.getTime() - oldData.getTime();
            var dayNum = Math.floor(time / (60 * 1000));
            return dayNum + "分钟前";
        } else if (diffTime < 3 * 60 * 1000 && diffTime > 0) {
            var time = newData.getTime() - oldData.getTime();
            var dayNum = Math.floor(time / (60 * 1000));
            return "剛剛";
        }
    };
});

app.filter('thumbnail', function () {
    return function (value) {
        if (value) {
            if (value.indexOf(RESOURCE_URL) > 0 || value.indexOf(RESOURCE_NIS_URL) > 0) {
                value = value + THUMNAIL_SIGN;
            }
        }
        return value;
    };
});
//保留时分秒
app.filter('cutHour', function () {
    return function (value) {
        var indexSpac = value.indexOf(" ");
        var lastHourString = value.substring(indexSpac);
        return lastHourString;
    };
});
//保留年月日
app.filter('cutDay', function () {
    return function (value) {
        if (value) {
            var indexSpac = value.indexOf(" ");
            var lastHourString = value.substring(0, indexSpac);
            return lastHourString;
        }
    };
});
//详情时间，到秒
app.filter('cutSecond', function () {
    return function (value) {
        if (value) {
            var indexSpac = value.indexOf(":");
            var lastHourString = value.substring(0, indexSpac + 3);
            return lastHourString;
        }
    };
});
//直播详情判断mp3.mp4类型
app.filter('urlType', function () {
    return function (value) {
        var urlTypes = value.slice(-3)
        return urlTypes;
    };
});
//对象中的内容转为html解析
app.filter('trustHtml', ['$sce', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}]);

app.directive('repeatFinish', function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                $("#homeNavChannelTextUl li").eq(lightIndex).css({ background: "#C70014" });
                $("#homeNavChannelTextUl li").eq(lightIndex).find('a').css({ color: "#ffffff", fontSize: '0.18rem' });
                $(".homeNavTextUl li").eq(lightIndex).css({ color: "#fff", fontSize: '0.18rem', background: "#C70014" });

            }
        }
    }
});

//评论换肤
app.directive('commRepeatFinish', function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                setTimeout(function () {
                    if (commentStyle == 'blue') {
                        $('.detailActComm span').css({ borderLeft: "2px solid #2E97E9", color: '#2E97E9' });
                        $('.commt_con a').each(function () {
                            $(this).css({ color: '#2E97E9' })
                        })
                        $('#commt_com_repla a').each(function () {
                            $(this).css({ color: '#2E97E9' })
                        })
                        $('.com-childen-more').each(function () {
                            $(this).css({ color: '#2E97E9' })
                        })
                        $('.comm_heade_btn button').css({ background: '#2E97E9' });
                        $('.reportComText button').css({ background: '#2E97E9' });
                        $('.reportComTextReply button').css({ background: '#2E97E9' });
                        $('.comBtnTwo').css({ border: '1px solid #2E97E9', color: '#2E97E9' })
                        $('#commeInputs').css({ border: '1px solid #2E97E9' })
                        $('.commet_count_num').css({ color: '#2E97E9' })
                        $('.comm_hot_tit a').css({ color: '#2E97E9' })
                    } else if (commentStyle == 'red') {

                        $('.detailActComm span').css({ borderLeft: "2px solid #f24548", color: '#f24548' });
                        $('.commt_con a').each(function () {
                            $(this).css({ color: '#f24548' })
                        })
                        $('#commt_com_repla a').each(function () {
                            $(this).css({ color: '#f24548' })
                        })
                        $('.com-childen-more').each(function () {
                            $(this).css({ color: '#f24548' })
                        })
                        $('.comm_heade_btn button').css({ background: '#f24548' });
                        $('.reportComText button').css({ background: '#f24548' });
                        $('.reportComTextReply button').css({ background: '#f24548' });
                        $('.comBtnTwo').css({ border: '1px solid #f24548', color: '#f24548' })
                        $('#commeInputs').css({ border: '1px solid #f24548' })
                        $('.commet_count_num').css({ color: '#f24548' })
                        $('.comm_hot_tit a').css({ color: '#f24548' })
                    } else if (commentStyle == 'orange') {
                        $('.detailActComm span').css({ borderLeft: "2px solid #fdb92c", color: '#fdb92c' });
                        $('.commt_con a').each(function () {
                            $(this).css({ color: '#fdb92c' })
                        })
                        $('#commt_com_repla a').each(function () {
                            $(this).css({ color: '#fdb92c' })
                        })
                        $('.com-childen-more').each(function () {
                            $(this).css({ color: '#fdb92c' })
                        })
                        $('.comm_heade_btn button').css({ background: '#fdb92c' });
                        $('.reportComText button').css({ background: '#fdb92c' });
                        $('.reportComTextReply button').css({ background: '#fdb92c' });
                        $('.comBtnTwo').css({ border: '1px solid #fdb92c', color: '#fdb92c' })
                        $('#commeInputs').css({ border: '1px solid #fdb92c' })
                        $('.commet_count_num').css({ color: '#fdb92c' })
                        $('.comm_hot_tit a').css({ color: '#fdb92c' })
                    } else if (commentStyle == 'black') {
                        $('.detailActComm span').css({ borderLeft: "2px solid black", color: 'black' });
                        $('.commt_con a').each(function () {
                            $(this).css({ color: 'black' })
                        })
                        $('#commt_com_repla a').each(function () {
                            $(this).css({ color: 'black' })
                        })
                        $('.com-childen-more').each(function () {
                            $(this).css({ color: 'black' })
                        })
                        $('.comm_heade_btn button').css({ background: 'black' });
                        $('.reportComText button').css({ background: 'black' });
                        $('.reportComTextReply button').css({ background: 'black' });
                        $('.comBtnTwo').css({ border: '1px solid black', color: 'black' })
                        $('#commeInputs').css({ border: '1px solid black' })
                        $('.commet_count_num').css({ color: 'black' })
                        $('.comm_hot_tit a').css({ color: 'black' })
                    } else if (commentStyle == 'green') {
                        $('.detailActComm span').css({ borderLeft: "2px solid #5ECE5E", color: '#5ECE5E' });
                        $('.commt_con a').each(function () {
                            $(this).css({ color: '#5ECE5E' })
                        })
                        $('#commt_com_repla a').each(function () {
                            $(this).css({ color: '#5ECE5E' })
                        })
                        $('.com-childen-more').each(function () {
                            $(this).css({ color: '#5ECE5E' })
                        })
                        $('.comm_heade_btn button').css({ background: '#5ECE5E' });
                        $('.reportComText button').css({ background: '#5ECE5E' });
                        $('.reportComTextReply button').css({ background: '#5ECE5E' });
                        $('.comBtnTwo').css({ border: '1px solid #5ECE5E', color: '#5ECE5E' })
                        $('#commeInputs').css({ border: '1px solid #5ECE5E' })
                        $('.commet_count_num').css({ color: '#5ECE5E' })
                        $('.comm_hot_tit a').css({ color: '#5ECE5E' })
                    } else if (commentStyle == 'gray') {
                        $('.detailActComm span').css({ borderLeft: "2px solid #999", color: '#999' });
                        $('.commt_con a').each(function () {
                            $(this).css({ color: '#999' })
                        })
                        $('#commt_com_repla a').each(function () {
                            $(this).css({ color: '#999' })
                        })
                        $('.com-childen-more').each(function () {
                            $(this).css({ color: '#999' })
                        })
                        $('.comm_heade_btn button').css({ background: '#999' });
                        $('.reportComTextReply button').css({ background: '#999' });
                        $('.reportComText button').css({ background: '#999' });
                        $('.comBtnTwo').css({ border: '1px solid #999', color: '#999' })
                        $('#commeInputs').css({ border: '1px solid #999' })
                        $('.commet_count_num').css({ color: '#999' })
                        $('.comm_hot_tit a').css({ color: '#999' })
                    }
                }, 500)
            }
        }
    }

});



//cookie存入
function setCookie(name, val, expires) {
    //元素存在与否元素存在，去除左右空格之后，长度是否为零
    val += "";
    if (!name || !val || name.trim().length == 0 || val.trim().length == 0) {

        return;
    }
    if (expires) {
        expires = this._getTime(expires);
        // //注释(expires);
        document.cookie = name + "=" + val + ";expires=" + expires;
        return;
    }
    document.cookie = name + "=" + encodeURIComponent(val) + ";path=/";
}

//占位图
function globalBitmap(item) {
    item.src = 'static/45.png';
    item.onerror = null
}
//普通用户评论使用头像
function changeUserIcon(item) {
    item.src = 'static/30.png';
}
//官网用户评论使用头像
function changeOffialUserIcon(item) {
    item.src = 'static/58.png';
}
function imgLoad(item) {
    $(item).height($(item).width() * 3 / 4);
}

//视频时长公共样式
function videoTimeFormat(currentPos) {
    if (currentPos) {
        var theTime = parseInt(currentPos);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }

        var result = "" + parseInt(theTime) + "";

        if (result >= 0 && result <= 9) {
            result = "0" + result;
        } else {
            result = "" + result;
        }

        if (theTime1 > 0) {

            if (parseInt(theTime1) >= 1 && parseInt(theTime1) <= 9) {
                result = "0" + parseInt(theTime1) + ":" + result;
            } else {
                result = "" + parseInt(theTime1) + ":" + result;
            }

        } else {
            result = "00" + ":" + result;
        }
        if (theTime2 > 0) {
            if (parseInt(theTime2) > 0) {
                if (parseInt(theTime2) >= 1 && parseInt(theTime2) <= 9) {
                    result = "0" + parseInt(theTime2) + ":" + result;
                } else {
                    result = "" + parseInt(theTime2) + ":" + result;
                }

            }

        }
        return result;
    } else {
        var result = "00" + ":" + "00";
        return result;
    }
}
