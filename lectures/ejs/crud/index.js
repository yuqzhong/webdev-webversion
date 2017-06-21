const app = require('../../../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/zhong-yuqing-webdev');

var userModel = require('../../../assignment/model/user/user.model.server');


app.get('/lectures/ejs/crud/users', findAllUsers);
app.get('/lectures/ejs/crud/user/:userId/delete', deleteUser);
app.get('/lectures/ejs/crud/user/:userId/select', selectUser);

app.get('/hello/from/client', hello);
app.post('/lectures/ejs/crud/users', postUser);


// function selectUsr(req, res) {
//     scope = {};
//     userModel
//         .findUserById(req.params.userId)
//         .then(function (user) {
//             scope.selectedUser= user;
//             return userModel
//                 .findAllUsers();
//         })
//         .then(function (users) {
//
//         })
// }

function selectUser(req, res) {
    var scope = {};

    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            scope.selectedUser = user;
            return userModel
                .findAllUser();
        })
        .then(function (users) {
            scope.users = users;
            res.render('/lecture/ejs/crud/user-list.view.server.ejs', scope);
        });
}
function postUser(req, res) {
    var user = req.body;
    if (user.action === 'create') {
        userModel
            .createUser(req.body)
            .then(function (user) {
                res.redirect('/lecture/ejs/crud/user');
            })
    } else if (user.action === 'update') {
        userModel
            .updateUser(req.body._id)
            .then(function (user) {
                res.redirect('/lecture/ejs/crud/user');
            })
    }
}

function deleteUser(req, res) {
    userModel
        .deleteUser(req.params.userId)
        .then(function (status) {
            res.redirect('/lectures/ejs/crud/users');
        })
}

function findAllUsers(req, res) {
    // userModel
    //     .createUser({username: 'Alice'});

    userModel
        .findAllUsers()
        .then(function (users) {
            var scope = {
                users: users,
                selectedUser: {}
            };
            res.render('lectures/ejs/crud/user-list.view.server.ejs', scope);
        })
}

function hello(req, res) {
    res.render('lectures/ejs/crud/hello');
}