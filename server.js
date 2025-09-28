// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const budget = require('.\\budget.json');
const port = 5000;

app.use(cors());

app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});