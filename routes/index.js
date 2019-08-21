var express = require('express');
var router = express.Router();
var homeController = require('../controller/home.controller')
router.get('/', function(req,res) {
  res.json({
    status: 'API Working'
  });
});

router.route('/get-data-bookinfros').get(homeController.getAll);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
