const express = require('express')

const app = express();

const bodyParser = require('body-parser')

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/src'));

app.listen(port, () => {
    console.log(`This app is running on localhost:${port}`)
})