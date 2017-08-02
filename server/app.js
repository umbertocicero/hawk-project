var _ = require('underscore');
var express = require('express');
var cors = require('cors')
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

    app.use(cors());

    // The "body parser" gives us the parameters of a 
    // POST request is a convenient req.body object
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
    //  app.use('/', express.static(__dirname + '/public', options));
    //  app.use('*', express.static(__dirname + '/public', options));

    var router = express.Router();

    // Cross Origin middleware
    app.use(function (req, res, next) {
      // res.header("Access-Control-Allow-Origin", "*")
      // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    });


    app.use('/', router);

    //creiamo il middleware per preelaborare le richieste
    router.use(function (req, res, next) {

      console.log("request " + req.method, req.url);

      //continua con la prossima istruzione
      next();
    });
    // Deliver a list of posts when we see just '/'

    // router.get('/getTrip', function (req, res) {
    //   context.db.trips.findAll(function (err, trips) {
    //     if (err) {
    //       res.send("Error :: " + err);
    //     } else {
    //       res.status(200).json(trips);
    //     }
    //   });
    // });

    router.get('/getTrip/:id?', function (req, res) {
      let id = req.params['id'];
      if (id) {
        console.log('findOneById/' + id);
        context.db.trips.findOneById(id, function (err, trip) {
          if (err) {
            res.send("Error :: " + err);
          } else {
            res.status(200).json(trip);
          }
        });
      } else {
        console.log('findAll');
        context.db.trips.findAll(function (err, trips) {
          if (err) {
            res.send("Error :: " + err);
          } else {
            res.status(200).json(trips);
          }
        });

      }
    });
    // Save a new post when we see a POST request
    // for /new (note this is enough to distinguish it
    // from the route above)
    router.post('/addTrip', function (req, res) {
      var trip = req.body;
      console.log(trip);
      // var trip = _.pick(req.body, 'title', 'body');
      context.db.trips.insert(trip, function (err, trip) {
        if (err) {
          // Probably a duplicate slug, ask the user to try again
          // with a more distinctive title. We'll fix this
          // automatically in our next installment
          res.send("Error :: " + err);
        }
        else {
          res.status(200).json({ id: trip.id });
        }
      });
    });
    router.put('/updateTrip', function (req, res) {
      var trip = req.body;
      console.log(trip);
      // var trip = _.pick(req.body, 'title', 'body');
      context.db.trips.update(trip, function (err, trip) {
        if (err) {
          // Probably a duplicate slug, ask the user to try again
          // with a more distinctive title. We'll fix this
          // automatically in our next installment
          res.send("Error :: " + err);
        }
        else {
          res.status(200).json({ id: trip.id });
        }
      });

    });

    router.delete('/deleteTrip/:id', function (req, res) {
      let tripId = req.params['id'];
      context.db.trips.delete(tripId, function (err, trip) {
        if (err) {
          // Probably a duplicate slug, ask the user to try again
          // with a more distinctive title. We'll fix this
          // automatically in our next installment
          res.send("Error :: " + err);
        }
        else {
          res.status(200).json({ id: tripId });
        }
      });
    });


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

