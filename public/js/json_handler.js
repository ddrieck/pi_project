$(document).ready(function(){
	var apiURL = 'http://pi-project.herokuapp.com/api/products/';
	var searchURL = 'http://pi-project.herokuapp.com/api/products/search/';

$('#search-form').submit(function(event){
		//When someone submits the search form prevent it from actually submitting
		event.preventDefault();
		$('#all-products').remove();
		var keyword = $('.search-bar').val();
		//Make sure our results section is empty so that we are appending infinitly
		$(".results").empty();
		//Move the search bar to the top of the screen
		$("#search-section").css("margin-top", "2%");
		if ($('.select-bar').val() === "products"){
			$.getJSON(searchURL + keyword, function(data){
				console.log(data);
				//If nothing is found show no results text
				if (data.length === 0){
					$('.results').append("<h1 class='no-results'>Sorry, nothing found. Please try another keyword.</h1>");
				} else {
					for (var i = 0; i < data.length; i++) {
						//Loop through our returned products and create a list of items for people to view. 
						$('.results').append("<p class='products'><span class='title'>" + data[i].title + "</span><span class='categories'>" + data[i].parentCategory + " &gt; " + data[i].category + "</span><span class='product_text'></br>By: " + data[i].brand + "</br>UPC #:" + data[i].upc + "</span> </p>");
					};
				};
			});	
		} else {
			//This API call is made if someone choose to search by category instead of product.
			$.getJSON(searchURL + 'category/' + keyword, function(data){
				if (data.length === 0){
					$('.results').append("<h1 class='no-results'>Sorry, nothing found. Please try another category.</h1>");
				} else {
					//There is no parent > category hierarchy so we need to run this function inorder to clean up the data and make it useful.
					var categoryHier = createCatHier(data);

					//Once we have propertly structured data we have to find the name of the keys. In this case the keys are the parent categories of whatever the user searched for
					Object.getOwnPropertyNames(categoryHier).
						//Loop through each parent category and grab the value. Write those into our DOM
						forEach(function(val, idx, array){
							var categories = "";
							for (var i = 0; i < categoryHier[val].length; i++) {
							 	categories += "<div class='item-select'><span class='arrow'>▶</span><li class='category-item'> " + categoryHier[val][i] + "</li></div><br />";
							 };
							 //Now take the values of our object, in this case the categories belonging to those parent categories, and write them as a list.
							 $('.results').append("<h1 class='parent-category'>" + val + "</h1><ul class='category-list'>" + categories + "</ul>"); 
					});
				};
			});	
		};
	});

	//This function takes the separate parent categories and categories and creates a parent-child object that we can run through our jquery appends above.
	var createCatHier = function(data){
		//Empty object which will contain our final tree structure
		var hierarchy = {};

		var parentArray = [];
		for (var i = 0; i < data.length; i++) {
			//For our returned data set, so through the parent categories and write them to the array. As we write to the array make sure that each value is unique so we don't have a giant list of similar parents
			if (($.inArray(data[i].parentCategory, parentArray)) === -1){
				parentArray.push(data[i].parentCategory);
			}
		};

		//After the array is written take our parents and add them to our object as keys. Their values are empty arrays.
		for (var i = 0; i < parentArray.length; i++) {
			hierarchy[parentArray[i]] = [];
		};

		//For each key (parent category) that exists run through our returned data
		Object.keys(hierarchy).forEach(function(val){
			var hierCat = hierarchy[val];
			for (var i = 0; i < data.length; i++) {
				//As we run through our data check to see if the object parentCategory matches the keys in our object. If they do match write the category into the value array.
				if (data[i].parentCategory === val){
					if($.inArray(data[i].category, hierCat) === -1){
						hierCat.push(data[i].category);
					};
				};
			};

		});

		//Return our completed object
		return hierarchy;

	};

});