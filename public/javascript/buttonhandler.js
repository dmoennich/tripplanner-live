// buttonhandler.js

var days = [];

var currentDay = {
	hotel: "",
	restaurant: [],
	activity: [],
	markers: {}
};

// entry types: hotel, restaurant, activity
var createEntry = function (entryType) {

	var entryName = $("#" +entryType+ " :selected").text(),
		entryObject,
		all_entries;


	switch (entryType) {
		case "hotel":
			all_entries = all_hotels;
			break;
		case "restaurant":
			all_entries = all_restaurants;
			break;
		case "activity":
			all_entries = all_activities;
			break;
		default:
			throw Error("Type" + entryType + " does not exist.");
	}


	// check if entry is already in the list
	if (entryType !== "hotel" && checkIfExists(currentDay[entryType], entryName)) {
		return;
	} else if (entryType === "hotel" && currentDay.hotel === entryName) {
		return;
	}


	for (var i = 0; i < all_entries.length; i++){
		if (all_entries[i].name === entryName){
			entryObject = all_entries[i];
			break;
		}
	}

	// create the marker
	var location = entryObject.place[0].location;
	var markerIdentifier = entryType !== "hotel" ? entryType + "_" + entryName : entryType;


	// inserting entry into html
	var itineraryItem = '<div class="itinerary-item"><span class="title">' + entryName + '</span>' +
        '<button onclick=removeItem(this) data-marker="' + markerIdentifier + '" data-type="hotel" ' + 'data-item="' + entryName +
        '" class="btn btn-xs btn-danger remove btn-circle">x</button></div>';


    if (entryType === "hotel") {
		if (currentDay.hotel) {
			removeMarker(markerIdentifier);
			$("#current_hotel div:first").replaceWith(itineraryItem);
		} else {
			$("#current_hotel").append(itineraryItem);
		}
		currentDay.hotel = entryName;
    } else {
		currentDay[entryType].push(entryName);
		$("#current_" + entryType).append(itineraryItem);
    }

	drawLocation(location, markerIdentifier);
};



$("#add_hotel").click(function() {
	createEntry("hotel");
});

$("#add_restaurants").click(function() {
	createEntry("restaurant");
});

$("#add_activities").click(function() {
	createEntry("activity");
});

var checkIfExists = function (arr, value) {
	return arr.some(function (val) {
		return val === value;
	});
};

function drawLocation (location, markerIdentifier) {
	var opts = {};
	opts.position = new google.maps.LatLng(location[0], location[1]);
	opts.map = map;
	var marker = new google.maps.Marker(opts);
	currentDay.markers[markerIdentifier] = marker;
}


function removeItem(button){
	$(button).parent().remove();
	var name = $(button).attr("data-item");
	var type = $(button).attr("data-type");

	if (type === "hotel") {
		currentDay.hotel = undefined;
	} else {
		var index = currentDay[type].indexOf(name);
		var removedItem = currentDay[type].splice(index, 1);
	}

	var markerIdentifier = $(button).attr("data-marker");
	removeMarker(markerIdentifier);
	// currentDay.markers[markerIdentifier].setMap(null);
	// delete currentDay.markers[markerIdentifier];

}


var removeMarker = function (markerIdentifier) {
	currentDay.markers[markerIdentifier].setMap(null);
	delete currentDay.markers[markerIdentifier];
};








