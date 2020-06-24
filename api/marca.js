module.exports = function (app, moment) {
  const { Marca } = require('../models');

  app.get('/api/marca', async (req, res) => {
    try {
      const objMarca = await Marca.findAll({
        order: [
          ['nome', 'ASC'],
          ['id', 'ASC']
        ]
      });
      res.json(objMarca)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/marca', async (req, res) => {
    let body = {
      ...(req.body)
    }

    try {
      const objMarca = await Marca.create(body);
      res.json(objMarca)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/marca/editar', async (req, res) => {
    let body = {
      ...(req.body),
      modificado: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      modificadoPor: req.headers['x-iisnode-auth_user']
    }

    try {
      const objMarca = await Marca.update(body, { where: { id: req.body.id } });
      res.json(objMarca)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/marca/excluir', async (req, res) => {
    try {
      const objMarca = await Marca.destroy({ where: { id: req.body.id } });
      res.json(objMarca)
    } catch (error) {
      res.status(500).send(error)
    }
  })
}