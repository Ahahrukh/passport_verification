const validateSchema = ( schema , data ) => {
    const validate = schema.validate(data) ;
    if(validate.error && validate.error.details) {
        throw new Error(formatErrorMessages(validate.error.details));
    }else{
        return validate.value;
    }
}

const formatErrorMessages = (errorDetails) => {

    let allErrors = '';
    for ( const error of errorDetails ) {
        allErrors += error.message + '\n';
    }
    return allErrors;

};

export default validateSchema