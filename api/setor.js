module.exports = function (app, moment) {
  const { Setor } = require('../models');

  app.get('/api/setor', async (req, res) => {
    try {
      const objSetor = await Setor.findAll({
        order: [
          ['nome', 'ASC'],
          ['id', 'ASC']
        ]
      });
      res.json(objSetor)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/setor', async (req, res) => {
    let body = {
      ...(req.body)
    }

    try {
      const objSetor = await Setor.create(body);
      res.json(objSetor)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/setor/editar', async (req, res) => {
    let body = {
      ...(req.body),
      modificado: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      modificadoPor: req.headers['x-iisnode-auth_user']
    }

    try {
      const objSetor = await Setor.update(body, { where: { id: req.body.id } });
      res.json(objSetor)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/setor/excluir', async (req, res) => {
    try {
      const objSetor = await Setor.destroy({ where: { id: req.body.id } });
      res.json(objSetor)
    } catch (error) {
      res.status(500).send(error)
    }
  })
}