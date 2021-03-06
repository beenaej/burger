var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

//Create all our routes and setup logic within those routes
router.get("/", function(req,res){
	burger.selectAll(function(data){
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/burgers", function(req,res){
	burger.insertOne([
		"burger_name"
	], [
	 	req.body.burger_name
	], function(data){
		//Send back the ID of the new burger
		res.redirect("/");
	});
});

router.put("/burgers/:id", function(req,res){
	var condition = "id = " + req.params.id;

	burger.updateOne({
		devoured: true
	}, condition, function(data) {
		res.redirect("/");
	});
});

module.exports = router;