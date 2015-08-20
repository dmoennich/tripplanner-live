// buttonhandler.js
var days = [];

var currentDay = {
	hotel: "",
	restaurant: [],
	activities: []
};

$("#add_hotel").click(function() {
	var hotel = $("#hotels :selected").text();
	currentDay.hotel = hotel;
});

$("#add_restaurants").click(function() {
	var restaurant = $("#restaurant :selected").text();
	currentDay.restaurant.push(restaurant);
});

$("#add_activities").click(function() {
	var activities = $("#activity :selected").text();
	currentDay.activities.push(activities);
	console.dir(currentDay);
});

