$(document).ready(function(){
	//These scripts are for the interacting with the dropdown list that is created when searching the catalog.
	var catURL = 'http://pi-project.herokuapp.com/api/products/category/';

	//When we click on an item in our results list run this callback
	$(".results").on("click", ".item-select",function(){
		//Grab the category text and encode it so it can be passed into the API call
		var category = $.trim($(this).children('.category-item').text());
		category = encodeURIComponent(category);

		//Set this scope so that our getJSON call below is able to append the text in the appropriate place.
		var clickElement = $(this);
		
		//If the arrow is pointing write nothing is listed yet.
		if ($(this).children('.arrow').html() === '▶'){
				//Create a downward pointing arrow and create an empty list tag.
				$(this).children('.arrow').html('&#9660;');
				$(this).children('.category-item').append("<ul class='product-titles'></ul>");
				$.getJSON(catURL + category, function(data){
					//Loop through our returned category and the products belonging to those categories to the list.
					for (var i = 0; i < data.length; i++) {
						clickElement.find(".product-titles").append("<li class='product'>" + data[i].title + "</li>");
					};
				});
			} else {
				//If the arrow is pointing downward we want to remove our product list and revert the arrow to the original state.
				$(this).children('.arrow').html('&#9654;');
				$(this).find(".product-titles").remove();
		};
	});
});