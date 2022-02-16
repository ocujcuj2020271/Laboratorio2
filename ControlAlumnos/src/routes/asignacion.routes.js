const express = require('express');
const controladorAsignacion = require('../controllers/asignacion.controller');


const api = express.Router();

api.post('/obtenerAsignacion', controladorAsignacion.obtenerAsignacion);
api.post('/agregarAsignacion', controladorAsignacion.agregarAsignacion);
api.put('/editarAsignacion', controladorAsignacion.editarasignacion);
api.delete('/eliminarAsignacion', controladorAsignacion.eliminarAsignacion);


module.exports = api;