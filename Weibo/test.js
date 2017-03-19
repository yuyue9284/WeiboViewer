var jqry = document.createElement('script');
jqry.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
document.head.appendChild(jqry);



var blocklist = ["tf", "TF", "Tf", "王源", "易烊千玺", "王俊凯"];

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
    var lst = $(".default-content.txt-xl").map(function() {
        return $(this);
    });
    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = blocklist.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(blocklist[j])) {
                lst[i].parents().eq(1).css("display", "none");
                // lst[i].css('color', 'red');
                break;
            }
        }
    }

}

// 处理热门微博
function hot_weibo_blocker() {
    var lst = $(".weibo-text").map(function() {
        return $(this);
    });
    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = blocklist.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(blocklist[j])) {
                lst[i].parents().eq(4).css("display", "none");
                // lst[i].css('color', 'red');
                break;
            }
        }
    }
}


// 处理新载入的内容
function new_feed_handler(e) {
    var element = e.target;
    var t = $(element).find(".weibo-text");
    if (t != undefined) {
        for (var j = blocklist.length - 1; j >= 0; j--) {
            var content = t.text();
            if (content.includes(blocklist[j])) {
                t.parents().eq(4).css("display", "none");

                // t.css("color", "red");
                return;
            }
        }
    }

    var t = $(element).find(".default-content.txt-xl");
    if (t != undefined) {
        for (var j = blocklist.length - 1; j >= 0; j--) {
            var content = t.text();
            if (content.includes(blocklist[j])) {
                t.parents().eq(1).css("display", "none");

                // t.css("color", "red");
                return;
            }
        }
    }
}

setTimeout(init_blocker, 3000);
