$(function () {
  $(".change-devour").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    var newBurger = $(this).data("newburger");

    var newBurgerState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newBurgerState
    }).then(
      function () {
        console.log("changed devoured to", newBurger);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });



  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#newburger").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  $(".deleteburger").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax({
      type: "DELETE",
      url: "/api/burgers/" + id
    }).then(location.reload());
  });
})



$(document).ready(function() {
  $(document).on("click", ".editOne", editBurger);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);

  // This function handles showing the input box for a user to edit a todo
  function editBurger() {
    debugger;
        var currentBurger = $(this).data("burger_name");
        console.log($(this).data("devoured"));
    debugger;
    $(this).children("").hide();
    debugger;
    $(this).children("input.edit").val(currentBurger.data);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
    debugger;
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var burger = $(this).parent().data("burgers");
    burger.complete = !burger.complete;
    updateBurger(burger);
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedBurger = $(this).data("burgers");
    if (event.which === 13) {
      updatedBurger.text = $(this).children("input").val().trim();
      $(this).blur();
      updateBurger(updatedBurger);
    }
  }

  // This function updates a todo in our database
  function updateBurger(burgers) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers/:id",
      data: burgers
    }).then(getBurger);
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentBurger = $(this).data("burgers");
    if (currentBurger) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentBurger.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }
})

