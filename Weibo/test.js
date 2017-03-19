var jqry = document.createElement('script');
jqry.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
document.head.appendChild(jqry);



var block = ["女权", "tf", "TF", "Tf", "魅族", "萨德", "王源", "易烊千玺", "王俊凯", "周杰伦", "直男", "三生三世", "习近平", "乐天", "红米"];

function init_blocker() {
    var button = $("<button class='item box-col' id = 'add_keywords'>关键词</button>\
                   <button class='item box-col' id = 'Blocker'>Block!</button>");
    var navbar = $(".home-sub-nav.layout-box");
    if (navbar.length == 0) {
        var tnav = $('<div class="home-sub-nav layout-box" data-node="homeSubNav"></div>');
        $('body').prepend(tnav);
    }
    $(".home-sub-nav.layout-box").append(button);
    $("#Blocker").click(fire_blocker);
    $('#add_keywords').click(newKeywords);
    $("#app").on('DOMNodeInserted', new_feed_handler);
    $(".card-list").on('DOMNodeInserted', new_feed_handler);

}

function newKeywords() {
    var word = prompt("请输入");
    block.push(word);
    fire_blocker();
}

// 首页
function index_blocker() {
    var lst = $(".default-content.txt-xl").map(function() {
        return $(this);
    });
    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = block.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(block[j])) {
                lst[i].parents().eq(1).css("display", "none");
                // lst[i].css('color', 'red');
                break;
            }
        }
    }

}

// 热门微博
function hot_weibo_blocker() {
    var lst = $(".weibo-text").map(function() {
        return $(this);
    });

    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = block.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(block[j])) {
                lst[i].parents().eq(4).css("display", "none");
                // lst[i].css('color', 'red');
                break;
            }
        }
    }
}

//手动执行block
function fire_blocker() {
    hot_weibo_blocker();
    index_blocker();
    $("#app").off('DOMNodeInserted').on('DOMNodeInserted', new_feed_handler);
    $(".card-list").off('DOMNodeInserted').on('DOMNodeInserted', new_feed_handler);
}

//处理新载入的内容
function new_feed_handler(e) {
    var element = e.target;
    var t = $(element).find(".weibo-text");
    if (t != undefined) {
        for (var j = block.length - 1; j >= 0; j--) {
            var content = t.text();
            if (content.includes(block[j])) {
                t.parents().eq(4).css("display", "none");
                // t.css("color", "red");
                return;
            }
        }
    }

    var t = $(element).find(".default-content.txt-xl");
    if (t != undefined) {
        for (var j = block.length - 1; j >= 0; j--) {
            var content = t.text();
            if (content.includes(block[j])) {
                t.parents().eq(1).css("display", "none");
                // t.css("color", "red");
                return;
            }
        }
    }
}

setTimeout(init_blocker, 3000);



// $("#app").on('DOMNodeInserted', function(e) {
//     var element = e.target;
//     var t = $(element).find(".weibo-text");
//     if (t == undefined) {
//         return;
//     }
//     for (var j = block.length - 1; j >= 0; j--) {
//         var content = t.text();
//         if (content.includes(block[j])) {
//             // t.parents().eq(4).css("display", "none");
//             t.css("color", "red");
//             break;
//         }
//     }
// });
// $(".card-list").on('DOMNodeInserted', function(e) {
//     var element = e.target;
//     var t = $(element).find(".default-content.txt-xl");
//     if (t == undefined) {
//         return;
//     }
//     for (var j = block.length - 1; j >= 0; j--) {
//         var content = t.text();
//         if (content.includes(block[j])) {
//             //t.parents().eq(1).css("display", "none");
//             t.css("color", "red");
//             break;
//         }
//     }
// });
