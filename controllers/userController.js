const userModel = require("../models/userModel")
const constants = require("../constants")
const security  = require("../SecurityFunctions")
async function addUser(req,res){
    try {
        let exist = await userModel.getUserByEmail(req.body.email);
        if(exist){
            let data = {
                Message: 'El Correo ya existe, intente con otro',
                status: false
            }
            res.send(data);
            return
        }
        console.log(req.body);
        let passB = await security.bcryptHashFunc(req.body.password);
        await userModel.addUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthDate: req.body.birthDate,
            password: passB
        });
        let data = {
            status: true
        }
        res.send(data);
        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function login(req,res){
    try {
        console.log("Login");
       if(req.body.email == "" || req.body.password == ""){
            let data = {
                status: true,
                idUser
            }
            console.log("Vacios");
            res.send(data);
            return; 
       }
       let exist = await userModel.getPasswordByEmail(req.body.email);
       let idUser = await userModel.getIdUserByEmail(req.body.email);
       console.log(exist);
       console.log(idUser);
       
       if(!exist || idUser == undefined){
            let data = {
                Message: "Datos incorrectos",
                status: false   
            }
            res.send(data);
            return;
       }
       console.log("IDuser: " + idUser);
       idUser = JSON.parse(idUser['idUser']);

       console.log(req.body);
       if(await security.bcryptCompareFunc(req.body.password,exist.password))
       {
           let data = {
               status: true,
               idUser
           }
           //console.log(data);
           res.send(data);
           return;
       }
       else
       {
            let data = {
                status: false,
                Message: "Datos incorrectos"
            }
            console.log("check");
            res.send(data);
            return;
            
       }
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function prueba(req,res){
    try{
        let exist = await userModel.findUser(req.body.email,req.body.password); //await solo funciona en async functions
        console.log(req.body);
        console.log(exist);
        if(exist){
            let data = {
                Message: 'El id ya existe, intente con otro',
                status: false
            }
            res.send(data);
            return
        }
        else
        {
            let data = {
                Message: 'El id no existe',
                status: true
            }
            res.send(data);
            return
        }
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {addUser,prueba,login}

/*
{
    "firstName": "juan", "lastName": "Corrizo", "email": "juan@outlook.com", "birthDate": "2000-02-10", "password": "tostadasDeTinga"
}
*/