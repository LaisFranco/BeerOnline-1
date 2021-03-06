// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongojs		   = require('mongojs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// configuration ===========================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

var conn    = mongoose.connection;

/////////////////////   RESTFUL APIS TUTORIAL

// server.js

// BASE SETUP
// =============================================================================

var Product     = require('./app/models/Product');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /products
// ----------------------------------------------------


    // create a product (accessed at POST http://localhost:8080/api/product)
router.route('/products').post(function(req, res) {
        
        var product = new Product();      // create a new instance of the Product model
        product.name = req.body.name;
        product.brand = req.body.brand;
        product.weight = req.body.weight;
        product.qty = req.body.qty;

        // save the product and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product created!' });
        });
        
    });

    // get all the products (accessed at GET http://localhost:8080/api/products)
router.route('/products').get(function(req, res) {
        Product.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });

// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/products/:product_id').get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    });

router.route('/products/:product_id').put(function(req, res) {

        // use our product model to find the product we want
        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);

            product.name = req.body.name; 
            product.brand = req.body.brand;
            product.weight = req.body.weight;
            product.qty = req.body.qty;
            product.id = req.body.id;

            // save the product
            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product updated!' });
            });

        });
    });

router.route('/products/:product_id').delete(function(req, res) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// // get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// // routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app