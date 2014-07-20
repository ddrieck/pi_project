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
						$('.results').append("<p class='products'><span class='title'>" + data[i].title + "</span><span class='categories'>" + data[i].parentCategory + " &gt; " + data[i].category + "</span><span class='product_text'></br>By: " + data[i].brand + "</br>UPC #:" + data[i].upc + "</span> </p>");
					};
				};
			});	
		} else {
			$.getJSON(searchURL + 'category/' + keyword, function(data){
				if (data.length === 0){
					$('.results').append("<h1>No Results</h1>");
				} else {
					var categoryHier = createCatHier(data);
					var categories = "";
					Object.getOwnPropertyNames(categoryHier).forEach(function(val, idx, array){
							for (var i = 0; i < categoryHier[val].length; i++) {
							 	categories += "<li>" + categoryHier[val][i] + "</li>";
							 };

							 $('.results').append("<h1>" + val + "</h1><ul>" + categories + "</ul>"); 
					});
				};
			});	
		};
	});


	var createCatHier = function(data){
		var hierarchy = {};

		var parentArray = [];
		for (var i = 0; i < data.length; i++) {
			if (($.inArray(data[i].parentCategory, parentArray)) === -1){
				parentArray.push(data[i].parentCategory);
			}
		};

		for (var i = 0; i < parentArray.length; i++) {
			hierarchy[parentArray[i]] = [];
		};

		Object.keys(hierarchy).forEach(function(val){
			var hierCat = hierarchy[val];
			for (var i = 0; i < data.length; i++) {
				if (data[i].parentCategory === val){
					if($.inArray(data[i].category, hierCat) === -1){
						hierCat.push(data[i].category);
					};
				};
			};

		});

		console.log(hierarchy);
		return hierarchy;

	};

});