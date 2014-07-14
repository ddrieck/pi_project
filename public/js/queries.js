$(document).ready(function(){
	var category = 'TRIM-A-TREE';
	var catAPI = 'http://pi-project.herokuapp.com/api/products/category/parent/' + category;
	$.getJSON(catAPI, function(data){
		console.log(data);
	});
});