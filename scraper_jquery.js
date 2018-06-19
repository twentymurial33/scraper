$(document).ready(function(){
	
	$.ajax({

		method: 'GET',
	
		url: '/scrape-me'
	
	}).then(function(results){
           console.log(results)
		var scrapedDiv = $('<div id="scraped-div">');

		scrapedImg=$("<img>",{
			src:results,image
		});
		$("#scraped-stuff").append(scrapedImg)
})
  
})

