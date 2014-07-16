$(document).ready(function(){
	var apiURL = 'http://localhost:5000/api/products/';
	var searchURL = 'http://localhost:5000/api/products/search/';

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
						$('.results').append("<p class='products'><span class='title'>" + data[i].title + "</span><span class='categories'>" + data[i].parentCategory + " &gt; " + data[i].category + "</span><span class='product_text'></br>By: " + data[i].brand + "</br>UPC #:" + data[i].upc + "</span></p>");
					};
				};
			});	
		} else {
			$.getJSON(searchURL + 'category/' + keyword, function(data){
				if (data.length === 0){
					$('.results').append("<h1>No Results</h1>");
				} else {
					for (var i = 0; i < data.length; i++) {
						$('.results').append("<p class='categories'>" + data[i].parentCategory + "</br>" + data[i].category + "</p>");
					};
				};
			});	
		};
	});
});