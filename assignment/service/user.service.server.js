const app = require('../../express');
var users = [
    {
        _id: "123",
        username: "alice",
        password: "alice",
        firstName: "Alice",
        lastName: "Wonder"
    },
    {
        _id: "234",
        username: "bob",
        password: "bob",
        firstName: "Bob",
        lastName: "Marley"
    },
    {
        _id: "345",
        username: "charly",
        password: "charly",
        firstName: "Charly",
        lastName: "Garcia"
    },
    {
        _id: "456",
        username: "jannunzi",
        password: "jannunzi",
        firstName: "Jose",
        lastName: "Annunzi"
    }
];


// start all url with '/aps' ('/rest' is also popular)
// :userId: path params
app.get('/api/assignment/user/:userId', findUserById);
app.get('/api/assignment/user', findAllUsers);
//noinspection JSUnresolvedFunction
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);


function deleteUser(req, res) {
    var userId = req.params.userId;
    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function updateUser(req, res) {
    var user = req.body;
    // console.log(user);
    var userId = req.params.userId;

    for (var u in users) {
        if (userId === users[u]._id) {
            users[u] = user;
            // res.json(user);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);

}


function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    user.created = new Date();
    users.push(user);
    res.json(user);
}


function findUserById(req, res) {
    var userId = req.params.userId;
    for (var u in users) {
        if (users[u]._id === userId) {
            res.send(users[u]);
            return;
        }

    }
    res.sendStatus(404);
}

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        for (var u in users) {
            var user = users[u];
            if (user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    } else if (username) {
        var user = users.find(function (user) {
            return user.username === username;
        });
        if (typeof user === 'undefined') {
            res.sendStatus(404);
            return;
        }
        res.json(user);
    }
    else {
        res.json(users);
    }


}