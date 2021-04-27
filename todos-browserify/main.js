document.addEventListener("DOMContentLoaded", function () {
  const createItem = require("./CreateItem.js");
  const { showAll, showIncomplete, showComplete } = require("./Filters.js");
 
  const inputBtn = document.getElementById("input-btn");
  const showAllBtn = document.getElementById("show-all");
  const showIncompleteBtn = document.getElementById("show-incomplete");
  const showCompleteBtn = document.getElementById("show-complete");
  
  inputBtn.addEventListener("click", createItem);

  showAllBtn.addEventListener("click", showAll);
  showIncompleteBtn.addEventListener("click", showIncomplete);
  showCompleteBtn.addEventListener("click", showComplete);
});
