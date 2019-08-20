const loginCtrl = require('./controller/login.ctrl');
const utility = require('./utility');
const homeCtrl = require('./controller/home.ctrl');

module.exports = router => {
  router.get('/', (req, res) => {
    res.redirect('/login');

    // res.redirect('/home');
  });

  router.get('/login', (req, res) => {
    res.sendFile(utility.getPath('login.html'));
  });

  // use of async - await
  router.post('/home', (req, res) => {
    loginCtrl
      .login()
      .then(data => {
        if (data) {
          homeCtrl.getUserList().then(userListJson => {
            homeCtrl
              .getHtml(userListJson)
              .then(html => {
                res.write(html);
                res.end();
              })
              .catch(err => {
                res.writeHead(err.status);
                res.write(err.errMsg);
                res.end();
              });
          });
        } else {
          res.write('<a href="/login">Go Back</a>');
          res.end('User not authenticated');
        }
      })
      .catch(err => {
        res.end(JSON.stringify(err));
      });
  });

  return router;
};
