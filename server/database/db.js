// We'll be using MongoDB
var mongo = require('mongodb');

// These variables are local to this module
var db;
var tripCollection;
var context;
var settings;

module.exports = db = {
  // Initialize the module. Invokes callback when ready (or on error)
  init: function (contextArg, callback) {
    context = contextArg;
    settings = context.settings;

    // Open the database connection
    var dbConnection = new mongo.Db(
      settings.db.name,
      new mongo.Server(settings.db.host, settings.db.port, {}),
      {});

    // db.open doesn't happen right away; we pass a callback function
    // to know when it succeeds
    dbConnection.open(function (err) {
      if (err) {
        // If something goes wrong, call the callback with the error so
        // server.js is aware of the problem
        callback(err);
      }
      // Fetch a MongoDB "collection" (like a table in SQL databases)
      tripCollection = dbConnection.collection('trip');

      // Make sure that collection has a unique index on the "slug" field
      // before we continue. This ensures we don't have two blog posts
      // with the same slug. Once again, we pass a callback function
      tripCollection.ensureIndex("id", { unique: true }, function (err, indexName) {
        // Now the database is ready to use (or an error has occurred). Invoke the callback
        callback(err);
      });
    });
  },

  trips: {
    // Find all trips in reverse order (blog order)
    findAll: function (callback) {
      tripCollection.find().sort({ created: -1 }).toArray(function (err, trips) {
        callback(err, trips);
      });
    },
    // Fetch a particular trip by its id
    findOneById: function (id, callback) {
      tripCollection.findOne({ id: id }, function (err, trip) {
        callback(err, trip);
      });
    },
    // Insert a new trip
    insert: function (trip, callback) {
      // Set the creation date/time
      trip.created = new Date();
      // Create a reasonable id from the title
      trip.id = "trip_" + trip.created.getTime() + "_" + db.slugify(trip.name);

      // Pass the 'safe' option so that we can tell immediately if
      // the insert fails (due to a duplicate id, for instance)
      tripCollection.insert(trip, { safe: true }, function (err) {
        if (err) {
          console.log(err);
          callback(err);
        }
        else {
          callback(err, trip);
        }
      });
    },
    update: function (trip, callback) {
      delete trip._id;
      trip.created = new Date();
      tripCollection.update({ id: trip.id }, trip, function (err) {
        if (err) {
          console.log(err);
          callback(err);
        }
        else {
          callback(err, trip);
        }
      });
    },
    delete: function (tripId, callback) {
      tripCollection.deleteOne({ id: tripId}, function (err) {
        if (err) {
          console.log(err);
          callback(err);
        }
        else {
          callback(err, tripId);
        }
      });
    }
  },
  // Create a reasonable slug for use in URLs based on the supplied string
  slugify: function (s) {
    // Note: you'll need to use xregexp instead if you need non-Latin character
    // support in slugs

    // Everything not a letter or number becomes a dash
    s = s.replace(/[^A-Za-z0-9]/g, '-');
    // Consecutive dashes become one dash
    s = s.replace(/\-+/g, '-');
    // Leading dashes go away
    s = s.replace(/^\-/, '');
    // Trailing dashes go away
    s = s.replace(/\-$/, '');
    // If the string is empty, supply something so that routes still match
    if (!s.length) {
      s = 'none';
    }
    return s.toLowerCase();
  }
};

