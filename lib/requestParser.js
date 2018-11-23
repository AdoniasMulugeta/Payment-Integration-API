exports.params = {
    uid : (request, response, next)=>{
        request.client_id = request.params.uid || null;
        next()
    }
};