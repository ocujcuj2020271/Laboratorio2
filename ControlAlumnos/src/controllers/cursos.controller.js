const Curso = require('../models/cursos.models');

function agregarCurso(req, res) {
    var parametros = req.body;
    var modeloCurso = new Curso();

    if (req.user.rol == "Maestro") {
        modeloCurso.pregunta = parametros.nombre;
        modeloCurso.idMaestro = req.user.sub;

        modeloCurso.save((err, cursoGuardada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!cursoGuardada) return res.status(500).send({ mensaje: 'Error al agregar la Curso' })

            return res.status(200).send({ curso: cursoGuardada });
        })

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' });
    }
}


//--------------------------------------------------------------------------------------------
function obtenerCurso(req, res) {
    Curso.find({}, (err, cursoEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
        if (!cursoEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los cursos' });

        return res.status(200).send({ curso: cursoEncontrados })
    }).populate('idMaestro', 'nombre')
}


//--------------------------------------------------------------------------------------------
function editarCurso(req, res) {
    var idUser = req.params.idCursos;
    var parametros = req.body;

    delete parametros.password

    if (req.user.sub !== idUser) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este .' });
    }

    Curso.findByIdAndUpdate(req.user.sub, parametros, { new: true }, (err, cursoEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
        if (!cursoEditado) return res.status(500).send({ mensaje: 'Error al editar' });

        return res.status(200).send({ curso: cursoEditado });
    })
}



//--------------------------------------------------------------------------------------------
function EliminarCurso(req, res) {
    var idCursos = req.params.idCursos;

    if (req.user.sub !== idCursos) {
        return res.status(500).send({ mensaje: 'No tiene permiso eliminar usuario' })
    } else {

        Curso.findByIdAndDelete(idUser, (err, cursoEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            if (!cursoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar' })

            return res.status(200).send({ curso: cursoEliminado })
        })
    }
}



module.exports = {
    agregarCurso,
    obtenerCurso,
    editarCurso,
    EliminarCurso
}