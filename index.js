const express = require("express");
const basicAuth = require("basic-auth");
const directories = require("./directories");
const hb = require("express-handlebars");

const app = express();

var data;
directories.getData(function(err, projectdata) {
    data = projectdata;
});

var auth = function(req, res, next) {
    var creds = basicAuth(req);
    if (!creds || creds.name != "admin" || creds.pass != "havingfun") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Please enter the password"'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);
app.use(require("cookie-parser")());

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.get("/logout", function(req, res) {
    res.send(`<p><a href="log:out@localhost:8080/">logout</a></p>
        `);
});

app.use(function(req, res, next) {
    if (!req.cookies.cookiePolicy && req.url !== "/cookie") {
        res.cookie("comesfrom", req.url); // before redirecting we set the cookie here
        res.redirect("/cookie");
    } else {
        next();
    }
});

app.get("/cookie", function(req, res, next) {
    console.log("In cookie form submit");
    res.send(`<!doctype html><body>
                    <form method="POST">
                    <input name="agree" type="checkbox"> I accept the cookie policy</input>
                    <button typeof="submit">Submit</button>
                </body>`);
});

app.post("/cookie", function(req, res, next) {
    console.log("In cookie check the form");
    if (!req.body.agree) {
        res.send("Sorry, you can't use my page");
    } else {
        res.cookie("cookiePolicy", "true");
        res.redirect(req.cookies.comesfrom);
    }
});

app.get("/projects/:projName", function(req, res, next) {
    var requestedObj;
    data.forEach(function(obj) {
        if (req.params.projName === obj.dir) {
            requestedObj = obj;
        }
    });
    if (requestedObj) {
        res.render("description", {
            projName: req.params.projName, // so one can print them just like that
            proj: requestedObj,
            data: data,
            layout: "main"
        });
        // FIXME: doesn't set the title!!!
        app.set("title", requestedObj.title);
        console.log(app.get("title"));
    } else {
        next();
    }
});

app.get("/projects", function(req, res, next) {
    res.redirect(301, "/");
});

app.get("/", function(req, res, next) {
    res.render("welcome", {
        data: data,
        dir: data.dir,
        //img_src: "/projects/" + data.dir + "/screenshot.png",
        title: data.title,
        layout: "main"
    });
});

app.use(express.static(__dirname + "/projects"));
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    res.status(404).render("404", { title: "Sorry, page not found" });
});

app.listen(8080, () => console.log("I'm listening"));
