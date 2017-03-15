var jqry = document.createElement('script');
jqry.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
document.head.appendChild(jqry);

setTimeout(function() {
    alert("Ready");
    var block = ["女权", "tf", "TF", "Tf", "魅族", "萨德", "王源", "易烊千玺", "王俊凯", "周杰伦", "直男"];

    var lst = $(".default-content.txt-xl").map(function() {
        return $(this); });

    for (var i = lst.length - 1; i >= 0; i--) {
        for (var j = block.length - 1; j >= 0; j--) {
            var content = lst[i].text();
            if (content.includes(block[j])) {
                lst[i].parents().eq(1).css("display", "none");
                // lst[i].css('color','red');
                break;
            }
        }
    }

    $(".card-list").bind('DOMNodeInserted', function(e) {
        var element = e.target;
        var t = $(element).find(".default-content.txt-xl");
        if (t == undefined) {
            return;
        }
        for (var j = block.length - 1; j >= 0; j--) {
            var content = t.text();
            if (content.includes(block[j])) {
                t.parents().eq(1).css("display", "none");
                // t.css("color","red");
                break;
            }
        }
    });
}, 3000);
