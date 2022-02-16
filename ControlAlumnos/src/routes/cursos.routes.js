const express = require('express');
const controladorCursos = require('../controllers/cursos.controller');


const api = express.Router();

api.post('/agregarCurso', controladorCursos.agregarCurso);
api.post('/obtenerCurso', controladorCursos.obtenerCurso);
api.put('/editarCurso/:idCursos', controladorCursos.editarCurso);
api.delete('/EliminarCurso/:idCursos', controladorCursos.EliminarCurso);

module.exports = api;