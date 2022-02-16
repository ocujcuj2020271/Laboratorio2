const Asignacion = require('../models/asignacion.models');


//--------------------------------------------------------------------------------------------
function obtenerAsignacion(req, res) {
    Asignacion.find({}, (err, asignacionEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
        if (!asignacionEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los cursos' });

        return res.status(200).send({ asognacion: asignacionEncontrados })
    }).populate('idMaestro', 'idCursos')
}


//--------------------------------------------------------------------------------------------
function agregarAsignacion(req, res) {
    var parametros = req.body;
    var modeloAsignacion = new Asignacion();

    if (req.user.rol == "Maestro") {
        modeloAsignacion.idMaestro = req.user.sub;
        modeloAsignacion.idCursos = req.params.idCursos;

        modeloAsignacion.save((err, asignacionGuardada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!asignacionGuardada) return res.status(500).send({ mensaje: 'Error al agregar la Asignacion' })

            return res.status(200).send({ asignacion: asignacionGuardada });
        })

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' });
    }
}


//--------------------------------------------------------------------------------------------
function editarasignacion(req, res) {
    var idAsignacion = req.params.idAsignacion;
    var parametros = req.body;

    delete parametros.password

    if (req.user.sub !== idAsignacion) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este .' });
    }

    Asignacion.findByIdAndUpdate(req.user.sub, parametros, { new: true }, (err, asignacionEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
        if (!asignacionEditado) return res.status(500).send({ mensaje: 'Error al editar el Usuario' });

        return res.status(200).send({ asignacion: asignacionEditado });
    })
}


//--------------------------------------------------------------------------------------------
function eliminarAsignacion(req, res) {
    var idAsignacion = req.params.idAsignacion;

    if (req.user.sub !== idAsignacion) {
        return res.status(500).send({ mensaje: 'No tiene permiso eliminar usuario' })
    } else {

        Asignacion.findByIdAndDelete(idUser, (err, asignacionEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            if (!asignacionEliminado) return res.status(500).send({ mensaje: 'Error al eliminar' })

            return res.status(200).send({ asignacion: asignacionEliminado })
        })
    }
}

module.exports = {
    agregarAsignacion,
    obtenerAsignacion,
    editarasignacion,
    eliminarAsignacion
}