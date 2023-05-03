// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // Loop over all time-block elements
  $(".time-block").each(function () {

    // Get the id of the time-block
    var blockId = $(this).attr("id");

    // Get the textarea element within the time-block
    var textareaEl = $(this).find(".description");

    // Load any saved user input from local storage and update the textarea value
    textareaEl.val(localStorage.getItem(blockId));

    // Attach a click event listener to the save button
    $(this).find(".saveBtn").on("click", function () {

      // Get the user input from the textarea element
      var userInput = textareaEl.val();

      // Save the user input in local storage using the id of the time-block as the key
      localStorage.setItem(blockId, userInput);
    });
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // Get the current hour using Day.js
  var currentHour = dayjs().hour();

  // Loop through each time block
  $(".time-block").each(function () {
    // Get the id attribute of the time block
    var timeBlockId = $(this).attr("id");

    // Extract the hour value from the id attribute
    var hour = parseInt(timeBlockId.split("-")[1]);

    // Compare the hour value to the current hour of the day
    if (hour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (hour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // TODO: Add code to display the current date in the header of the page.

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});

