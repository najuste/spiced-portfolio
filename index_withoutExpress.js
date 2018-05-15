const http = require("http");
const fs = require("fs");
const path = require("path");
const directories = require("./directories");

const server = http.createServer(function(request, response) {
    request.on("error", function(err) {
        console.log(err);
    });
    response.on("error", function(err) {
        console.log(err);
    });

    const myPath = __dirname + "/projects" + request.url;
    const normalized = path.normalize(myPath);
    if (!normalized.startsWith(__dirname + "/projects")) {
        request.statusCode = 403;
        request.end();
    }

    fs.stat(myPath, function(err, data) {
        if (err) {
            console.log("file doesn't exist: " + myPath);
            response.statusCode = 404;
            response.end(`<!doctype html><html><title>404</title>
                        <body>
                        <h3>Sorry...the thingy you are trying to access isn't available yet</h3>
                        <p>Get back to my <a href ="/"><strong>PROJECT LIST</strong></a></p>
                        </body></html>`);
        } else if (request.method == "GET") {
            console.log("Serving file");
            response.statusCode = 200;
            if (request.url === "/") {
                console.log("Serving home");
                directories.getHTML(function(err, projectlist_html) {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        if (request.url === "/") {
                            response.statusCode = 200;
                            console.log("Serving home");
                            response.setHeader("content-type", "text/html");
                            response.end(`<!doctype html><html><title>Portfolio</title>
                                        <h3><em>Check out my project!</em></h3>
                                        <div><ul>${projectlist_html}</ul></div>
                                        </html>`);
                        }
                    }
                });
            } else {
                if (data.isDirectory()) {
                    console.log("Serving directory");
                    //check if directory is closed with slash!!!
                    if (request.url.slice(-1) === "/") {
                        console.log("Serving directory/index.html");
                        response.setHeader("content-type", "text/html");
                        var stream = fs.createReadStream(myPath + "index.html");
                        stream.pipe(response);
                    } else {
                        console.log("Redirecting");
                        response.statusCode = 302;
                        response.setHeader("Location", request.url + "/");
                        response.end();
                    }
                } else {
                    var ext = path.extname(request.url);
                    const extensions = {
                        ".html": "text/html",
                        ".css": "text/css",
                        ".js": "text/javascript",
                        ".json": "application/json",
                        ".gif": "image/gif",
                        ".jpg": "image/jpeg",
                        ".png": "image/png",
                        ".svg": "image/svg+xml"
                    };

                    response.setHeader("content-type", extensions[ext]);
                    console.log(
                        "Serving a file with extension, header type",
                        extensions[ext]
                    );
                    stream = fs.createReadStream(myPath);
                    stream.pipe(response);
                }
            }
        } else {
            response.statusCode = 405;
            response.end();
        }
    });
});

server.listen(8080, () => console.log("I'm listening"));
