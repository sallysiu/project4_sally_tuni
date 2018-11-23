
$(function () {
	bubbleApp.init()
});


// Create app namespace to hold all methods
const bubbleApp = {};
bubbleApp.apiKey = 'ca6458eda70bc2879ed3d6c923ba72a4';

bubbleApp.NorthYork = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87881&entity_type=subzone&cuisines=247", //NorthYork
	"https://developers.zomato.com/api/v2.1/search?entity_id=87881&entity_type=subzone&start=21&cuisines=247" // NorthYork pt2
]};
bubbleApp.DowntownYonge = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87091&entity_type=subzone&cuisines=247", // Downtown Yonge
		"https://developers.zomato.com/api/v2.1/search?entity_id=87091&entity_type=subzone&start=21&cuisines=247" // Downtown Yonge pt2
	]};

bubbleApp.YongeStreet = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=4061&entity_type=landmark&cuisines=247",
	"https://developers.zomato.com/api/v2.1/search?entity_id=4061&entity_type=landmark&start=21&cuisines=247"]
};

bubbleApp.Thornhill = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87971&entity_type=subzone&cuisines=247"]
};

bubbleApp.HarbordVillage = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87201&entity_type=subzone&cuisines=247",
		"https://developers.zomato.com/api/v2.1/search?entity_id=87201&entity_type=subzone&start=21&cuisines=247"]
}

bubbleApp.KensingtonChinatown = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87221&entity_type=subzone&cuisines=247",
		"https://developers.zomato.com/api/v2.1/search?entity_id=87221&entity_type=subzone&start=21&cuisines=247"]
}

bubbleApp.RichmondHill = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87981&entity_type=subzone&cuisines=247"]
}

bubbleApp.DundasStreetWest = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=5111&entity_type=metro&cuisines=247",
		"https://developers.zomato.com/api/v2.1/search?entity_id=5111&entity_type=metro&start=21&cuisines=247"]
}

bubbleApp.BloorWestVillage = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87301&entity_type=subzone&cuisines=247",
"https://developers.zomato.com/api/v2.1/search?entity_id=87301&entity_type=subzone&start=21&cuisines=247"]
}



// bubbleApp.zones = [NorthYork, DowntownYonge];
bubbleApp.userOptions = [];



// Collect input from all
bubbleApp.getPlace = function (userChoice) {
	bubbleApp.userOptions = [];
	const promiseArray = [];
	
	for (i = 0; i < bubbleApp[userChoice].url.length; i++) {
		// console.log(bubbleApp[userChoice].url[i])
		const promise = $.ajax({
			url: bubbleApp[userChoice].url[i],
			headers: {
				"user-key": "ca6458eda70bc2879ed3d6c923ba72a4"
			},
			dataType: "json",
			method: "GET",
			data: {
				city_id: 89,
				cuisines: 247,
			}
		})
		promiseArray.push(promise)
		// .then((res) => {
		// 	// console.log(res);
		// 	bubbleApp.foundPlaces = res.restaurants;
		// 	// console.log(bubbleApp.foundPlaces)
		// 	bubbleApp.certainInfoOnly(bubbleApp.foundPlaces)

		// });
	}
	// console.log(promiseArray)
	bubbleApp.foundPlaces = [];

	$.when(...promiseArray).then(function(...res) {
		res.forEach(function (successObject) {
			bubbleApp.foundPlaces.push(...successObject[0].restaurants)
		})
		// console.log(bubbleApp.foundPlaces)
		bubbleApp.certainInfoOnly(bubbleApp.foundPlaces)

	})

	
}

bubbleApp.randomChoice = function (curatedList) {
	let randomLocation = curatedList[Math.floor(Math.random() * curatedList.length)];
	console.log(randomLocation)
}


bubbleApp.certainInfoOnly = function (oldList) {
	oldList.forEach((place) => {
		const resObject = {};
		resObject.name = place.restaurant.name;

		resObject.address = place.restaurant.location.address;
		resObject.cuisine = place.restaurant.cuisines;
		bubbleApp.userOptions.push(resObject);
	});
	// console.log(bubbleApp.userOptions);
	bubbleApp.randomChoice(bubbleApp.userOptions)
}




bubbleApp.init = function () {
	// bubbleApp.getInfo();
	bubbleApp.listenForChange();

	// bubbleApp.getPlace()
}

bubbleApp.listenForChange = function () {
	
	$(".carousel__cell").on("click", function () {
		// console.log(this.getAttribute('value'));
		const userChoice = this.getAttribute('value');
		// console.log(userChoice)
		bubbleApp.getPlace(userChoice);
		// console.log(userOptions)

	});





	// $("select").on("change", function () {
	// 	// ..store the value of the selected option
	// 	const userChoice = $(this).val()
	// 	console.log(userChoice)
	// 	// pass this animal string to our get art method to fire off the ajax request and get soem idggerence art
	// 	bubbleApp.getPlace(userChoice);
	// 	console.log(userOptions)
	// })

}
