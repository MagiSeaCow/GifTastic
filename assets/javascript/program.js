$(document).ready(function()
{
	// Initialize Variables
	var topics = ["RX-7", "Piano", "Gundam", "Cake", "DOTA", "Cats", "Shar Pei", "Caffine", "Spaceships"];
	var button; // variable to capture generated buttons
	var newTopic = ""; // variable "container" for new buttons added via the input field 

	// function to create buttons from the topics array
	function makeButton()
	{
		// clear the <div> of all buttons
		$("#buttonField").empty();
		// loops through the topics array and create bootstrap buttons
		for(i = 0; i < topics.length; i++)
		{
			button = $("<button type=button>" + topics[i] + "</button>").addClass("btn btn-warning").attr("data",topics[i]);
			$("#buttonField").append(button);
		};
	}

	// When user clicks a generated button, call the GIPHY API and populate with 10 Gifs. 
	$("#buttonField").on("click", ".btn", function()
	{
		var thing = $(this).attr("data");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=YjWhWO05IGiftSE5xRvJrBwGvY69NxUK&limit=10";

		$.ajax(
		{
			url: queryURL,
			method: "GET" 
		})
		
		.done(function(response)
		
		{
			//console.log(response);
			var results = response.data;
			for (var i = 0; i < results.length; i++)
			{
				// newDiv to hold gif
				var newDiv = $("<div>");

				// On every gif, display its rating, pulled from Giphy API.
				var p = $("<p>");
				p.text(results[i].rating);
				var p = $("<p>").text("Rating: " + results[i].rating);

				// Add a color border around Gifs so they POP more, will style in CSS
				var newImage = $("<img>").addClass("border");

				// add the animated and static states, for toggling later on, pulled from Giphy API.
				newImage.attr("src", results[i].images.fixed_height_still.url);
				newImage.attr("data-still", results[i].images.fixed_height_still.url);
				newImage.attr("data-animate", results[i].images.fixed_height.url);
				newImage.attr("data-state", "still");
				newImage.addClass("moveGif");

				// gifs are appended to the newDiv
				newDiv.append(newImage);
				// rating is appended to the paragraph container below the gif in newDiv
				newDiv.append(p); 			
				// new Gifs will generate on top of the existing Gifs
				$("#forGifs").prepend(newDiv);
			}
		})
	})

	// Click to toggle the Gif animated and static states generated previously. First click "plays" the animate Gif. Second click returns it to static state.
	$("#forGifs").on("click", ".moveGif", function(event)
	{
		event.preventDefault();
		// gets the current state of the clicked gif 
		var state = $(this).attr("data-state");
		// according to the current state gifs toggle between animate and still 
		if (state === "still")
		{
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}
		else
		{
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	})
	// Form to collect new topics and insert them into topics array. Generate new set of buttons every time new topic is added to the array.
	$(".btnSubmit").on("click", function(event)
	{
		event.preventDefault();
		// console.log("submit"); Check point
		// collects the value of the text typed into the form
		newTopic = $("#topic-input").val();
		// new topic is added to the topics array
		topics.push(newTopic);
		// console.log(topics); Check point
		// Call the button generator function to make a new set of buttons
		makeButton();
	});

	makeButton(); // makes the initial set of buttons
});