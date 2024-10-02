import validateSchema from '../common/validator_helper.js';
import Validator from '../validator/validator.js';

function requestValidatorMiddleware( req , res , next ){
   const requestData = {...req.body , ...req.query , ...req.params} ;
   const routerPathKey = req.method.toUpperCase() + req.baseUrl + req.route.path;
   const schema = Validator[routerPathKey] ;
   if(!schema){
    return next()
   }
   try {
    validateSchema(schema , requestData)
   } catch (error) {
    console.log({
        message : error.message
    })
    return error.message
   }
   next() ;
}

export default requestValidatorMiddleware ;
