module.exports = function (app, moment) {
  const { Usuario } = require('../models');

  app.get('/api/usuario', async (req, res) => {
    try {
      const objUsuario = await Usuario.findAll({
        order: [
          ['nome', 'ASC'],
          ['id', 'ASC']
        ]
      });
      res.json(objUsuario)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/usuario', async (req, res) => {
    let body = {
      ...(req.body)
    }

    try {
      const objUsuario = await Usuario.create(body);
      res.json(objUsuario)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/usuario/editar', async (req, res) => {
    let body = {
      ...(req.body),
      modificado: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      modificadoPor: req.headers['x-iisnode-auth_user']
    }

    try {
      const objUsuario = await Usuario.update(body, { where: { id: req.body.id } });
      res.json(objUsuario)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/usuario/excluir', async (req, res) => {
    try {
      const objUsuario = await Usuario.destroy({ where: { id: req.body.id } });
      res.json(objUsuario)
    } catch (error) {
      res.status(500).send(error)
    }
  })
}