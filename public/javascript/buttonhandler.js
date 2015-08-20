// buttonhandler.js
var days = [];

var currentDay = {
	hotel: "",
	restaurant: [],
	activities: []
};

// draw some locations on the map
var hotelLocation = [];
var restaurantLocations = [];
var activityLocations = [];

$("#add_hotel").click(function() {

	// getting hotel name from select
	var hotel = $("#hotels :selected").text();

	var itineraryItem = '<div class="itinerary-item"><span class="title">' + hotel + '</span>' +
        '<button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

	// find resturant location
	for (var i = 0; i < all_hotels.length; i++){
		if (all_hotels[i].name === hotel){
			var location = all_hotels[i].place[0].location;
		}
	}

    // replace existing hotel
	if (currentDay.hotel) {
		$("#currentHotel div:first").replaceWith(itineraryItem);
		hotelLocation[0] = location;
	} else {
		// add new entry in the hotel list
		$("#currentHotel").append(itineraryItem);
		hotelLocation.push(location);
	}
	drawLocation(location);
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
        '<button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

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


var checkIfExists = function (arr, value) {
	return arr.some(function (val) {
		return val === value;
	});
};


$("#add_activities").click(function() {
	var activities = $("#activity :selected").text();

	if (checkIfExists(currentDay.activities, activities)) {
		return;
	}

	currentDay.activities.push(activities);
	console.dir(currentDay);

	var itineraryItem = '<div class="itinerary-item"><span class="title">' + activities + '</span>' +
    '<button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

	// add new entry in the activity list
	$("#activityList").append(itineraryItem);


	// find restaurant location
	for (var i = 0; i < all_activities.length; i++){
		if (all_activities[i].name === activities){
			var location = all_activities[i].place[0].location;
			drawLocation(location);
		}
	}
});



function drawLocation (location, opts) {
	if (typeof opts !== 'object') {
	  opts = {}
	}
	opts.position = new google.maps.LatLng(location[0], location[1]);
	opts.map = map;
	var marker = new google.maps.Marker(opts);
}

















