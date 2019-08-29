"use strict";

$(document).ready(function() {
  console.log("Ready to fetch GitHub User Repo!");
  watchSubmitButton();
});

function userInput() {
  let wordInput = $("#listen-user-input").val();
  return wordInput;
}

function watchSubmitButton() {
  $("#search-form").submit(e => {
    console.log("it works!");
    e.preventDefault();
    fetchUserName(userInput);
  });
}

//Make Request to GitHub API
function fetchUserName() {
  fetch("https://api.github.com/users/" + userInput() + "/repos")
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Hmmm. Cannot find GitHub UserName"));
}

//Render Repos to the DOM
function displayResults(responseJson) {
  console.log(responseJson);
  $("#display-profile").empty();
  let responseHtml = "";
  responseJson.forEach(userRepo => {
    responseHtml += `<div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">${userRepo.name}</h3>
    </div>
    <div class="panel-body">
     <div class= "row>
     <div class="col-md-3">
     <a href=" ${userRepo.html_url}">Repo URL Link</a>
     </div>
    </div> 
  </div>`;
  });
  $("#display-profile").html(responseHtml);
  $(".display-results-container").removeClass("hidden");
}
