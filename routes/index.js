var express = require('express');
var router = express.Router();
let {check, validationResult, body}= require('express-validator');
var usuario = [{email: "perro@gmail.com", contrasenia: "12345678"}];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
  
});
router.post('/',[
  check("email").isEmail().withMessage("el email tiene que ser valido"),
  check("contraseña").isLength({min:8}).withMessage("la contra es muy corta")
], 
function(req, res, next) {
  
  let errores = validationResult(req);
     
            if (errores.isEmpty()){
              var usuarioALoguearse 
                for (var i = 0 ; i < usuario.length ; i ++){
                    if (usuario[i].email == req.body.email){
                        if (req.body.contraseña == usuario[i].contrasenia){
                            var  usuarioALoguearse = usuario[i];
                            
                        }
                    }
                }
                
                if (usuarioALoguearse == undefined){
                    return res.render('index', {errores:[{msg : 'credenciales invalidas'}]});
                    
                };

                if (usuarioALoguearse != undefined){
                  res.cookie('recordame', usuarioALoguearse.email, { maxAge :  6000000000000000000} )
                  
                }
                req.session.usuarioLogueado = usuarioALoguearse;

                
                // CONTRASEÑA COOKIES
                
                res.redirect('/perfil');
                
               
            }else{
                return res.render('index',{errores : errores})
            }   
});

router.get('/perfil',function(req, res){
  console.log(req.session.usuarioLogueado)
    const user = req.session.usuarioLogueado;
    delete req.session.usuarioLogueado;
    res.render('perfil', {
      user
    } );
});
router.get('/home',function(req, res){
  console.log(req.cookies.recordame)
    const user = req.cookies.recordame;
    
    res.render('home', {
      user
    } );
});
module.exports = router;
