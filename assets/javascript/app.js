var topics = ["chocolate cake", "angel food cake", "tiramisu", "root beer float", "ice cream", "smores", "caramel apple", "cookie", "macaroon", "popsicle", "waffle", "doughnut", "french toast", "chocolate cheesecake", "crepes", "brownies", "cupcake", "latte", "pancakes", "smoothie", "giga pudding", "pie"];


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
          var dessertDivBlock = $("<div class='dessertStuff' id = "+myDessert+ ">");

        	//loop through every gif in the response
        	for (i=0; i<mainArray.length; i++) {   

          var individualDessert = $("<div class = 'individualDessert'>");

          // Storing the rating data
          var rating = response.data[i].rating;

          // Creating an element to have the rating displayed
          var ratingText = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          individualDessert.append(ratingText);

          //put the individual dessert into the bigger div for that particular dessert
          dessertDivBlock.append(individualDessert);
      }

          // Putting the entire block of dessert gifs above the previous ones
          $("#dessertPicsHere").prepend(dessertDivBlock);

        });

    }