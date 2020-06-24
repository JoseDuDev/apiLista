var http = require('http');
var express = require('express');
var app = express()
var server = http.Server(app)
var bodyParser = require("body-parser")
require('dotenv').config()

app.use(bodyParser.json({ limit: '50mb', extended: true, type: '*/*' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

var content = require('./api')
content(app)

//server.listen(process.env.PORT || 98);
app.listen(8183, () =>{
  console.log("Rodando a porta 8183")
})

// var io = require('socket.io')(server, { path: '/vuex', });
// var cors = require('cors')

// 
// 
// app.use(cors({
//     credentials: true,
//     origin: [
//         'http://172.31.255.201:8080',
//         'http://localhost:8080',
//         'http://srvdevsga08:99',
//         'http://localhost:99',
//         'http://srvdevsga08.contoso.com:99',
//     ]
// }))

// var AD = require('ad');

// var ad = new AD({
//         url: process.env.AD_CONFIG_URL,
//         baseDN: process.env.AD_CONFIG_DN,
//         user: process.env.AD_CONFIG_USER,
//         pass: process.env.AD_CONFIG_PASS,
// });
    
// ad.cache(false);

// var reports = require('./api/relatorios')
// reports(app)

// 
// 

// var vuexSocket = require('./api/socket')
// vuexSocket(io)

// //var jobs = require('./api/jobs')
// //jobs(app, ad)

// server.listen(process.env.PORT || 98);
