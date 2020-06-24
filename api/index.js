module.exports = function (app) {

  app.get("/api", (req, res) => {
    res.send('Ok')
  });

  var setor = require('./setor');
  setor(app);

  var marca = require('./marca');
  marca(app);

  var tipomedida = require('./tipomedida');
  tipomedida(app);
  
  var produto = require('./produto');
  produto(app);
  
  var lista = require('./lista');
  lista(app);

}