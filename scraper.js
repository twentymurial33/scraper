const cheerio = require('cheerio');
const request = require('request');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

// const Image = require('./Image.model');

var db = 
process.env.MONGODB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/murial_scraper';

mongoose.connect(db, function(err,res){
	if(err){
		console.log("Error connection to: " + db + '. ' + err);
	} else {
		console.log("Succeeded connecting to: " + db);
	}
});

app.get('/scrape-me', (req, res) => {
	request('https://newyorker.com', (err, response, html) => {
		if(err){
			res.json(err)
		}

		let $ = cheerio.load(html);

		$('.component-responsive-image').each((index, element) => {
			var pics = $(element).find('img').attr('src');
			Image.insertMany([{image: pics}]);
		});
		res.json("Murial Rocks");
	})
})

app.get('/images', (req, res) => {
	Image.find({}).then((images) => {
		res.json(images);
	})
});

res.send("Scrape Complete");

app.listen(3000);