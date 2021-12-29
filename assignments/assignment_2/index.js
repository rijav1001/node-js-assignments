var fs = require("fs");
const http = require("http");
fs.writeFileSync(
  "./node-js-assignments/assignments/assignment_2/index.html",
  "<h1>Hello World</h1>",
  (err) => {
    if (err) console.log(err);
  }
);
const content = fs.readFileSync(
  "./node-js-assignments/assignments/assignment_2/index.html",
  (err, data) => {
    if (err) console.log(err);
  }
);
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(content);
    res.end();
  }
}).listen(3000, "localhost");