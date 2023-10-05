const express = require('express');
const app = express();
const rotas = require('./rotas');
const instermediario = require('./intermediarios');

app.use(express.json());
app.use(instermediario);
app.use(rotas);

app.listen(3000);