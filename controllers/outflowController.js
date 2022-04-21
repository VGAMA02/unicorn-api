const outflowModel = require("../models/outflowModel")
const constants = require("../constants")

async function addOutflow(req,res){
    try {
        let exist = await outflowModel.getOutflowdById(req.body.id);
        console.log(req.body);
        if(exist){
            let data = {
                Message: 'El outflow ya existe, intente con otro',
                status: false
            }
            res.send(data);
            return
        }
        console.log(req.body);
        await outflowModel.addOutflow({
            amount: req.body.amount,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            description: req.body.description,
            idType: req.body.idType,
            idUser: req.body.idUser

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

module.exports = {addOutflow}

/*
{
    "amount": "1500.50", "startDate": "2000-02-30", "endDate": null, "status": 1, "description":"se lo debo al csm del taquero", "idType": 1, "idUser": 1
}
*/