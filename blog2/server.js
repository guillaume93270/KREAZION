var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/articlestest');

var articleSchema = mongoose.Schema({
    articleTitle: String,
    img: String,
    description: String,
});



var Article = mongoose.model('Article', articleSchema);
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        Article.find(function(err, articles) {
            if (err) {
                res.send(err);
            }
            res.send(articles);
        });
    })



.post(function(req, res) {
    var article = new Article();
    article.articleTitle = req.body.articleTitle;
    article.img = req.body.img;
    article.description = req.body.description;
    console.log(article);
    article.save(function(err) {

        if (err) {

            res.send(err);

        }
        res.send({
            message: 'article created'
        });
    });
});

router.route('/:article_id')
    .get(function(req, res) {
        Article.findOne({
            _id: req.params.article_id
        }, function(err, article) {

            if (err) {
                res.send(err);
            }

            res.send(article);
        });
    })



.put(function(req, res) {
    Article.findOne({
        _id: req.params.article_id
    }, function(err, article) {
      article.articleTitle = req.body.articleTitle;
      article.img = req.body.img;
      article.description = req.body.description;
        article.save(function(err) {

            if (err) {
                res.send(err);

            }

            res.send({
                message: "article updated"
            });
        });
    });
})

.delete(function(req, res) {

    Article.remove({
        _id: req.params.article_id
    }, function(err) {

        if (err) {

            res.send(err);

        }

        res.send({
            message: "article deleted"
        });

    });
});

app.use('/api', router);
app.listen(port, function() {

    console.log('listening on port ' + port);

})
