function ticker() {
    var myReq;
    var box = $("#links");
    var a = box.find("a"); //var a = $("a");
    var url = "news.json";

    // FETCHING DATA FROM JSON
    $.ajax({
        url: url,
        success: function(data) {
            var links = "";
            for (var i = 0; i < data.length; i++) {
                var onelink =
                    "<a href=' " + data[i].link + "' >" + data[i].name + "</a>";
                links += onelink;
            }
            box.append(links);
            a = box.find("a");
        }
    });

    var tick = box.offset().left;

    move1tick();

    function move1tick() {
        tick--;
        var width = a.eq(0).outerWidth();

        if (tick <= -width) {
            tick += width;
            a.eq(0).appendTo(box);
            a = box.find("a");
        }
        box.css({ left: tick });
        myReq = requestAnimationFrame(move1tick);
    }

    box.on("mouseover", function(e) {
        cancelAnimationFrame(myReq);
        var tar = $(e.target);
        tar.css({ color: "grey", "text-decoration": "underline" });
    });

    box.on("mouseout", function(e) {
        move1tick();
        var tar = $(e.target);
        tar.css({ color: "inherit", "text-decoration": "inherit" });
    });
}
ticker();
