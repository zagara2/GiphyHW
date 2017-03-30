var topics = ["chocolate cake", "ice cream", "smores", "caramel apple", "cookies", "strawberry", "macaroon", "popsicle", "waffle", "doughnut", "french toast", "cheesecake", "crepes", "brownies", "cupcake", "cappuccino", "pancakes", "smoothie", "giga pudding", "pie", "pop tarts", "oreo", "root beer float", "soda", "candy corn"];

//probs gonna want to resize the pics to a standard size
//I think I need to have my gifs start animated then pause on click... otherwise they look wacky?

// Your app should take the topics in this array and create buttons in your HTML.
//Try using a loop that appends a button for each string in the array.

//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.


//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

//Under every gif, display its rating (PG, G, so on).

//Add a form to your page takes the value from a user input box and adds it into your topics array. 
//Then make a function call that takes each topic in the array remakes the buttons on the page.


////////////////////////////////////////////////////////////////////////////////////////////////////////

 // Your app should take the topics in this array and create buttons in your HTML.
//Try using a loop that appends a button for each string in the array.
      function renderButtons() {

        // Deleting the buttons prior to adding new desserts
        // (this is necessary otherwise you will have repeat buttons)
        $("#dessertButtons").empty();

        // Looping through the array of desserts
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each dessert in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newButton = $("<button>");
          // Adding a class of "dessert" to our button
          newButton.addClass("dessert");
          // Adding a data-attribute
          newButton.attr("data-name", topics[i]);
          // Providing the initial button text
          newButton.text(topics[i]);
          // Adding the button to the newButton div
          $("#dessertButtons").append(newButton);
        }
      }


// displayDessertInfo function re-renders the HTML to display the appropriate content
      function displayDessertInfo() {

        var myDessert = $(this).attr("data-name");
        // var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + myDessert +"&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	var mainArray = response.data;
        	// Creating a div to hold the block of 10 gifs for a particular dessert
          var dessertDivBlock = $("<div class='dessertStuff' id = '"+myDessert+ "'>");

        	//loop through every gif in the response
        	for (i=0; i<mainArray.length; i++) {   

          var individualDessert = $("<div class = 'individualDessert' id ='"+ myDessert+ "'>");

          // Storing the rating data
          var rating = response.data[i].rating;

          // Creating an element to have the rating displayed
          var ratingText = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          individualDessert.append(ratingText);

          //get the GIF itself
          var myGIF = response.data[i].images.fixed_height_still.url;
         

          //display the static GIF
          individualDessert.prepend("<img src ='" +myGIF+"' class = 'gif' data-state = 'still' data-animate ='"+response.data[i].images.fixed_height.url+ "' data-still = '"+ myGIF+"' alt = 'dessert gif'>");

          

          //put the individual dessert into the bigger block div for that particular dessert
          dessertDivBlock.append(individualDessert);
      }

          // Putting the entire block of dessert gifs above the previous ones
          $("#dessertPicsHere").prepend(dessertDivBlock);

        });

    }

    //  $(".gif").on("click", function() {
    //   	console.log("gif clicked");
    // //   	var myGIFStill = response.data[i].images.fixed_height_still.url;
    // //   	var myGIFAnimated = response.data[i].images.fixed_height.url;

    // //   	var state = $(this).attr("data-state");
    // //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // //   // Then, set the image's data-state to animate
    // //   // Else set src to the data-still value
    // //   if (state === "still") {
    // //     $(this).attr("src", myGIFAnimated);
    // //     $(this).attr("data-state", "animate");
    // //   } else {
    // //     $(this).attr("src", myGIFStill);
    // //     $(this).attr("data-state", "still");
    // // }

    //   });


//a function to animate or pause GIFs 
    function animateGIFS () {
    	  	console.log("gif clicked");
   
    	var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }

     // function testFunct () {
     // 	console.log("heres the function");


     // }


//note - for some reason the on click function to animate would only work when I wrote it with this syntax specifically - like, calling another
//function on click. It wouldn't work if I wrote it the way I wrote the on click function for the submit button. I have no idea why
     $(document).on("click", ".gif", animateGIFS);


    // making a new button when the user enters text in the text box and clicks submit
      $("#dessertSubmit").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var dessert = $("#dessert-input").val().trim();

        // Adding dessert from the textbox to our array
        topics.push(dessert);

        // Calling renderButtons which handles the processing of our dessert array
        renderButtons();
        // Clear the textbox when done
      $("#dessert-input").val("");
      });

    // Adding a click event listener to all elements with a class of "dessert" (the buttons)
    //this makes it so that when a dessert button is clicked, gifs get displayed because displayDessertInfo runs
      $(document).on("click", ".dessert", displayDessertInfo);

      
     

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


