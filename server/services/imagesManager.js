var _ = require('underscore');
var async = require('async');

var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;

module.exports = {
    store: function (image, callback) {
        var data = image.base64;

        function decodeBase64Image(dataString) {
            var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }

            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');

            return response;
        }

        var imageBuffer = decodeBase64Image(data);
        console.log(imageBuffer);

        var path = 'images/' + image.username + '/' + image.path;

        console.log(getDirName(path));
        mkdirp(getDirName(path), function (err) {
            if (err) return callback(err);

            fs.writeFile(path, imageBuffer.data, function (err) {
                callback(err);
            });
        });

        /* fs.writeFile(path, imageBuffer.data, function (err) {
            callback(err);
        }); */
    },

    storeImagesByTrip: function (trip, callback) {
        var self = this;
        var asyncTasks = [];
        if (trip.stops != null && trip.stops.length > 0) {
            trip.stops.forEach(stop => {
                if (stop.images != null && stop.images.length > 0) {

                    stop.images.forEach(image => {
                        asyncTasks.push(function (callback) {
                            var path = trip.id + '/' + stop.id + '/' + image.id + '.PNG';
                            image.path = path;
                            self.store(image, function (err) {
                                // Async call is done, alert via callback
                                callback();
                            });
                        });
                    });
                }
            });
        }

        async.parallel(asyncTasks, function (err) {
            // All tasks are done now
            callback(err, 'storeTrip');
        });
    }
}