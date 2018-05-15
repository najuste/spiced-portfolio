var bar = $(".bar");
var wrap = $(".wrapper");

bar.mousedown(function() {
    wrap.on("mousemove", function(e) {
        var width = e.offsetX + "px";
        bar.css({ width: width });
        e.preventDefault(); // prevents img selection
    });
});

wrap.on("mouseout", function() {
    if ($(this) === wrap) {
        bar.off();
    }
});

$(document).mouseup(function(e) {
    e.stopPropagation();
    wrap.off();
});
