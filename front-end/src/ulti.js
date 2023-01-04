function getErrorMessage(error){
    return error.response?
    (error.response.data? error.response.data.message : error.message) 
    : error.message;
}

export {getErrorMessage}