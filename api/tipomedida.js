module.exports = function (app, moment) {
  const { TipoMedida } = require('../models');

  app.get('/api/tipomedida', async (req, res) => {
    try {
      const objTipoMedida = await TipoMedida.findAll({
        order: [
          ['nome', 'ASC']
        ]
      });
      res.json(objTipoMedida)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/tipomedida', async (req, res) => {
    let body = {
      ...(req.body)
    }

    try {
      const objTipoMedida = await TipoMedida.create(body);
      res.json(objTipoMedida)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/tipomedida/editar', async (req, res) => {
    let body = {
      ...(req.body),
      modificado: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      modificadoPor: req.headers['x-iisnode-auth_user']
    }

    try {
      const objTipoMedida = await TipoMedida.update(body, { where: { id: req.body.id } });
      res.json(objTipoMedida)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/tipomedida/excluir', async (req, res) => {
    try {
      const objTipoMedida = await TipoMedida.destroy({ where: { id: req.body.id } });
      res.json(objTipoMedida)
    } catch (error) {
      res.status(500).send(error)
    }
  })
}