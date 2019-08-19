const fs = require('fs');
const path = require('path');

getPath = (_path) => {
    return path.join(__dirname, 'public', _path);
}

module.exports = ((router) => {
    router.get('/', (req, res) => {
        res.redirect('/login');

        // res.redirect('/home');
    });

    router.get('/login', (req, res) => {
        res.sendFile(getPath('login.html'));
    });

    router.post('/home', (req, res) => {
        fs.readFile(getPath('home.html'), null, (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write('file not found');
            } else {
                let html = data.toString();
                html = html.replace('{{username}}', req.body.username);
                html = html.replace('{{password}}', req.body.username);
                res.write(html);
            }
            res.end();
        });
    });

    return router;
});