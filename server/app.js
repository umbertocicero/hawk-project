var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = {
  init: function (context, callback) {

    var options = {
      dotfiles: 'ignore',
      etag: true,
      extensions: ['htm', 'html'],
      index: 'index.html',
      lastModified: true,
      maxAge: '1d',
      setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
        res.header('Cache-Control', 'public, max-age=1d');
      }
    };

    // Create an Express app object to add routes to and add
    // it to the context
    var app = context.app = express();
    // The "body parser" gives us the parameters of a 
    // POST request is a convenient req.body object
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
  //  app.use('/', express.static(__dirname + '/public', options));
  //  app.use('*', express.static(__dirname + '/public', options));



    var router = express.Router();
    app.use('/', router);
    //creiamo il middleware per preelaborare le richieste
    router.use(function (req, res, next) {

      console.log("request " + req.method, req.url);

      //continua con la prossima istruzione
      next();
    });
    // Deliver a list of posts when we see just '/'

    router.get('/home', function (req, res) {
      context.db.posts.findAll(function (err, posts) {
        if (err) {
          notFound(res);
          return;
        }
        var s = "<title>My Blog</title>\n";
        s += "<h1>My Blog</h1>\n";
        s += '<p><a href="/new">New Post</a></p>' + "\n";
        s += "<ul>\n";
        for (var slug in posts) {
          var post = posts[slug];
          s += '<li><a href="/posts/' + post.slug + '">' + post.title + '</a></li>' + "\n";
        }
        s += "</ul>\n";
        res.send(s);
      });
    });

    // Deliver a specific post when we see /posts/ 
    router.get('/posts/:slug', function (req, res) {
      context.db.posts.findOneBySlug(req.params.slug, function (err, post) {
        if (err || (!post)) {
          notFound(res);
          return;
        }
        var s = "<title>" + post.title + "</title>\n";
        s += "<h1><a href='/'>My Blog</a></h1>\n";
        s += "<h2>" + post.title + "</h2>\n";
        s += post.body;
        res.send(s);
      });
    });

    // Deliver a "new post" form when we see /new.
    // POST it right back to the same URL; the next route
    // below will answer 
    router.get('/new', function (req, res) {
      newPost(res);
    });

    // Save a new post when we see a POST request
    // for /new (note this is enough to distinguish it
    // from the route above)
    router.post('/new', function (req, res) {
      var post = _.pick(req.body, 'title', 'body');
      context.db.posts.insert(post, function (err, post) {
        if (err) {
          // Probably a duplicate slug, ask the user to try again
          // with a more distinctive title. We'll fix this
          // automatically in our next installment
          newPost(res, "Make sure your title is unique.");
        }
        else {
          res.redirect('/posts/' + post.slug);
        }
      });
    });

    // Send the "new post" page, with an error message if needed
    function newPost(res, message) {
      var s = "<title>New Post</title>\n";
      s += "<h1>My Blog</h1>\n";
      s += "<h2>New Post</h2>\n";
      if (message) {
        s += "<h3>" + message + "</h3>\n";
      }
      s += '<form method="POST" action="/new">' + "\n";
      s += 'Title: <input name="title" /> <br />' + "\n";
      s += '<textarea name="body"></textarea>' + "\n";
      s += '<input type="submit" value="Post It!" />' + "\n";
      s += "</form>\n";
      res.send(s);
    }

    router.get('*', function (req, res) {
      notFound(res);
    });

    // The notFound function is factored out so we can call it
    // both from the catch-all, final route and if a URL looks
    // reasonable but doesn't match any actual posts

    function notFound(res) {
      res.send('<h1>Page not found.</h1>', 404);
    }



    // We didn't have to delegate to anything time-consuming, so
    // just invoke our callback now
    callback();
  }
};

