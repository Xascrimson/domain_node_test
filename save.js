

const save = (request,userData) => {
    const path = request.route.path;
    const body = request.body;
    switch(path){
        case '/update':
            console.log('updating');
            console.log('body',body);
            return {...userData,...body}
            break;
        case 'submit':
            console.log('submission');
            break;
        default:
            console.log('path not defined');
    }
};

module.exports = {save};