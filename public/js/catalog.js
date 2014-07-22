$(document).ready(function(){
	//This writes out the text for our catalog page. Essentially taking our entire database and writing it into a tree structure.
	var apiURL = 'http://pi-project.herokuapp.com/api/products/category/parent';
	var parentCatURL = "http://pi-project.herokuapp.com/api/products/category/parent/"
	var catURL = 'http://pi-project.herokuapp.com/api/products/category/';

	//We start by writing out our parent categories. There are only about 90 of them so we can process through all unique values.
	$.getJSON(apiURL, function(data){
		for (var i = 0; i < data.length; i++) {
			$('.catalog-section').append("<span class='parent-list'><span class='parent-arrow'>▶</span><span class='parent-item'>" + data[i] + "</span></span></br>");
		};
	});

	//When someone clicks on one of the parent categories run the below callback
	$(".catalog-section").on("click", ".parent-list",function(){
		//Start by capturing the text of the clicked element and passing that to our parent category API
		var parentCategory = $.trim($(this).children('.parent-item').text());
			parentCategory = encodeURIComponent(parentCategory);

		var clickElement = $(this);

		//If the arrow is pointing write we need to create our category list
		if ($(this).find('.parent-arrow').html() === '▶'){
				//Change the arrow to face downward
				$(this).children('.parent-arrow').html('&#9660;');
				//Create an empty list element after the parent category item.
				$(this).after("<ul class='category-list'></ul>");
				$.getJSON(parentCatURL + parentCategory, function(data){
					//Call the API and get products back that contain the clicked parent category. Take the categories and write those out to the list
					for (var i = 0; i < data.length; i++) {
						clickElement.next(".category-list").append("<span class='category-item'><span class='arrow'>▶</span><li class='category-title'>" + data[i].category + "</li></span><br />");
					};
				});
			} else {
				//If the arrow is already facing downward, move it to the original state and clear the category list when clicked again.
				$(this).find('.parent-arrow').html('&#9654;');
				$(this).next(".category-list").remove();
		};
	});

	//When a sub category is click we want to create a list of produts that related to that category
	$(".catalog-section").on("click", ".category-item",function(){
		//Extract the category name and pass through our category API
		var category = $.trim($(this).children(":first").next().text());
			category = encodeURIComponent(category);

		var clickElement = $(this);

		if ($(this).children('.arrow').html() === '▶'){
				//If the arrow is pointing to the right append an empty list
				$(this).children('.arrow').html('&#9660;');
				$(this).children('.category-title').append("<ul class='product-list'></ul>");
				//Get all the product titles from our returned API objects and populate the list
				$.getJSON(catURL + category, function(data){
					for (var i = 0; i < data.length; i++) {
						clickElement.find(".product-list").append("<li class='product-titles'>" + data[i].title + "</li>");
					};
				});
			} else {
				//If the category is clicked again revert to the original arrow state and collapse the product list
				$(this).children('.arrow').html('&#9654;');
				$(this).find(".product-list").remove();
		};
	});
});