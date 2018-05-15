Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

var baseurl = "https://api.github.com";
var endpoint;
var username;
var password;

$(".q").hide();

$("#authorization-button").on("click", function(e) {
    e.preventDefault();
    username = $('input[placeholder="username"]').val();
    password = $('input[placeholder="password"]').val();

    if (username && password) {
        $("#submit-button").off();
        $(".q").show();
        $(".auth").hide();
        $("#submit-button").on("click", function(e) {
            e.preventDefault();
            var search = $('input[placeholder="username-search"]').val();
            endpoint = `/users/${search}/repos`; // /users/:username/repos

            $.ajax({
                url: baseurl + endpoint,
                headers: {
                    Authorization: "Basic " + btoa(username + ":" + password)
                },
                success: function(payload) {
                    console.log(payload);

                    var myTemp = Handlebars.templates.repoTemp({
                        repos: payload
                    });
                    $("#results-container").html(myTemp);
                }
            });
        });
    } else {
        alert("No input provided");
    }
});

$(document).on("click", ".user", function() {
    var clicked = $(this);
    console.log(clicked);
    if (clicked.find(".commits").length == 0) {
        var repo = $(this)
            .find("h3")
            .html();
        //  /repos/:owner/:repo/commits
        endpoint = `/repos/${repo}/commits`;
        $.ajax({
            url: baseurl + endpoint,
            sie: 10,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(payload) {
                var first10load = payload.slice(0, 10);
                console.log(first10load);
                var ctemp = Handlebars.templates.commitTemp({
                    commits: first10load // name: value
                });
                $(clicked).append(ctemp);
            }
        });
    } else {
        clicked.find(".commits").toggle();
    }
});
