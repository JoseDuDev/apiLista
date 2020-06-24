module.exports = function (app, moment) {
  const { Produto, Marca, Setor } = require("../models");
  const { Op } = require('sequelize');

  app.get("/api/produto", async (req, res) => {
    try {
      const objProduto = await Produto.findAll({
        include: [
          {
            model: Marca,
            attributes: ["id", "nome"],
          },
          {
            model: Setor,
            attributes: ["id", "nome"],
          },
        ],
        attributes: ["id", "nome", "preco"],
        order: [
          ["nome", "ASC"],
          ["id", "ASC"],
        ],
      });
      res.json(objProduto);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post("/api/produto", async (req, res) => {
    let body = {
      ...req.body,
    };

    try {
      const objProduto = await Produto.create(body);
      res.json(objProduto);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post("/api/produto/:id", async (req, res) => {
    let body = {
      ...req.body,
    };

    try {
      const objProduto = await Produto.update(body, {
        where: { id: req.params.id },
      });
      res.json({ done: true, id: req.params.id });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post("/api/produto/excluir", async (req, res) => {
    try {
      const objProduto = await Produto.destroy({ where: { id: req.body.id } });
      res.json({ done: true, id: req.body.id });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // -----

  app.post("/api/listaproduto", async (req, res) => {
    let offset = req.body.offset || 0;
    let limit = req.body.limit || 15;
    let order = req.body.order || "nome";
    let direction = req.body.direction || "asc";
    let search = req.body.search || "";

    const whereClause = {
      [Op.or]: [
        {
          nome: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    try {
      const itm = await Produto.findAndCountAll({
        include: [
          {
            model: Marca,
            attributes: ["id", "nome"],
          },
          {
            model: Setor,
            attributes: ["id", "nome"],
          },
        ],
        attributes: ["id", "nome", "preco"],
        distinct: true,
        where: whereClause,
        limit: limit,
        offset: offset * limit,
        order: [[order, direction]],
      });

      res.json(itm);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
