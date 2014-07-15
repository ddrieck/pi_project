$(document).ready(function(){
	var apiURL = 'http://pi-project.herokuapp.com/api/products/';
	var searchURL = 'http://pi-project.herokuapp.com/api/products/search/';

$('#search-form').submit(function(event){
		event.preventDefault();
		var keyword = $('.search-bar').val();
		$(".results").empty();
		$("#search-section").css("margin-top", "2%");
		if ($('.select-bar').val() === "products"){
			$.getJSON(searchURL + keyword, function(data){
				console.log(data);
				if (data.length === 0){
					$('.results').append("<h1>No Results</h1>");
				} else {
					for (var i = 0; i < data.length; i++) {
						$('.results').append("<p>" + data[i].title + "</br>By: " + data[i].brand + "</br>" + data[i].upc + "</p>");
					};
				};
			});	
		} else {
			$.getJSON(searchURL + 'category/' + keyword, function(data){
				if (data.length === 0){
					$('.results').append("<h1>No Results</h1>");
				} else {
					for (var i = 0; i < data.length; i++) {
						$('.results').append("<p>" + data[i].parentCategory + "</br>" + data[i].category + "</p>");
					};
				};
			});	
		};
	});
});