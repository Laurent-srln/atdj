require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); //mw permettant d'afficher les log des requêtes entrantes
const favicon = require('serve-favicon'); //Pour ajouter une favicon à notre API
const bodyParser = require('body-parser');
const app = express();
const router = require('./app/router/router');
const port = process.env.PORT || 5478;


app
.use(favicon(`${__dirname}/cards.ico`))
.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
.use(bodyParser.json())
.use('/api-v1', router);


app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));


module.exports = app; 