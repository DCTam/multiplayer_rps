const User = require('../models/user');
const mongoose = require('mongoose');


function updateWinsLosses(winner,loser){

	//Increment winner's wins statistic by one
	User.findOneAndUpdate({username: winner}, {$inc:{wins: 1}}, (err, doc) => {
		if(doc){
			console.log("Something wrong when updating data!");
		}

		console.log(doc);
	});

	//Increment loser's losses statistics by one
	User.findOneAndUpdate({username: loser}, {$inc:{losses: 1}}, (err, doc) => {
		if(doc){
			console.log("Something wrong when updating data!");
		}

		console.log(doc);
	});
}

function retrieveProfile(username, callback) {

	User.find({username: username}, {wins: 1, losses: 1}, (err, doc) => {
		//Return err if any
		if(err){
			console.log(err);
		}
		//Call back to socket emit with obj (first element of array)
		else{
			callback(null, doc[0]);
		}
	});
}

function retrieveLeaderboard(callback){
		User.find({$or: [
			{wins: {$gt: 0}}, {losses: {$gt: 0}}
			]})
			.sort({wins: -1}).exec((err, doc) => {
			if(err){
				console.log(err);
			}
			callback(null, doc);
		});
}

module.exports = {
	updateWinsLosses,
	retrieveProfile,
	retrieveLeaderboard
}

