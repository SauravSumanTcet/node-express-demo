const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

getPath = _path => {
  return path.join(__dirname, "public", _path);
};

module.exports = router => {
  router.get("/", (req, res) => {
    res.redirect("/login");

    // res.redirect('/home');
  });

  router.get("/login", (req, res) => {
    res.sendFile(getPath("login.html"));
  });

  // use of async - await
  router.post("/home", (req, res) => {
    const request = async () => {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const json = await response.json();
      fs.readFile(getPath("home.html"), null, (error, data) => {
        if (error) {
          res.writeHead(404);
          res.write("file not found");
        } else {
          let html = data.toString();
          html = html.replace("{{username}}", req.body.username);
          html = html.replace("{{password}}", req.body.password);
          let JSON_RES = JSON.stringify(json);
          JSON_RES = JSON_RES.replace(/\"/g,'\'');
          html = html.replace("{{{pageData}}}", JSON_RES);
          res.write(html);
        }
        res.end();
      });
    };

    request();
  });

  return router;
};
