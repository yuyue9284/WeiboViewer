var jqry = document.createElement('script');
jqry.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
document.head.appendChild(jqry);

var bl_list = document.createElement('script');
bl_list.setAttribute('src', 'https://rawgit.com/yuyue9284/WeiboViewer/dev/Weibo/block_list.js');
document.head.appendChild(bl_list);

// var blocklist = ["tf", "TF", "Tf", "王源", "易烊千玺", "王俊凯"];

// 初始化
function init_blocker() {
    if (localStorage.blocklist != undefined) {
        blocklist = JSON.parse(localStorage.blocklist);
    } else {
        localStorage.blocklist = JSON.stringify(blocklist);
    }
    // 初始化按钮
    var button = $("<span class='item box-col' id = 'add_keywords'>关键词</span>\
                   <span class='item box-col' id = 'Blocker'>Block!</span>");
    var navbar = $(".home-sub-nav.layout-box");
    if (navbar.length == 0) {
        var tnav = $('<div class="home-sub-nav layout-box" data-node="homeSubNav"></div>');
        $('body').prepend(tnav);
        tnav.css("position", "fixed");

        // 注入css增加对按钮的支持
        var css_link = $('<link href="//h5.sinaimg.cn/weibocn/v6/css/lib/base-d1c7f99e51e81f2aec863e6539d97dbb.css" type="text/css" rel="stylesheet">\
                          <link href="//h5.sinaimg.cn/weibocn/v6/css/card/cards-9babdfd7da6f88b20fc47e0d79a2977d.css" type="text/css" rel="stylesheet">\
                         <link href="//h5.sinaimg.cn/weibocn/v6/css/mod/mods.all-3ced9f518a7d802418d57152b529c1fa.css" type="text/css" rel="stylesheet">');
        $("head").append(css_link);
    }
    $(".home-sub-nav.layout-box").append(button);

    // 执行清理
    fire_blocker();

    // 绑定函数
    $("#Blocker").click(fire_blocker);
    $('#add_keywords').click(newKeywords);
}

// 增加关键词
function newKeywords() {
    var word = prompt("请输入");
    switch (word) {
        case "show":
            alert(blocklist);
            break;
        case "clear":
            localStorage.removeItem('blocklist');
            blocklist = [];
            break;
        default:
            blocklist.push(word);
            localStorage.blocklist = JSON.stringify(blocklist);
            fire_blocker();
    }
}

// 执行blocker
function fire_blocker() {
    hot_weibo_blocker();
    index_blocker();
    $("#app, .card-list").off('DOMNodeInserted').on('DOMNodeInserted', new_feed_handler);
}

// 处理首页
function index_blocker() {
    // 定位微博

    // var lst = $(".default-content.txt-xl").map(function() {
    //     return $(this);
    // });

    var lst = $(".card.card9.line-around").map(function() {
        return $(this);
    });

    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = blocklist.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(blocklist[j])) {

                // lst[i].parents().eq(1).css("display", "none");
                // lst[i].css('color', 'red');

                lst[i].css("display", "none");

                break;
            }
        }
    }

}

// 处理热门微博
function hot_weibo_blocker() {

    // card m - panel card9 weibo - member
    // var lst = $(".weibo-text").map(function() {
    //     return $(this);
    // });

    var lst = $(".card.m-panel.card9").map(function() {
        return $(this);
    });

    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = blocklist.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(blocklist[j])) {

                lst[i].css("display", "none");
                // lst[i].parents().eq(4).css("display", "none");
                // lst[i].css('color', 'red');
                break;
            }
        }
    }
}


// 处理新载入的内容
function new_feed_handler(e) {
    var element = e.target;
    var t = $(element);
    if (t != undefined) {
        for (var j = blocklist.length - 1; j >= 0; j--) {
            var content = t.text();
            if (content.includes(blocklist[j])) {
                t.css("display", "none");
                return;
            }
        }
    }
}

setTimeout(init_blocker, 3000);
