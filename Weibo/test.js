var jqry = document.createElement('script');
jqry.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
document.head.appendChild(jqry);

setTimeout(function() {
    $("p").css("color", "red");
    alert("finish");
    var block = ["女权", "tf", "TF", "Tf", "魅族", "萨德", "王源", "易烊千玺", "王俊凯", "周杰伦"];

    var lst = $(".default-content.txt-xl").map(function() {
        return $(this); });

    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = block.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(block[j])) {
                lst[i].parents().eq(1).css("display", "none");
                break;
            }
        }
    }

    $(".card-list").bind('DOMNodeInserted', function(e) {
        var element = e.target;
        if (element == undefined) {
            return;
        }
        var t = $(element).find(".default-content.txt-xl");
        if (t == undefined) {
            return;
        }
        t.css("color", 'red');
        for (var j = block.length - 1; j >= 0; j--) {
            var content = t.text();
            if (content.includes(block[j])) {
                t.parents().eq(1).css("display", "none");
                break;
            }
        }
    });
}, 5000);