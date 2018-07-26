const router = require('express').Router();

module.exports = (wagner) => {

    const trabajadorCtrl = wagner.invoke((Trabajador) =>
        require('../controllers/trabajador.controller')(Trabajador));

    router.get('/:date/:month/:year', (req, res) =>
        trabajadorCtrl.getByFecha(req, res));

    router.get('/', (req, res) =>
        trabajadorCtrl.getAll(req, res));

    router.post('/', (req, res) =>
        trabajadorCtrl.createTrabajador(req, res));

    return router;
}