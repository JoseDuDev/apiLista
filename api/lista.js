module.exports = function (app, moment) {
  const { Lista, Produto, ListaProduto, Usuario } = require('../models');

  app.get('/api/lista', async (req, res) => {
    try {
      const objLista = await Lista.findAll({
        // include: [Usuario,
        //   {
        //     association: ListaProduto, 
        //     include: [Produto],
        //   },
        // ],
        order: [
          ['createdAt', 'DESC']
        ]
      });
      res.json(objLista)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/lista', async (req, res) => {
    let body = {
      ...(req.body)
    }

    try {
      const objLista = await Lista.create(body);

      if (body.produtos.length) {
        body.produtos.forEach(async (item) => {
          try {
            await ListaProduto.create({
              listaid: objLista.id,
              produtoid: item.id,
            });
          } catch (error) {
            ListaProduto.destroy({ where: { id: objLista.id } });
            res.status(500)
              .json({
                model: 'ListaProduto',
                item: objLista,
                msg: error,
                body: { listaid: objLista.id, produtoid: item.id },
              });
          }
        });
      }

      res.json(objLista)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/lista/:id', async (req, res) => {
    let body = {
      ...(req.body),
    }

    try {
      await Lista.update(body, { where: { id: req.params.id } });
      res.json({ done: true, id: req.params.id })
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/api/lista/excluir', async (req, res) => {
    try {
      await Lista.destroy({ where: { id: req.body.id } });
      res.json({ done: true, id: req.body.id })
    } catch (error) {
      res.status(500).send(error)
    }
  })
}