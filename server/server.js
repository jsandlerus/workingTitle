const express = require("express");
const next = require("next");
const fs = require("fs");
require('dotenv').config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/admin", (req, res) => {
    return app.render(req, res, "/admin", req.query);
  });

  server.get("*", (req, res) => {
    const hostname = req.headers.host.split('.')[0];
    let isPageFound = false
    fs.readdir("./src/pages", (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      isPageFound = files.find((file) => {
        return file.split('.')[0] === hostname})
      });

    if (isPageFound) {
      // render page specific to hostname.com
      return app.render(req, res, `/${hostname}`);
    } else {
      // render a 404 if the hostname does not match any specified hostnames
      return res.status(404).send("404 Not Found :)");
    }
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
