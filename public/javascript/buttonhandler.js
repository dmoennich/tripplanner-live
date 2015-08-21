// buttonhandler.js

var days = [];

var currentDay = {
	hotel: "",
	restaurant: [],
	activities: []
};

// draw some locations on the map
 var hotelLocation = [];
// var restaurantLocations = [];
// var activityLocations = [];

$("#add_hotel").click(function() {

	// getting hotel name from select
	var hotel = $("#hotels :selected").text();
	// inserting hotel into html
	var itineraryItem = '<div class="itinerary-item"><span class="title">' + hotel + '</span>' +
        '<button onclick=removeItem(this) data-type="hotel" ' + 'data-item="' + hotel +
        '" class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

    // replace existing hotel
	if (currentDay.hotel) {
		$("#currentHotel div:first").replaceWith(itineraryItem);
	} else {
		// add new entry in the hotel list
		$("#currentHotel").append(itineraryItem);
	}
	currentDay.hotel = hotel;

	// find resturant location
	for (var i = 0; i < all_hotels.length; i++){
		if (all_hotels[i].name === hotel){
			var location = all_hotels[i].place[0].location;
			hotelLocation[0] = location;
			drawLocation(location);
			break;
		}
	}
});

$("#add_restaurants").click(function() {
	var restaurant = $("#restaurant :selected").text();
	// check if restaurant is already in the list
	if (checkIfExists(currentDay.restaurant, restaurant)) {
		return;
	}
	// add restaurant to the list
	currentDay.restaurant.push(restaurant);
	var itineraryItem = '<div class="itinerary-item"><span class="title">' + restaurant + '</span>' +
        '<button onclick=removeItem(this) data-type="restaurant" data-item= "' + restaurant + '" class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

	// add new entry in the restaurant list
	$("#restaurantList").append(itineraryItem);
	
	// find resturant location
	for (var i = 0; i < all_restaurants.length; i++){
		if (all_restaurants[i].name === restaurant){
			var location = all_restaurants[i].place[0].location;
			drawLocation(location);
		}
	}
});

$("#add_activities").click(function() {
	var activities = $("#activity :selected").text();
	
	// check if activity is already in the list
	if (checkIfExists(currentDay.activities, activities)) {
		return;
	}
	// add new activity to the list
	currentDay.activities.push(activities);

	var itineraryItem = '<div class="itinerary-item"><span class="title">' + activities + '</span>' +
    '<button onclick=removeItem(this) data-type="activities" data-item="' + activities + '" class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

	// add new entry in the activity list
	$("#activityList").append(itineraryItem);


	// find activity location
	for (var i = 0; i < all_activities.length; i++){
		if (all_activities[i].name === activities){
			var location = all_activities[i].place[0].location;
			drawLocation(location);
		}
	}
});

var checkIfExists = function (arr, value) {
	return arr.some(function (val) {
		return val === value;
	});
};

function drawLocation (location, opts) {
	if (typeof opts !== 'object') {
		opts = {};
	}
	opts.position = new google.maps.LatLng(location[0], location[1]);
	opts.map = map;
	var marker = new google.maps.Marker(opts);
}



// $("#currentHotel").on("click", function() {
// 	console.log("button clicked");
// });


function removeItem(button){
	$(button).parent().remove();
	var name = $(button).attr("data-item");
	var type = $(button).attr("data-type");

	if (type === currentDay.hotel) { 
		currentDay.hotel = "";
	} 


	var index = currentDay[type].indexOf(name);
	var removedItem = currentDay[type].splice(index, 1)

}










