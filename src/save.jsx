

const Save = (request) => {
    const path = request.route.path;
    const body = request.body;
    //TODO, still need to figure out whether to create an RDS database, or modify 
    switch(path){
        case '/update':
            console.log('updating');
            console.log('body',body);
            break;
        case '/submit':
            console.log('submission');
            break;
        default:
            console.log('path not defined');
    }
};

module.exports = {Save};