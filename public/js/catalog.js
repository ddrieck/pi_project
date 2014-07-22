$(document).ready(function(){
	var apiURL = 'http://pi-project.herokuapp.com/api/products/category/parent';
	var parentCatURL = "http://pi-project.herokuapp.com/api/products/category/parent/"
	var catURL = 'http://pi-project.herokuapp.com/api/products/category/';

	$.getJSON(apiURL, function(data){
		for (var i = 0; i < data.length; i++) {
			$('.catalog-section').append("<span class='parent-list'><span class='parent-arrow'>▶</span><span class='parent-item'>" + data[i] + "</span></span></br>");
		};
	});

	$(".catalog-section").on("click", ".parent-list",function(){
		var parentCategory = $.trim($(this).children('.parent-item').text());
			parentCategory = encodeURIComponent(parentCategory);

		var clickElement = $(this);
		if ($(this).find('.parent-arrow').html() === '▶'){
				$(this).children('.parent-arrow').html('&#9660;');
				$(this).after("<ul class='category-list'></ul>");
				$.getJSON(parentCatURL + parentCategory, function(data){
					for (var i = 0; i < data.length; i++) {
						clickElement.next(".category-list").append("<span class='category-item'><span class='arrow'>▶</span><li class='category-title'>" + data[i].category + "</li></span><br />");
					};
				});
			} else {
				$(this).find('.parent-arrow').html('&#9654;');
				$(this).next(".category-list").remove();
		};
	});

	$(".catalog-section").on("click", ".category-item",function(){
		var category = $.trim($(this).children(":first").next().text());
			category = encodeURIComponent(category);

		var clickElement = $(this);
		if ($(this).children('.arrow').html() === '▶'){
				$(this).children('.arrow').html('&#9660;');
				$(this).children('.category-title').append("<ul class='product-list'></ul>");
				$.getJSON(catURL + category, function(data){
					for (var i = 0; i < data.length; i++) {
						clickElement.find(".product-list").append("<li class='product-titles'>" + data[i].title + "</li>");
					};
				});
			} else {
				$(this).children('.arrow').html('&#9654;');
				$(this).find(".product-list").remove();
		};
	});
});