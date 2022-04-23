const db_context = require('../../db/context');
const User = require('../../db/models/global/User');
let availableRoutes = [];

async function init(app, routePrefix) {
    let route = routePrefix + 'user/new';
    await route_CreateUser(app, route);
    availableRoutes.push({
        path: route,
        method: 'POST'
    });
    
    route = routePrefix + 'user/auth';
    await route_AuthenticateUser(app, route);
    availableRoutes.push({
        path: route,
        method: 'POST'
    });
    
    console.log("Global routes iniitialized.");
    console.log("Available routes: " + JSON.stringify(availableRoutes));
}

async function route_CreateUser(app, route) {
    app.post(route, async function(req,res) {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let emailId = req.body.emailId;
        let phone = req.body.phone;
        let password = req.body.password;
    
        if (firstName != "" && lastName != "" && emailId != "" &&
        phone != "" && password != "") {
            let params = {
                firstName: firstName,
                lastName: lastName,
                emailId: emailId,
                phone: phone,
                password: password
            };
            let response = await User.create(db_context.models.global['User'], params);

            res.status(200);
            res.send("User created successfuly.");
        }  
        else {
            res.status(400);
            res.send("Invalid or missing parameters. Please try again with values for all fields.");
        }    
    });
}

async function route_AuthenticateUser(app, route) {
    app.post(route, async function(req,res) {
        let emailId = req.body.emailId;
        let password = req.body.password;
    
        if (emailId != "" && password != "") {
            let user = await User.read(db_context.models.global['User'], emailId);

            if(user.password === password) {
                res.status(200);
                res.cookie('emailId', emailId);
                res.send("Authentication successful!")
            }
            else {
                res.status(401);
                res.send("Invalid login credentials. Please try again with valid login credentials.");
            }
        }  
        else {
            res.status(400);
            res.send("Invalid or missing parameters. Please try again with values for all fields.");
        }  
           
    });
}

module.exports = {
    init: init
}