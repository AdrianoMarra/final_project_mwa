var jwtSupport = require('../util/jwtSupport')
var Users = require('../models/users')

class UsersController {

    async findAll(req, res) {
        let response = await Users.getAll(req);
        res.json(response);
    }

    async find(req, res) {
        let response = await Users.get(req);
        res.json(response);
    }

    async createNew(req, res) {
        let response = await Users.create(req);
        if (response._id){
            let generatedToken = jwtSupport.generateUserToken(response);
            console.log(response);
            res.status(200).send({
                JWT: generatedToken
             });    
        }else{
            res.status(process.env.ERROR_USER_NOT_FOUND).send({
                message: 'Sign up Failed, Please retry later',
                token:'N/A'
            });
        } 
    }
    
    async authenticate(req, res) {
        let response = await Users.authenticate(req);
        if (response.userWithOutPassword){
            let generatedToken = jwtSupport.generateUserToken(response.userWithOutPassword);
            res.status(200).send({
                JWT: generatedToken
             });    
        }else{
            res.status(process.env.ERROR_USER_NOT_FOUND).send({
                message: 'Authentication Failed',
                token:'N/A'
            });
        } 
       
    }

    async updateExistingUserProfile(req,res){
        let response=await Users.updateExistingUserProfile(req,res);
        res.json(response);
    }


}

module.exports = new UsersController();