const express = require('express');
const router = require('./routes');
var bodyParser = require('body-parser')

const app = express();
const port = 3000;
app.use(bodyParser());
app.use(express.static('public'));
router(app);

app.use(bodyParser.json());


app.listen(port, () => console.log(`App listening on port ${port}!`));