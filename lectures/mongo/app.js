// npm install mongoose --save
// npm install q --save
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost/zhong-yuqing-webdev');

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: {type: Date, default: Date.now},
    rating: Number
});

var blogModel = mongoose.model("BlogPost", blogPostSchema);



// function updateBLogPost(postId, newPost) {
//
//     .then(function (status) {
//         return function findBLogPostById(postId) {
//             return blogModel.find({_id: postId});
//         }
//     }, )
//     return blogModel
//         .update({_id: postId}, {
//             $set: newPost
//         });
// }

function deleteBlogPost(postId) {

}

function findAllBlogPosts() {
    return blog.find();
    // then(function (posts) {
    //     console.log(posts);
    // })
    // return blogModel.find(function (err, docs) {
    //     return docs;
    // });
}

function createBlogPost(blogPost) {
    return blogModel
        .create(blogPost);
    /*.then(function (doc) {
     console.log(doc);
     }, function (err) {
     console.log(err);
     });*/
}

// up & down two way to create function

// createBlogPost({title: 'post 12345', body: 'body 123456'})
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.log(err);
//     });