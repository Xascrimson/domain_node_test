

var save = function save(request) {
    var path = request.route.path;
    var body = request.body;
    //TODO, still need to figure out whether to create an RDS database, or modify 
    switch (path) {
        case '/update':
            console.log('updating');
            console.log('body', body);
            break;
        case 'submit':
            console.log('submission');
            break;
        default:
            console.log('path not defined');
    }
};

module.exports = { save: save };