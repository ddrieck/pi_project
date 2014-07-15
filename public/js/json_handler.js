$(document).ready(function(){
	var apiURL = 'http://pi-project.herokuapp.com/api/products/';
	var searchURL = 'http://pi-project.herokuapp.com/api/products/search/';

$('#search-form').submit(function(event){
		event.preventDefault();
		var keyword = $('.search-bar').val();
		console.log("hello")
		console.log(keyword);
		if ($('.select-bar').val() === "products"){
			$.getJSON(searchURL + keyword, function(data){
				console.log(data);
				});	
		} else {
			$.getJSON(searchURL + 'category/' + keyword, function(data){
				console.log(data);
				});	
		};
	});
});