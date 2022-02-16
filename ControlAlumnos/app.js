const express = require('express');
const cors = require('cors');
const app = express();

const usuarioRoutes = require('./src/routes/usuario.routes');
const cursosRoutes = require('./src/routes/cursos.routes');
const asignacionRoutes = require('./src/routes/asignacion.routes');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', usuarioRoutes, cursosRoutes, asignacionRoutes );

module.exports = app;