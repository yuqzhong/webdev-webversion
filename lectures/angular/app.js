
module.exports = function (app) {


    // find All posts
    app.get('/api/post', findAllPosts);
    app.get('/api/post/:index', findPostByIndex);
    // index is a path parameter

    var posts = [
        {title:'post1', body: '123'},
        {title:'post2', body: '1237766'},
        {title:'post3', body: '1237766'}
    ];

    function findAllPosts(req,res) {
        res.json(posts);
    }

    function findPostByIndex(req,res) {
        var index = req.params['index'];
        res.json(posts[index]);
    }
};