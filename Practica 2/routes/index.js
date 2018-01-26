var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

index.use(bodyParser.json());

const pool = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});

let dao = new daoUsers(pool);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

index.post("index", function(request, response){
  var nombre = request.body.nombre;
  var passwd = request.body.pass;

  if(nombre === undefined || passwd === undefined){
    response.setMsg("Datos incorrectos");
    response.status(400);
  }else{
    dao.insert(nombre, password, (err) => {
      if (err) {
          console.log(err);
          response.setMsg("No se pudo crear el usuario");
          response.status(500);
          response.redirect("/views/index.html");
      } else {
          response.setMsg("Usuario creado correctamente");
          response.status(201);
          response.redirect("/views/perfil.html");
      }
  });
   
  }
  //users.push(nombre,passwd);
  
  response.end();

  

});

module.exports = router;
