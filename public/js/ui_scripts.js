$(document).ready(function(){
	var catURL = 'http://pi-project.herokuapp.com/api/products/category/';

	$(".results").on("click", ".item-select",function(){
		var category = $.trim($(this).children('.category-item').text());
		category = encodeURIComponent(category);

		var clickElement = $(this);
		console.log(category);
		if ($(this).children('.arrow').html() === '▶'){
				$(this).children('.arrow').html('&#9660;');
				$(this).children('.category-item').append("<ul class='product-titles'></ul>");
				$.getJSON(catURL + category, function(data){
					for (var i = 0; i < data.length; i++) {
						console.log(clickElement);
						clickElement.find(".product-titles").append("<li class='product'>" + data[i].title + "</li>");
					};
				});
			} else {
				$(this).children('.arrow').html('&#9654;');
				$(this).find(".product-titles").remove();
		};
	});
});