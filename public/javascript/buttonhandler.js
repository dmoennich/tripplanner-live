// buttonhandler.js
var days = [];

var currentDay = {
	hotel: "",
	restaurant: [],
	activities: []
};

$("#add_hotel").click(function() {

	// getting hotel name from select
	var hotel = $("#hotels :selected").text();

	var itineraryItem = '<div class="itinerary-item"><span class="title">' + hotel + '</span>' +
        '<button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

    // replace existing hotel
	if (currentDay.hotel) {
		$("#currentHotel div:first").replaceWith(itineraryItem);
	} else {
		// add new entry in the hotel list
		$("#currentHotel").append(itineraryItem);
	}

	// put hotel name in the current day object
	currentDay.hotel = hotel;

});

$("#add_restaurants").click(function() {
	var restaurant = $("#restaurant :selected").text();

	if (checkIfExists(currentDay.restaurant, restaurant)) {
		return;
	}

	currentDay.restaurant.push(restaurant);

	var itineraryItem = '<div class="itinerary-item"><span class="title">' + restaurant + '</span>' +
        '<button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

	// add new entry in the restaurant list
	$("#restaurantList").append(itineraryItem);
	
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
});

