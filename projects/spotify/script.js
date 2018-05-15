var nexturl;
var userinput;
var chosentype;

$("#top").hide();
$("#submit").on("click", function() {
    $(".results").empty();
    userinput = $('input[name="user-input"]').val();
    chosentype = $(".artist-or-album").val();

    $("#results-message").html('Getting results for  "' + userinput + '"');
    fetchData();
});

$("#top").on("click", function() {
    if (window.scrollY) {
        window.scroll(0, 0);
    }
});

function fetchData() {
    $.ajax({
        url: "https://elegant-croissant.glitch.me/spotify",
        data: {
            query: userinput,
            type: chosentype
        },
        success: function(payload) {
            console.log(payload);

            nexturl = genContent(payload);
            if (nexturl) {
                if ($(location)[0].search === "?scroll=infinte") {
                    checkScroll();
                } else {
                    if ($(".results-wrapper").find("#more").length == 0) {
                        $(".results-wrapper").append(
                            `<button id="more" type="button" name="loadmore">More</button>`
                        );
                    }
                }
                $(".results-wrapper").on("click", "#more", function() {
                    fetchData();
                });
            }
        }
    });
}

function checkScroll() {
    if ($(document).height() - window.scrollY <= $(window).height()) {
        fetchData();
    } else {
        setTimeout(checkScroll, 500);
    }
}

function genContent(payload) {
    var inner_html = "";
    payload = payload.artists || payload.albums;

    if (payload.items.length === 0) {
        $("#results-message").html('No results for  "' + userinput + '"');
        return null;
    } else {
        $("#results-message").html('Results for  "' + userinput + '"');
        $("#top").show();

        for (var i = 0; i < payload.items.length; i++) {
            try {
                var imgurl = payload.items[i].images[0].url;
            } catch (e) {
                imgurl = `https://www.shareicon.net/download/2016/08/01/639870_internet.ico`;
                console.log(e);
            }
            var text = payload.items[i].name;
            var href = payload.items[i].external_urls.spotify;
            inner_html += `<div class="item">
        <div class="logo"> <img src=" ${imgurl}" alt="logo_${text}" height="200px"> </div>
        <div class=name><p><a href="${href}">${
                payload.items[i].name
            }</a></p></div></div>`;
        }

        nexturl =
            payload.next &&
            payload.next.replace(
                "api.spotify.com/v1/search",
                "elegant-croissant.glitch.me/spotify"
            );

        $(".results").append(inner_html);
        return nexturl;
    }
}
