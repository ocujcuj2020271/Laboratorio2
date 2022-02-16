const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');

const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarMaestro', controladorUsuario.RegistrarMaestro);
api.post('/registrarAlumno', controladorUsuario.RegistrarAlumno);

api.post('/login', controladorUsuario.Login);


api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuario.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', controladorUsuario.editarUsuario);


module.exports = api;